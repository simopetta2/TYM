import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Spinner, Alert, Stack, InputGroup } from 'react-bootstrap';
import { ArrowLeft, PencilSquare, Save, Trophy } from 'react-bootstrap-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../Services/api';

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        bio: '',
        weight: '',
        height: ''
    });

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const data = await apiRequest(`/user/${id}`);
                setUser(data);
                setFormData({
                    name: data.name || '',
                    surname: data.surname || '',
                    email: data.email || '',
                    bio: data.bio || '',
                    weight: data.weight || '',
                    height: data.height || ''
                });
            } catch (error) {
                setMessage({ type: 'danger', text: 'Errore nel caricamento dati.' });
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetail();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await apiRequest(`/user/update/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(formData)
            });
            setUser({ ...user, ...formData });
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profilo aggiornato con successo!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'danger', text: 'Errore durante il salvataggio.' });
        }
    };

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Spinner animation="border" variant="danger" />
        </Container>
    );

    return (
        <div className="profile-page" style={{ backgroundColor: '#fdfdfd', minHeight: '100vh', padding: '40px 0' }}>
            <Container>
                {/* BACK BUTTON */}
                <Button
                    variant="link"
                    className="text-dark p-0 mb-4 text-decoration-none d-flex align-items-center gap-2 fw-bold"
                    onClick={() => navigate('/admin-panel')}
                >
                    <ArrowLeft /> TORNA ALLA LISTA UTENTI
                </Button>

                {/* HEADER */}
                <div className="d-flex flex-column flex-md-row align-items-center mb-5 gap-4">
                    <img src={user?.avatar} alt="avatar" style={{ width: '140px', height: '140px', borderRadius: '50%', border: '4px solid #212529', objectFit: 'cover' }} />
                    <div className="text-center text-md-start">
                        <h1 className="fw-black text-dark m-0" style={{ fontSize: '3rem', fontWeight: 900 }}>
                            {user?.name.toUpperCase()} <span style={{ color: '#e5383b' }}>{user?.surname.toUpperCase()}</span>
                        </h1>
                        <Badge bg="danger" className="mt-2 text-uppercase fw-bold">Atleta ID: {id.slice(-6)}</Badge>
                    </div>
                </div>

                {message && <Alert variant={message.type} className="rounded-4 border-0 shadow-sm mb-4">{message.text}</Alert>}

                <Form onSubmit={handleUpdate}>
                    <Row className="g-4">
                        <Col lg={8}>
                            <Card className="border-0 shadow-lg rounded-4 p-4 bg-white h-100">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="fw-bold m-0 text-uppercase">Informazioni Atleta</h4>
                                    <Button
                                        variant={isEditing ? "light" : "outline-dark"}
                                        className="rounded-pill px-4 fw-bold"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? 'Annulla' : <><PencilSquare className="me-2" />Modifica Profilo</>}
                                    </Button>
                                </div>

                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-muted">NOME</Form.Label>
                                            <Form.Control type="text" className="bg-light border-0 p-3 shadow-none" value={formData.name} readOnly={!isEditing} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-muted">COGNOME</Form.Label>
                                            <Form.Control type="text" className="bg-light border-0 p-3 shadow-none" value={formData.surname} readOnly={!isEditing} onChange={(e) => setFormData({ ...formData, surname: e.target.value })} />
                                        </Form.Group>
                                    </Col>

                                    {/* SEZIONE PESO E ALTEZZA */}
                                    <Col md={6} className="mt-4">
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-danger">PESO ATTUALE</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    type="number"
                                                    step="0.1"
                                                    className="bg-light border-0 p-3 shadow-none"
                                                    value={formData.weight}
                                                    readOnly={!isEditing}
                                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                                />
                                                <InputGroup.Text className="bg-light border-0 fw-bold">kg</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mt-4">
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-danger">ALTEZZA</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    type="number"
                                                    className="bg-light border-0 p-3 shadow-none"
                                                    value={formData.height}
                                                    readOnly={!isEditing}
                                                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                                />
                                                <InputGroup.Text className="bg-light border-0 fw-bold">cm</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12} className="mt-4">
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-muted">NOTE / BIOGRAFIA</Form.Label>
                                            <Form.Control as="textarea" rows={3} className="bg-light border-0 p-3 shadow-none" value={formData.bio} readOnly={!isEditing} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {isEditing && (
                                    <Button type="submit" variant="danger" className="rounded-pill px-5 py-3 fw-bold border-0 mt-5 shadow w-100" style={{ backgroundColor: '#e5383b' }}>
                                        <Save className="me-2" /> SALVA MODIFICHE
                                    </Button>
                                )}
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Stack gap={4}>
                                {/* CARD RIASSUNTIVA DATI FISICI */}
                                <Card className="border-0 shadow-lg rounded-4 p-4 bg-dark text-white text-center">
                                    <Trophy size={30} className="mb-3 text-danger" />
                                    <h6 className="text-uppercase fw-bold opacity-75 small mb-4">Parametri Fisici</h6>
                                    <Row>
                                        <Col>
                                            <h3 className="fw-black m-0">{formData.weight || '--'}</h3>
                                            <small className=" fw-bold">PESO (KG)</small>
                                        </Col>
                                        <Col style={{ borderLeft: '1px solid #444' }}>
                                            <h3 className="fw-black m-0">{formData.height || '--'}</h3>
                                            <small className=" fw-bold">ALTEZZA (CM)</small>
                                        </Col>
                                    </Row>
                                </Card>

                                {/* CARD INFO AGGIUNTIVE */}
                                <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
                                    <h6 className="fw-bold mb-3 text-uppercase small">Info Account</h6>
                                    <p className="small mb-2 text-muted">Email: <span className="text-dark fw-bold">{formData.email}</span></p>
                                    <p className="small mb-0 text-muted">Ruolo: <span className="text-dark fw-bold">{user?.role === 'admin' ? 'Admin' : 'Atleta'}</span></p>
                                </Card>
                            </Stack>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <style>{`.fw-black { font-weight: 900; }`}</style>
        </div>
    );
};

export default UserProfile;