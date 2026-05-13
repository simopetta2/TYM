import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Badge,
    Form,
    Spinner,
    Toast,
    ToastContainer,
    Modal
} from 'react-bootstrap';
import {
    FileEarmarkExcel,
    FileEarmarkImage,
    Eye,
    Trash3,
    Calendar3,
    CloudArrowUp,
    InfoCircle,
    ArrowLeft,
    CheckCircleFill,
    ExclamationTriangleFill
} from 'react-bootstrap-icons';
import { apiRequest } from '../Services/api';
import { useNavigate } from 'react-router-dom';

const TrainingSchedules = () => {
    const navigate = useNavigate();

    const [schedules, setSchedules] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        userId: '',
    });


    const showMessage = (msg, v = 'success') => {
        setToast({ show: true, message: msg, variant: v });
    };

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
            showMessage("Compila tutti i campi obbligatori", "danger");
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

            showMessage("Scheda inviata con successo!");
            setFormData({ title: '', category: '', userId: '' });
            setSelectedFile(null);
            e.target.reset();
            loadData();
        } catch (error) {
            console.error("Errore upload:", error);
            showMessage("Errore durante il caricamento", "danger");
        } finally {
            setUploading(false);
        }
    };

    const openDeleteConfirm = (id) => {
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            await apiRequest(`/schedule/${itemToDelete}`, {
                method: 'DELETE',
            });
            showMessage("Scheda eliminata correttamente", "dark");
            loadData();
        } catch (error) {
            console.error("Errore cancellazione:", error);
            showMessage("Impossibile eliminare la scheda", "danger");
        } finally {
            setShowDeleteModal(false);
            setItemToDelete(null);
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

                {/* Header */}
                <div className="mb-5 text-center text-md-start">
                    <h6 className="text-danger fw-bold text-uppercase mb-2" style={{ letterSpacing: '3px' }}>Performance Archive</h6>
                    <h1 className="fw-black text-dark display-4 mb-0" style={{ letterSpacing: '-2px' }}>
                        SCHEDE <span className="text-outline">ALLENAMENTO</span>
                    </h1>
                </div>

                <Row className="g-4">
                    {/* Area Upload Admin */}
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

                    {/* Lista Schede */}
                    {schedules.map((item) => (
                        <Col key={item._id} lg={4} md={6}>
                            <Card className="border-0 shadow-sm rounded-4 overflow-hidden h-100 tym-card">
                                <div className="p-4 bg-white">
                                    <div className="d-flex justify-content-between align-items-start mb-4">
                                        <div className="file-icon-box p-3 rounded-3 bg-light">
                                            {item.fileType === 'img' && <FileEarmarkImage size={28} className="text-dark" />}
                                            {item.fileType === 'excel' && <FileEarmarkExcel size={28} className="text-success" />}
                                            {!['img', 'excel'].includes(item.fileType) && <InfoCircle size={28} className="text-muted" />}
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

                                        {currentUser?.role === 'admin' && (
                                            <Button
                                                variant="outline-danger"
                                                className="rounded-circle d-flex align-items-center justify-content-center p-2"
                                                style={{ width: '42px', height: '42px' }}
                                                onClick={() => openDeleteConfirm(item._id)}
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
            </Container>


            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered borderless>
                <Modal.Body className="text-center p-5">
                    <Trash3 size={60} className="text-danger mb-4 opacity-75" />
                    <h3 className="fw-bold text-dark">Sei sicuro?</h3>
                    <p className="text-muted px-md-4">
                        L'eliminazione della scheda è definitiva. L'atleta non potrà più visualizzarla nel suo archivio.
                    </p>
                    <div className="d-flex gap-3 justify-content-center mt-4">
                        <Button variant="light" className="rounded-pill px-4 fw-bold" onClick={() => setShowDeleteModal(false)}>
                            Annulla
                        </Button>
                        <Button variant="danger" className="rounded-pill px-4 fw-bold shadow-sm" onClick={handleConfirmDelete}>
                            Elimina Definitivamente
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* --- SISTEMA DI NOTIFICHE TOAST --- */}
            <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999 }}>
                <Toast
                    onClose={() => setToast({ ...toast, show: false })}
                    show={toast.show}
                    delay={3500}
                    autohide
                    className={`border-0 shadow-lg bg-${toast.variant} text-white`}
                >
                    <Toast.Body className="d-flex align-items-center justify-content-between p-3">
                        <div className="d-flex align-items-center gap-2">
                            {toast.variant === 'danger' ? <ExclamationTriangleFill size={18} /> : <CheckCircleFill size={18} />}
                            <strong className="fw-bold">{toast.message}</strong>
                        </div>
                        <Button
                            variant="link"
                            className="p-0 text-white text-decoration-none fw-bold"
                            onClick={() => setToast({ ...toast, show: false })}
                        >
                            ✕
                        </Button>
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <style>{`
                .text-outline { color: transparent; -webkit-text-stroke: 1px #212529; }
                .fw-black { font-weight: 900; }
                .tym-card { transition: all 0.3s ease; border: 1px solid transparent; }
                .tym-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; border-color: rgba(229, 56, 59, 0.2); }
                .file-icon-box { transition: background 0.3s ease; }
                .tym-card:hover .file-icon-box { background-color: rgba(229, 56, 59, 0.1) !important; }
                .modal-content { border-radius: 25px; border: none; }
            `}</style>
        </div>
    );
};

export default TrainingSchedules;