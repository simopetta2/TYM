import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Badge, Image } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { apiRequest } from '../../Services/api'; // Assicurati che il percorso sia corretto
const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const data = await apiRequest('/user'); // Gestisce già il token e il base URL
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
            await apiRequest(`/user/${id}`, { method: 'DELETE' }); //[cite: 21]
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
        <Container fluid="md" className="py-4 ">
            <h2 className="mb-4 fw-bold text-danger">Gestione Utenti</h2>

            {/* responsive="sm" permette lo scroll orizzontale solo su schermi piccoli */}
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
                <tbody style={{ borderRadius: "10px" }}>
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
                                {/* Mostriamo l'email sotto il nome solo su mobile per risparmiare spazio */}
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
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => deleteUser(u._id)}
                                    className="p-2"
                                >
                                    <Trash size={18} />
                                    <span className="d-none d-lg-inline ms-1">Elimina</span>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminPanel;