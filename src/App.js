import { Container, Nav, Navbar } from 'react-bootstrap';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Home } from './components/Home';

 

function App() {
  return (
    <BrowserRouter>
    <div className='App'>

      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
      <div>
        <Routes>

          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
           <Route path='/' element={<Home />} />
        </Routes>


      </div>
    </div>
    </BrowserRouter>
  );
};

export default App;
