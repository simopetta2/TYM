import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { List, House, Person, BoxArrowRight, PersonPlus } from 'react-bootstrap-icons';
import LogoTYM from './assets/logoTym';

// Import delle pagine
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import MoveMethod from './Pages/MoveMethod';

function NavigationBar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleClose();
    navigate('/');
  };

  return (
    <>
      <Navbar className="navbar sticky-top mb-4 bg-white shadow-sm">
        <Container>
          <Button variant="link" className="text-dark p-0 me-3" onClick={handleShow}>
            <List size={32} />
          </Button>

          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
            <LogoTYM size={40} />
            <span className="fw-bold text-dark fs-3">Train Yor Movement</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center gap-3">
              {token ? (
                <>
                  <Button as={Link} to="/create" variant="primary" className="rounded-pill px-4">Nuovo Post</Button>
                  <Button variant="outline-danger" className="rounded-pill px-3" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="fw-bold text-dark d-none d-lg-block">Accedi</Nav.Link>
                  {/* PULSANTE REGISTRATI NELLA NAVBAR */}
                  <Button as={Link} to="/register" variant="dark" className="rounded-pill px-4 d-none d-lg-block">
                    Inizia
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="ps-2">
            <LogoTYM size={50} />
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="flex-column gap-4">
            <Nav.Link as={Link} to="/" onClick={handleClose} className="d-flex align-items-center gap-3 fs-5 text-dark fw-semibold">
              <House size={22} className="text-dark" /> Home
            </Nav.Link>

            {token && (
              <Nav.Link as={Link} to="/profile" onClick={handleClose} className="d-flex align-items-center gap-3 fs-5 text-dark fw-semibold">
                <Person size={22} className="text-dark" /> Profilo
              </Nav.Link>
            )}

            <hr />

            {token ? (
              <Button variant="danger" className="w-100 d-flex align-items-center justify-content-center gap-2" onClick={handleLogout}>
                <BoxArrowRight size={20} /> Esci
              </Button>
            ) : (
              <div className="d-flex flex-column gap-2">
                <Button as={Link} to="/login" variant="outline-dark" className="w-100 rounded-pill" onClick={handleClose}>
                  Accedi
                </Button>
                {/* PULSANTE REGISTRATI NEL MENU LATERALE */}
                <Button as={Link} to="/register" variant="dark" className="w-100 rounded-pill d-flex align-items-center justify-content-center gap-2" onClick={handleClose}>
                  <PersonPlus size={20} /> Registrati ora
                </Button>
              </div>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <NavigationBar />
      {/* <Container> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/move" element={<MoveMethod />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {/* </Container> */}
    </Router>
  );
}