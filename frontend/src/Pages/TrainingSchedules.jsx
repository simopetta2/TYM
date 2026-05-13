import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Spinner } from 'react-bootstrap';
import {
    FileEarmarkPdf,
    FileEarmarkExcel,
    FileEarmarkImage,
    Eye,
    Trash3,
    Calendar3,
    CloudArrowUp,
    InfoCircle,
    ArrowLeft
} from 'react-bootstrap-icons';
import { apiRequest } from '../Services/api';
import { useNavigate } from 'react-router-dom';

const TrainingSchedules = () => {
    const navigate = useNavigate()

    const [schedules, setSchedules] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);


    const [selectedFile, setSelectedFile] = useState(null);


    const [formData, setFormData] = useState({
        title: '',
        category: '',
        userId: '',
    });


    const loadData = async () => {
        try {

            const me = await apiRequest('/user/me');
            setCurrentUser(me);


            if (me.role === 'admin') {
                const allUsers = await apiRequest('/user');
                setUsers(allUsers || []);
            }


            const schedulesData = await apiRequest('/schedule');
            setSchedules(schedulesData);
        } catch (error) {
            console.error("Errore caricamento dati:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);


    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile || !formData.userId || !formData.title) {
            alert("Per favore, compila tutti i campi e seleziona un file.");
            return;
        }

        setUploading(true);

        try {

            const data = new FormData();
            data.append('title', formData.title);
            data.append('category', formData.category);
            data.append('user', formData.userId);
            data.append('date', new Date().toLocaleDateString('it-IT'));
            data.append('file', selectedFile);

            await apiRequest('/schedule', {
                method: 'POST',
                body: data,

            });

            alert("Scheda inviata con successo!");


            setFormData({ title: '', category: '', userId: '' });
            setSelectedFile(null);
            e.target.reset()

            loadData();
        } catch (error) {
            console.error("Errore upload:", error);
            alert("Errore durante il caricamento del file.");
        } finally {
            setUploading(false);
        }
    };


    const handleDelete = async (scheduleId) => {

        const confirmDelete = window.confirm("Sei sicuro di voler eliminare questa scheda definitivamente?");

        if (confirmDelete) {
            try {

                await apiRequest(`/schedule/${scheduleId}`, {
                    method: 'DELETE',
                });


                loadData();

            } catch (error) {
                console.error("Errore cancellazione:", error);
                alert("Errore durante l'eliminazione della scheda.");
            }
        }
    };

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Spinner animation="border" variant="danger" />
        </Container>
    );

    return (
        <div className="training-page" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '60px 0' }}>
            <Container>
                <Button
                    variant="link"
                    className="text-dark p-0 mb-5 text-decoration-none d-flex align-items-center gap-2 fw-bold"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft /> TORNA INDIETRO
                </Button>
                <div className="mb-5 text-center text-md-start">
                    <h6 className="text-danger fw-bold text-uppercase mb-2" style={{ letterSpacing: '3px' }}>Performance Archive</h6>
                    <h1 className="fw-black text-dark display-4 mb-0" style={{ letterSpacing: '-2px' }}>
                        SCHEDE <span className="text-outline">ALLENAMENTO</span>
                    </h1>
                </div>

                <Row className="g-4">
                    {/* --- AREA UPLOAD (SOLO ADMIN) --- */}
                    {currentUser?.role === 'admin' && (
                        <Col lg={4} md={6}>
                            <Card className="border-0 shadow-sm rounded-4 h-100 p-4 bg-white" style={{ border: '2px dashed #dee2e6' }}>
                                <div className="text-center">
                                    <CloudArrowUp size={40} className="mb-3 text-danger opacity-75" />
                                    <h6 className="fw-bold text-uppercase small mb-3">Carica Nuova Scheda</h6>

                                    <Form onSubmit={handleUpload}>
                                        <Form.Group className="mb-2">
                                            <Form.Control
                                                size="sm" type="text" placeholder="Titolo Scheda"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-2">
                                            <Form.Control
                                                size="sm" type="text" placeholder="Categoria"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-2">
                                            <Form.Select
                                                size="sm"
                                                value={formData.userId}
                                                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                                                required
                                            >
                                                <option value="">Seleziona Atleta...</option>
                                                {users.map(u => (
                                                    <option key={u._id} value={u._id}>{u.name} {u.surname}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="file" size="sm" accept=".image/*,.xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                                required
                                            />
                                        </Form.Group>

                                        <Button
                                            type="submit" variant="danger" className="w-100 rounded-pill fw-bold"
                                            disabled={uploading}
                                        >
                                            {uploading ? <Spinner size="sm" /> : "Invia all'atleta"}
                                        </Button>
                                    </Form>
                                </div>
                            </Card>
                        </Col>
                    )}

                    {/* --- LISTA DELLE SCHEDE CARICATE --- */}
                    {schedules.map((item) => (
                        <Col key={item._id} lg={4} md={6}>
                            <Card className="border-0 shadow-sm rounded-4 overflow-hidden h-100 tym-card">
                                <div className="p-4 bg-white">
                                    <div className="d-flex justify-content-between align-items-start mb-4">
                                        <div className="file-icon-box p-3 rounded-3 bg-light">
                                            {item.fileType === 'img' && <FileEarmarkImage size={28} className="text-dark" />}
                                            {item.fileType === 'excel' && <FileEarmarkExcel size={28} className="text-success" />}
                                            {item.fileType === 'other' && <InfoCircle size={28} className="text-muted" />}
                                        </div>
                                        <Badge bg="dark" className="rounded-pill px-3 py-2 text-uppercase" style={{ fontSize: '0.65rem' }}>
                                            {item.category}
                                        </Badge>
                                    </div>

                                    <h5 className="fw-bold text-dark mb-1">{item.title}</h5>

                                    {currentUser?.role === 'admin' && (
                                        <p className="text-danger small fw-bold mb-2">
                                            Per: {item.user?.name} {item.user?.surname}
                                        </p>
                                    )}

                                    <div className="d-flex align-items-center gap-2 text-muted small mb-4">
                                        <Calendar3 size={14} />
                                        <span>Data: {item.date}</span>
                                    </div>

                                    <div className="d-flex gap-2">

                                        <Button
                                            variant="dark" className="w-100 rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center gap-2"
                                            onClick={() => window.open(item.fileUrl, '_blank')}
                                        >
                                            <Eye size={18} /> Visualizza
                                        </Button>

                                        {/* PULSANTE ELIMINA (SOLO ADMIN) - Sostituisce Scarica */}
                                        {currentUser?.role === 'admin' && (
                                            <Button
                                                variant="outline-danger"
                                                className="rounded-circle d-flex align-items-center justify-content-center p-2"
                                                style={{ width: '42px', height: '42px' }}
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                <Trash3 size={20} />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div style={{ height: '5px', backgroundColor: '#e5383b' }}></div>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div className="mt-5 p-4 rounded-4 bg-white shadow-sm d-flex align-items-center gap-3">
                    <InfoCircle size={24} className="text-danger" />
                    <p className="m-0 small text-muted">
                        <strong>Nota:</strong> Le schede caricate sono in formato Exel o immagine per garantire la massima compatibilità su ogni dispositivo.
                    </p>
                </div>
            </Container>

            <style>{`
                .text-outline { color: transparent; -webkit-text-stroke: 1px #212529; }
                .fw-black { font-weight: 900; }
                .tym-card { transition: all 0.3s ease; }
                .tym-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; }
                .file-icon-box { transition: background 0.3s ease; }
                .tym-card:hover .file-icon-box { background-color: rgba(229, 56, 59, 0.1) !important; }
            `}</style>
        </div>
    );
};

export default TrainingSchedules;