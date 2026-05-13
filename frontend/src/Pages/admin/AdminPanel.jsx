import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Badge, Image, Stack, Modal, Alert } from 'react-bootstrap';
import { Trash, PersonBoundingBox, ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../Services/api';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();


    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const fetchUsers = async () => {
        try {
            const data = await apiRequest('/user');
            if (data && Array.isArray(data)) {
                const filteredUsers = data.filter(u => u.role !== 'admin')
                setUsers(filteredUsers)
            };
        } catch (error) {
            console.error("Errore caricamento lista utenti:", error);
        } finally {
            setLoading(false);
        }
    };


    const openDeleteModal = (user) => {
        setUserToDelete(user);
        setShowModal(true);
    };


    const handleDelete = async () => {
        if (!userToDelete) return;

        try {
            await apiRequest(`/user/${userToDelete._id}`, { method: 'DELETE' });
            setShowModal(false);
            setUserToDelete(null);


            fetchUsers();

            setMessage({ type: 'success', text: "Utente eliminato correttamente." });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'danger', text: "Errore durante l'eliminazione." });
            setShowModal(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <Container className="py-5 text-center">Caricamento utenti...</Container>;

    return (
        <Container fluid="md" className="py-4">

            <Modal show={showModal} onHide={() => setShowModal(false)} centered border="0">
                <Modal.Body className="text-center p-5">
                    <div className="mb-4">
                        <Trash size={50} className="text-danger" />
                    </div>
                    <h3 className="fw-bold">Sei sicuro?</h3>
                    <p className="text-muted">
                        L'eliminazione dell'atleta <strong>{userToDelete?.name} {userToDelete?.surname}</strong> è permanente.
                    </p>
                    <Stack gap={2} className="mt-4">
                        <Button variant="danger" className="rounded-pill fw-bold py-2" onClick={handleDelete}>
                            ELIMINA DEFINITIVAMENTE
                        </Button>
                        <Button variant="light" className="rounded-pill fw-bold py-2" onClick={() => setShowModal(false)}>
                            ANNULLA
                        </Button>
                    </Stack>
                </Modal.Body>
            </Modal>

            <Button
                variant="link"
                className="text-dark p-0 mb-4 text-decoration-none d-flex align-items-center gap-2 fw-bold"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft /> TORNA INDIETRO
            </Button>

            <h2 className="mb-4 fw-bold text-danger">Gestione Utenti</h2>

            {message && <Alert variant={message.type} className="mb-4">{message.text}</Alert>}

            <Table striped bordered hover responsive="sm" className="shadow-sm align-middle">
                <thead className="table-dark">
                    <tr>
                        <th style={{ width: '80px' }}>Foto</th>
                        <th>Info Utente</th>
                        <th className="d-none d-md-table-cell">Email</th>
                        <th>Ruolo</th>
                        <th className="text-center">Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td>
                                <Image
                                    src={u.avatar || 'https://via.placeholder.com/50'}
                                    roundedCircle
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    alt="profile"
                                />
                            </td>
                            <td>
                                <div className="fw-bold">{u.name} {u.surname}</div>
                                <div className="d-md-none small text-muted text-break">{u.email}</div>
                            </td>
                            <td className="d-none d-md-table-cell text-break">
                                {u.email}
                            </td>
                            <td>
                                <Badge bg={u.role === 'admin' ? 'danger' : 'secondary'}>
                                    {u.role || 'user'}
                                </Badge>
                            </td>
                            <td className="text-center">
                                <Stack direction="horizontal" gap={2} className="justify-content-center">
                                    <Button
                                        variant="outline-dark"
                                        size="sm"
                                        className="p-2"
                                        onClick={() => navigate(`/userprofile/${u._id}`)}
                                        title="Visualizza Profilo"
                                    >
                                        <PersonBoundingBox size={18} />
                                        <span className="d-none d-lg-inline ms-1">Profilo</span>
                                    </Button>

                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="p-2"
                                        onClick={() => openDeleteModal(u)}
                                        title="Elimina Utente"
                                    >
                                        <Trash size={18} />
                                        <span className="d-none d-lg-inline ms-1">Elimina</span>
                                    </Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminPanel;