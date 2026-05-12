import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Offcanvas, Image, Dropdown } from 'react-bootstrap';
import { List, House, Person, BoxArrowRight, PersonPlus, Grid } from 'react-bootstrap-icons';
import LogoTYM from './assets/logoTym';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Calendar from './Pages/Calendar';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import MoveMethod from './Pages/MoveMethod';
import AdminPanel from './Pages/admin/AdminPanel';
import MyFooter from './Components/MyFooter';
import TrainingSchedules from './Pages/TrainingSchedules';
import UserProfile from './Pages/UserProfile'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user_data');


  let user = null;
  if (userData && userData !== "undefined") {
    try {
      user = JSON.parse(userData);
    } catch (e) { console.error("Errore parse user", e); }
  }

  if (!token) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" replace />;

  return children;
};

function NavigationBar() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:3000/user/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.message) throw new Error();
          setUser(data);
          localStorage.setItem('user_data', JSON.stringify(data));
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user_data');
          setUser(null);
        });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    setUser(null);
    handleClose();
    navigate('/');
  };

  return (
    <>
      <Navbar className="navbar sticky-top mb-4 bg-white shadow-sm">
        <Container>
          {/* Menu a sinistra come prima */}
          <Button variant="link" className="text-dark p-0 me-3" onClick={handleShow}>
            <List size={32} />
          </Button>

          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 me-auto">
            <LogoTYM size={40} />
            <span className="fw-bold text-dark fs-3 d-none d-sm-block">Train Your Movement</span>
          </Navbar.Brand>

          <Nav className="ms-auto align-items-center">
            {token && user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="dropdown-user" className="p-0 border-0 no-caret">
                  <Image
                    src={user.avatar}
                    roundedCircle
                    style={{ width: '45px', height: '45px', objectFit: 'cover', border: '2px solid #e5383b' }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow border-0 mt-2">
                  <Dropdown.Header className="fw-bold text-dark">{user.name} {user.surname}</Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/profile"><Person className="me-2" /> Profilo</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/dashboard"><Grid className="me-2" /> Dashboard</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger"><BoxArrowRight className="me-2" /> Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex gap-3">
                <Nav.Link as={Link} to="/login" className="fw-bold text-dark d-none d-lg-block align-self-center">Accedi</Nav.Link>
                <Button as={Link} to="/register" variant="dark" className="rounded-pill px-4">Inizia</Button>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {user ? <div className="d-flex align-items-center gap-2"><Image src={user.avatar} roundedCircle style={{ width: '40px' }} /><span className="fw-bold">{user.name}</span></div> : <LogoTYM size={50} />}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-4">
            <Nav.Link as={Link} to="/" onClick={handleClose} className="d-flex align-items-center gap-3 fs-5 text-dark fw-semibold"><House size={22} /> Home</Nav.Link>
            {token && (
              <>
                <Nav.Link as={Link} to="/profile" onClick={handleClose} className="d-flex align-items-center gap-3 fs-5 text-dark fw-semibold"><Person size={22} /> Profilo</Nav.Link>
                <Nav.Link as={Link} to="/dashboard" onClick={handleClose} className="d-flex align-items-center gap-3 fs-5 text-dark fw-semibold"><Grid size={22} /> Dashboard</Nav.Link>
              </>
            )}
            <hr />
            <Button variant={token ? "danger" : "dark"} className="w-100 rounded-pill" onClick={token ? handleLogout : () => navigate('/login')}>
              {token ? "Esci" : "Accedi"}
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavigationBar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/move" element={<MoveMethod />} />
            <Route path="/userprofile/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/schedules" element={<ProtectedRoute><TrainingSchedules /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
            <Route path="/admin-panel" element={<ProtectedRoute adminOnly={true}><AdminPanel /></ProtectedRoute>} />
          </Routes>
        </main>
        <MyFooter />
      </div>
    </Router>
  );
}