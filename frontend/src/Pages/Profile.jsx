import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { PersonCircle, ShieldLock, Gear, Camera, Save, PencilSquare, Trophy } from 'react-bootstrap-icons';
import { apiRequest } from '../Services/api';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({ name: '', surname: '', email: '', bio: '' });
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await apiRequest('/user/me');
                setUser(data);
                setFormData({
                    name: data.name || '',
                    surname: data.surname || '',
                    email: data.email || '',
                    bio: data.bio || ''
                });
            } catch (error) {
                console.error("Errore caricamento profilo:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await apiRequest(`/user/update/${user._id}`, {
                method: 'PATCH',
                body: JSON.stringify(formData)
            });
            setUser({ ...user, ...formData });
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profilo aggiornato con successo!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'danger', text: 'Errore durante l\'aggiornamento.' });
        }
    };

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Spinner animation="border" variant="danger" />
        </Container>
    );

    return (
        <div className="profile-page" style={{ backgroundColor: '#fdfdfd', minHeight: '100vh', padding: '40px 0', fontFamily: "'Inter', sans-serif" }}>
            <Container>
                {/* HEADER PROFILO */}
                <div className="d-flex flex-column flex-md-row align-items-center mb-5 gap-4">
                    <div className="position-relative">
                        <div className="avatar-placeholder shadow-sm d-flex align-items-center justify-content-center"
                            style={{ width: '140px', height: '140px', backgroundColor: '#fff', borderRadius: '50%', border: '4px solid #e5383b' }}>
                            <img src={user?.avatar} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }} />
                        </div>
                        <Button variant="dark" size="sm" className="position-absolute bottom-0 end-0 rounded-circle p-2 shadow-sm border-0">
                            <Camera size={18} />
                        </Button>
                    </div>
                    <div className="text-center text-md-start">
                        <h1 className="fw-black text-dark m-0" style={{ fontSize: '3rem', letterSpacing: '-2px', lineHeight: '1' }}>
                            {user?.name.toUpperCase()} <span style={{ color: '#e5383b' }}>{user?.surname.toUpperCase()}</span>
                        </h1>
                        <div className="d-flex gap-2 mt-3 justify-content-center justify-content-md-start">
                            <Badge bg="dark" className="rounded-pill px-3 py-2 text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>
                                {user?.role || 'Atleta'}
                            </Badge>

                        </div>
                    </div>
                </div>

                {message && <Alert variant={message.type} className="rounded-4 border-0 shadow-sm mb-4">{message.text}</Alert>}

                <Row className="g-4">
                    {/* COLONNA SINISTRA: DATI PERSONALI */}
                    <Col lg={8}>
                        <Card className="border-0 shadow-lg rounded-4 p-4 h-100 bg-white">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-black m-0 text-uppercase" style={{ letterSpacing: '-1px' }}>Informazioni Personali</h4>

                                <Button
                                    variant={isEditing ? "light" : "outline-danger"}
                                    className="rounded-pill px-4 fw-bold border-0"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? 'Annulla' : <><PencilSquare className="me-2" />Modifica</>}
                                </Button>
                            </div>

                            <Form onSubmit={handleUpdate}>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-muted text-uppercase">Nome</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="border-0 bg-light p-3 rounded-3 shadow-none"
                                                value={formData.name}
                                                readOnly={!isEditing}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-muted text-uppercase">Cognome</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="border-0 bg-light p-3 rounded-3 shadow-none"
                                                value={formData.surname}
                                                readOnly={!isEditing}
                                                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-muted text-uppercase">Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                className="border-0 bg-light p-3 rounded-3 shadow-none"
                                                value={formData.email}
                                                readOnly={!isEditing}

                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-muted text-uppercase">Bio / Note Atleta</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                className="border-0 bg-light p-3 rounded-3 shadow-none"
                                                style={{ resize: 'none' }}
                                                value={formData.bio}
                                                placeholder="Racconta qualcosa sui tuoi obiettivi..."
                                                readOnly={!isEditing}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {isEditing && (
                                    <Button type="submit" variant="danger" className="rounded-pill px-5 py-2 fw-bold border-0 mt-4 shadow-sm" style={{ backgroundColor: '#e5383b' }}>
                                        <Save className="me-2" /> Salva Modifiche
                                    </Button>
                                )}
                            </Form>
                        </Card>
                    </Col>

                    {/* COLONNA DESTRA: STATS E SICUREZZA */}
                    <Col lg={4}>
                        <div className="d-flex flex-column gap-4">

                            <Card className="border-0 shadow-lg rounded-4 p-4 text-center bg-dark text-white">
                                <Trophy size={40} className="mb-3" style={{ color: '#e5383b' }} />
                                <h5 className="text-uppercase fw-bold opacity-75">Status Allenamenti</h5>
                                <h2 className="display-4 fw-black m-0">24</h2>
                                <p className="small text-uppercase">Sessioni completate</p>
                            </Card>


                            <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
                                <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                    <ShieldLock className="text-danger" /> Sicurezza
                                </h5>
                                <div className="d-grid gap-2">
                                    <Button onClick={() => navigate('/dashboard')} variant="light" className="text-start p-3 rounded-3 border-0 fw-bold small text-muted">
                                        Dashboard
                                    </Button>
                                    <Button onClick={() => navigate('/dashboard')} variant="light" className="text-start p-3 rounded-3 border-0 fw-bold small text-muted">
                                        Autenticazione 2FA
                                    </Button>
                                </div>
                            </Card>


                            <Card className="border-0 shadow-sm rounded-4 p-4" style={{ backgroundColor: 'rgba(229, 56, 59, 0.05)' }}>
                                <h5 className="fw-bold text-danger mb-3 text-uppercase small">Danger Zone</h5>
                                <Button variant="outline-danger" size="sm" className="rounded-pill fw-bold border-0 bg-white">
                                    Elimina Account
                                </Button>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                
                .profile-page { font-family: 'Inter', sans-serif; }
                .fw-black { font-weight: 900; }
                
                .form-control:read-only {
                    background-color: #fbfbfb !important;
                    color: #6c757d;
                    cursor: default;
                }

                .form-control:focus {
                    background-color: #fff !important;
                    border: 1px solid #e5383b !important;
                }

                .avatar-placeholder {
                    transition: transform 0.3s ease;
                }
                
                .avatar-placeholder:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

export default Profile;