import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Badge, Image, Stack } from 'react-bootstrap';
import { Trash, PersonBoundingBox } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../Services/api';


const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const data = await apiRequest('/user');
            if (data) setUsers(data);
        } catch (error) {
            console.error("Errore caricamento lista utenti:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Sei sicuro di voler eliminare questo utente?")) return;
        try {
            await apiRequest(`/user/${id}`, { method: 'DELETE' });
            fetchUsers();
            alert("Utente eliminato con successo");
        } catch (error) {
            console.error("Errore durante l'eliminazione:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <Container className="py-5 text-center">Caricamento utenti...</Container>;

    return (
        <Container fluid="md" className="py-4">
            <h2 className="mb-4 fw-bold text-danger">Gestione Utenti</h2>

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
                                    src={u.avatar}
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
                                {/* Stack per allineare i pulsanti orizzontalmente */}
                                <Stack direction="horizontal" gap={2} className="justify-content-center">

                                    {/* NUOVO PULSANTE VISUALIZZA PROFILO */}
                                    <Button
                                        variant="outline-dark"
                                        size="sm"
                                        className="p-2"
                                        onClick={() => navigate(`/userprofile/${u._id}`)} // Assicurati che la rotta sia corretta
                                        title="Visualizza Profilo"
                                    >
                                        <PersonBoundingBox size={18} />
                                        <span className="d-none d-lg-inline ms-1">Profilo</span>
                                    </Button>

                                    {/* PULSANTE ELIMINA */}
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => deleteUser(u._id)}
                                        className="p-2"
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