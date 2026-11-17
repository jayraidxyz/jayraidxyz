# Security Specification — Firestore Rules TDD

## 1. Data Invariants

1. **PII Isolation (`users/{userId}`)**: A user profile contains PII (`email`, `displayName`, `photoURL`) and may ONLY be read (`get`), created, or updated by the verified owner (`request.auth.uid == userId && request.auth.token.email_verified == true`). Collection-wide `list` queries on `/users` are strictly denied.
2. **Master Gate on Subcollections (`users/{userId}/progress/{postSlug}`)**: A progress record cannot exist without a valid parent `/users/{userId}` document belonging to `request.auth.uid`. Reads, queries (`list`), creates, updates, and deletes are strictly restricted to the verified owner.
3. **Immutable Ownership & Identifiers**: `uid`, `userId`, `slug`, and `createdAt` can never change after creation.
4. **Temporal Integrity**: `createdAt` and `updatedAt` must always equal `request.time` (server timestamps).
5. **Strict Schema & Bounds**: Every write validates required/allowed keys (`hasAll` + `hasOnly`), exact types, bounded string lengths (`displayName <= 120`, `email <= 254`, `photoURL <= 500`, `note <= 1000`), bounded integers (`lastSection` 0..50, `lastSlide` 1..100), and valid ID formats (`^[a-zA-Z0-9_-]+$`, `<= 128`).

## 2. The "Dirty Dozen" Attack Payloads (All Must Fail with PERMISSION_DENIED)

1. **Unauthenticated Profile Read**: Unauthenticated `get(/users/userA)` -> DENIED.
2. **Cross-User PII Read**: Signed-in `userB` executes `get(/users/userA)` -> DENIED.
3. **Collection-Wide User Scraping**: Signed-in `userA` executes `list(/users)` -> DENIED.
4. **Unverified Email Spoof**: Signed-in user with `email_verified: false` attempts `create(/users/userA)` -> DENIED.
5. **UID Spoofing on Create**: `userB` attempts `create(/users/userB)` with `{ uid: "userA", ... }` -> DENIED.
6. **Shadow Field Injection on User Create**: `userA` attempts `create(/users/userA)` with extra field `{ isAdmin: true }` -> DENIED (`hasOnly` rejects).
7. **Client Timestamp Forgery**: `userA` attempts `create(/users/userA)` with `{ createdAt: "2020-01-01T00:00:00Z" }` -> DENIED (`!= request.time`).
8. **Orphaned Progress Write**: `userA` attempts `create(/users/userA/progress/dtcc-solana)` before `/users/userA` exists -> DENIED (Master Gate `exists()` fails).
9. **ID Poisoning**: `userA` attempts `create(/users/userA/progress/invalid$slug!with_200_chars...)` -> DENIED (`isValidId` fails).
10. **Value Poisoning on Progress Update**: `userA` attempts `update(/users/userA/progress/dtcc-solana)` with `{ note: "<2000-char string>" }` or `{ lastSlide: 9999 }` -> DENIED (`isValidPostProgress` fails).
11. **Immutable Field Tampering**: `userA` attempts `update(/users/userA/progress/dtcc-solana)` changing `slug` or `createdAt` -> DENIED (`affectedKeys().hasOnly(...)` & immutability check reject).
12. **Cross-User Progress List**: `userB` attempts `list(/users/userA/progress)` -> DENIED (`isOwner(userId) && resource.data.userId == request.auth.uid` fails).
