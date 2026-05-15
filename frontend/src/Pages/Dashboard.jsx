import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge, Form } from 'react-bootstrap';
import { MegaphoneFill, ArrowRight, GearFill, PencilSquare, Check2, XCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../Services/api';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [staffMessage, setStaffMessage] = useState("");
    const [newStaffMessage, setNewStaffMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }

        const fetchUserData = async () => {
            try {
                const data = await apiRequest('/user/me');
                if (data) {
                    setUser(data);

                    const msg = data.staffMessage || "La costanza è ciò che trasforma il desiderio in risultato. Non mollare mai.";
                    setStaffMessage(msg);
                    setNewStaffMessage(msg);
                }
            } catch (error) {
                console.error("Errore fetch utente:", error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleUpdateMessage = async () => {
        try {

            setStaffMessage(newStaffMessage);
            setIsEditing(false);

        } catch (error) {
            console.error("Errore aggiornamento messaggio:", error);
        }
    };

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Spinner animation="border" variant="danger" />
        </Container>
    );

    return (
        <div className="dashboard-page" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '40px 0', fontFamily: "'Inter', sans-serif" }}>
            <Container>

                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-5 gap-4">
                    <div className="text-center text-md-start">
                        <h1 className="fw-bold text-dark m-0" style={{ fontSize: '2.8rem', letterSpacing: '-1px' }}>
                            Ciao, <span style={{ color: '#e5383b' }}>{user?.name}</span>!
                        </h1>
                        <p className="text-muted mt-2" style={{ fontSize: '1rem', fontWeight: '500' }}>
                            {user?.role === 'admin' ? 'Pannello di Controllo Amministratore' : 'Bentornato nella tua area riservata'}
                        </p>
                    </div>
                    <div className="d-flex align-items-center gap-3 bg-white p-2 pe-4 rounded-pill shadow-sm border">
                        <img src={user?.avatar || "https://via.placeholder.com/50"} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e5383b' }} />
                        <div className="d-none d-md-block text-start">
                            <div className="fw-bold small text-uppercase text-dark">{user?.role || 'ATLETA'}</div>
                            <Button variant="link" className="p-0 text-danger small text-decoration-none fw-semibold" onClick={() => navigate('/profile')}>Profilo</Button>
                        </div>
                    </div>
                </div>


                <Row className="mb-5">
                    <Col md={12}>
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                            <div style={{ height: '5px', backgroundColor: '#e5383b' }}></div>
                            <Card.Body className="p-4 p-md-5">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <Badge bg="dark" className="text-uppercase px-3 py-2" style={{ fontWeight: '700', fontSize: '0.7rem' }}>
                                        Comunicazione Staff
                                    </Badge>
                                    {user?.role === 'admin' && !isEditing && (
                                        <Button variant="outline-dark" size="sm" className="rounded-pill px-3 border-0 bg-light" onClick={() => setIsEditing(true)}>
                                            <PencilSquare className="me-2" /> Modifica
                                        </Button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="mt-3">
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            className="border-2 rounded-3 mb-3 fw-medium"
                                            value={newStaffMessage}
                                            onChange={(e) => setNewStaffMessage(e.target.value)}
                                            style={{ fontSize: '1.2rem' }}
                                        />
                                        <div className="d-flex gap-2">
                                            <Button variant="danger" className="rounded-pill px-4 fw-bold shadow-sm" onClick={handleUpdateMessage}>
                                                <Check2 className="me-1" /> Salva per tutti
                                            </Button>
                                            <Button variant="outline-secondary" className="rounded-pill px-4 fw-bold" onClick={() => { setIsEditing(false); setNewStaffMessage(staffMessage); }}>
                                                <XCircle className="me-1" /> Annulla
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <h2 className="fw-bold text-dark mb-3" style={{ fontSize: '1.8rem', lineHeight: '1.3' }}>
                                        "{staffMessage}"
                                    </h2>
                                )}

                                {!isEditing && (
                                    <div className="d-flex align-items-center gap-2 mt-2">
                                        <span className="text-muted fw-semibold">— Head Coach</span>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


                {user?.role === 'admin' && (
                    <Row className="mb-5">
                        <Col md={12}>
                            <Card className="border-0 shadow-sm rounded-4 bg-dark text-white p-2">
                                <Card.Body className="p-4">
                                    <Row className="align-items-center">
                                        <Col md={2} className="mb-3 mb-md-0 d-flex justify-content-center">
                                            <div className="bg-danger rounded-circle p-3 shadow-sm">
                                                <GearFill size={30} />
                                            </div>
                                        </Col>
                                        <Col md={7} className="text-center text-md-start">
                                            <h4 className="fw-bold m-0">Gestione Community</h4>
                                            <p className="text-danger fw-semibold small mb-1">Pannello Amministratore</p>
                                            <p className="opacity-75 small m-0">Gestisci i profili atleti e le configurazioni del centro.</p>
                                        </Col>
                                        <Col md={3} className="text-md-end mt-3 mt-md-0">
                                            <Button onClick={() => navigate('/admin-panel')} variant="light" className="rounded-pill px-4 py-2 fw-bold w-100">
                                                Apri Pannello
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}


                <Row className="g-4 mb-5">
                    <Col md={6}>
                        <Card className="border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                            <div className="overflow-hidden rounded-3 mb-3" style={{ height: '180px' }}>
                                <Card.Img src='calendar.jpg' style={{ objectFit: 'cover', height: '100%' }} />
                            </div>
                            <Card.Body className="p-2 text-center text-md-start">
                                <h4 className="fw-bold mb-1">Calendario</h4>
                                <p className="text-muted small mb-4">{user?.role === 'admin' ? "Gestisci appuntamenti" : "I tuoi appuntamenti"}</p>
                                <Button variant="dark" className='w-100 rounded-pill py-2 fw-bold' onClick={() => navigate('/calendar')}>Vai <ArrowRight className="ms-2" /></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                            <div className="overflow-hidden rounded-3 mb-3" style={{ height: '180px' }}>
                                <Card.Img src='schedule.png' style={{ objectFit: 'cover', height: '100%' }} />
                            </div>
                            <Card.Body className="p-2 text-center text-md-start">
                                <h4 className="fw-bold mb-1">Scheda Allenamento</h4>
                                <p className="text-muted small mb-4">{user?.role === 'admin' ? "Gestisci schede utenti" : "Le tue schede"}</p>
                                <Button variant="dark" className='w-100 rounded-pill py-2 fw-bold' onClick={() => navigate('/schedules')}>Vai <ArrowRight className="ms-2" /></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;