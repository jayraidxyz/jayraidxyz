export function isNetworkError(error) {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return true;
  }
  const code = String(error?.code || "").toLowerCase();
  const msg = String(error?.message || error || "").toLowerCase();

  return (
    code === "auth/network-request-failed" ||
    code === "unavailable" ||
    code === "network-request-failed" ||
    msg.includes("the client is offline") ||
    msg.includes("network-request-failed") ||
    msg.includes("failed to fetch") ||
    msg.includes("networkerror") ||
    msg.includes("could not reach cloud firestore backend")
  );
}

export function formatFirebaseAuthError(error) {
  const code = String(error?.code || "");

  if (code === "auth/popup-closed-by-user") {
    return null;
  }
  if (code === "auth/cancelled-popup-request") {
    return null;
  }
  if (isNetworkError(error)) {
    return {
      variant: "network",
      title: "Network error",
      message: "Unable to reach Google authentication. Check your internet connection and try again.",
    };
  }
  if (code === "auth/popup-blocked") {
    return {
      variant: "error",
      title: "Popup blocked",
      message: "Your browser blocked the Google sign-in popup. Allow popups for this site and try again.",
    };
  }
  if (code === "auth/unauthorized-domain") {
    return {
      variant: "error",
      title: "Domain not authorized",
      message: "This domain is not authorized for Google sign-in in Firebase Authentication.",
    };
  }
  if (code === "auth/too-many-requests") {
    return {
      variant: "error",
      title: "Too many attempts",
      message: "Too many sign-in attempts. Please wait a moment before trying again.",
    };
  }
  if (code === "auth/user-disabled") {
    return {
      variant: "error",
      title: "Account disabled",
      message: "This Google account has been disabled for this application.",
    };
  }
  if (code === "auth/account-exists-with-different-credential") {
    return {
      variant: "error",
      title: "Account conflict",
      message: "An account already exists with this email using a different sign-in method.",
    };
  }

  return {
    variant: "error",
    title: "Sign-in failed",
    message:
      error instanceof Error && error.message
        ? error.message
        : "Authentication failed. Please try again.",
  };
}
