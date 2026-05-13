import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../Services/api';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            try {
                const data = await apiRequest('/user/me');
                if (data) {
                    setUser(data);
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

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Spinner animation="border" variant="dark" />
            </Container>
        );
    }

    return (
        <Container className="py-4">
            {/* Header di Benvenuto Dinamico */}
            <div className="mb-5 d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="fw-bold text-dark">
                        Ciao, {user?.name}!👋 {user?.role === 'admin' && <Badge bg="danger" className="ms-2 fs-6">Amministratore</Badge>}
                    </h1>
                    <p className="text-muted">Bentornato nella tua area riservata.</p>
                </div>

                {/* Se l'utente è admin, mostriamo un pulsante speciale */}
                {user?.role === 'admin' ? (
                    <Button variant="outline-danger" onClick={() => navigate('/profile')}>
                        Profilo
                    </Button>
                ) : (
                    <Button variant="outline-dark" onClick={() => navigate('/profile')}>
                        Profilo
                    </Button>
                )}
            </div>

            <Row className="g-4">
                {/* Card Statistiche Standard */}
                <Col md={4}>
                    <Card className="shadow-sm border-0 rounded-4 p-3">
                        <Card.Body>
                            <h6 className="text-uppercase text-muted small fw-bold">Status</h6>
                            <h2 className="fw-bold m-0 text-success">Attivo</h2>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Se l'utente è ADMIN */}
                <Col md={4}>
                    <Card className="shadow-sm border-0 rounded-4 p-3 border-start border-danger border-4">
                        <Card.Body>
                            <h6 className="text-uppercase text-muted small fw-bold">Permessi Account</h6>
                            <h2 className="fw-bold m-0">
                                {user?.role === 'admin' ? "Accesso Totale" : "Utente Standard"}
                            </h2>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm border-0 rounded-4 p-3 bg-dark text-white">
                        <Card.Body className="d-flex align-items-center gap-3">
                            <img
                                src={user?.avatar || "https://via.placeholder.com/50"}
                                alt="Avatar"
                                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }}
                            />
                            <div>
                                <h6 className="m-0 fw-bold">{user?.name} {user?.surname}</h6>
                                <span className="small text-secondary">{user?.email}</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            {user?.role === 'admin' ? (
                <Row className="w-100 m-0">
                    {/* Prima Card */}
                    <Col md={6} className="px-0">
                        <Card className="border-0 rounded-5 p-4 mt-4 shadow-sm text-center bg-light border-bottom border-danger border-4">
                            <Card.Img
                                variant="top"
                                src='src/assets/calendar.jpg'
                                style={{ objectFit: 'cover', height: '200px' }}
                            />
                            <Card.Body>
                                <Card.Title>Calendario</Card.Title>
                                <Card.Text>
                                    Gestisci tutti gli appuntamenti
                                </Card.Text>
                                <Button variant="dark" className='w-100' onClick={() => navigate('/calendar')}>Vai</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Seconda Card */}
                    <Col md={6} className="px-0">
                        <Card className="border-0 rounded-5 p-4 mt-4 shadow-sm text-center bg-light border-bottom border-danger border-4">
                            <Card.Img
                                variant="top"
                                src='src/assets/schedule.png'
                                style={{ objectFit: 'cover', height: '200px' }}
                            />
                            <Card.Body>
                                <Card.Title>Scheda Allenamento</Card.Title>
                                <Card.Text>
                                    Gestisci tutte le schede degli utenti
                                </Card.Text>
                                <Button onClick={() => navigate('/schedules')} variant="dark" className='w-100'>Vai</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Row className="w-100 m-0">
                    {/* Prima Card */}
                    <Col md={6} className="px-0">
                        <Card className="border-0 rounded-5 p-4 mt-4 shadow-sm text-center bg-light border-bottom border-dark border-4">
                            <Card.Img
                                variant="top"
                                src='src/assets/calendar.jpg'
                                style={{ objectFit: 'cover', height: '200px' }}
                            />
                            <Card.Body>
                                <Card.Title>Calendario</Card.Title>
                                <Card.Text>
                                    Visualizza i tuoi appuntamenti
                                </Card.Text>
                                <Button onClick={() => navigate('/calendar')} variant="dark" className='w-100'>Vai</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Seconda Card */}
                    <Col md={6} className="px-0">
                        <Card className="border-0 rounded-5 p-4 mt-4 shadow-sm text-center bg-light border-bottom border-dark border-4">
                            <Card.Img
                                variant="top"
                                src='src/assets/schedule.png'
                                style={{ objectFit: 'cover', height: '200px' }}
                            />
                            <Card.Body>
                                <Card.Title>Scheda Allenamento</Card.Title>
                                <Card.Text>
                                    Dai un occhiata alle tue schede
                                </Card.Text>
                                <Button onClick={() => navigate('/schedules')} variant="dark" className='w-100'>Vai</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
            }

            {/* Azioni Condizionali */}
            <Row className="mt-3">
                <Col md={6} className="px-0">
                    <Card className="border-0 rounded-5 p-4 mt-4 shadow-sm text-center bg-light border-bottom border-danger border-4">
                        {user?.role === 'admin' ? (
                            <>
                                <Card.Img
                                    variant="top"
                                    src='src/assets/users.png'
                                    style={{ objectFit: 'cover', height: '200px' }}
                                />
                                <Card.Body>
                                    <Card.Title>Gestione Utenti</Card.Title>
                                    <Card.Text>
                                        Gestisci tutti gli utenti
                                    </Card.Text>
                                    <Button onClick={() => navigate('/admin-panel')} variant="dark" className='w-100'>Vai</Button>
                                </Card.Body>
                            </>
                        ) : (
                            <>
                                <h3 className="fw-bold">Pronto per il movimento?</h3>
                                <p className="mb-4">Inizia una nuova sessione di allenamento.</p>
                                <Button variant="dark" size="lg" className="rounded-pill px-5 shadow">
                                    Inizia ora
                                </Button>
                            </>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default Dashboard;