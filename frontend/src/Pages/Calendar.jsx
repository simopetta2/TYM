import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Modal, Button, Form } from 'react-bootstrap';
import { Trash, CalendarPlus, InfoCircle, Person } from 'react-bootstrap-icons';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { apiRequest } from '../Services/api';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [eventData, setEventData] = useState({ id: null, title: '', start: '', description: '', user: '' });

    const init = async () => {
        setLoading(true);
        try {
            const userData = await apiRequest('/user/me');
            setUser(userData);
            if (userData.role === 'admin') {
                const usersList = await apiRequest('/user');
                setUsers(usersList || []);
            }
            await loadCalendarData();
        } catch (error) {
            console.error("Errore inizializzazione:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadCalendarData = async () => {
        try {
            const data = await apiRequest('/events');
            if (data && Array.isArray(data)) {
                const formattedEvents = data.map(evt => ({
                    id: evt._id,
                    title: evt.title,
                    start: evt.start,
                    description: evt.description,
                    extendedProps: { userId: evt.user },
                    backgroundColor: '#e5383b',
                    borderColor: '#e5383b',
                    textColor: '#ffffff'
                }));
                setEvents(formattedEvents);
            }
        } catch (error) {
            console.error("Errore caricamento eventi:", error);
        }
    };

    useEffect(() => { init(); }, []);

    const isUserAdmin = user?.role === 'admin';

    const getAthleteName = (eventUserField) => {

        if (!eventUserField || users.length === 0) return "CARICAMENTO...";
        const targetId = typeof eventUserField === 'object' ? eventUserField._id : eventUserField;

        const found = users.find(u => {
            const userId = String(u._id).trim();
            const searchId = String(targetId).trim();
            return userId === searchId;
        });

        if (found) {
            return `${found.name} ${found.surname}`.toUpperCase();
        }

        return "NON TROVATO (ID: " + targetId + ")";
    };
    const handleDateClick = (arg) => {
        if (!isUserAdmin) return;
        setEventData({ id: null, title: '', start: arg.dateStr, description: '', user: '' });
        setShowModal(true);
    };

    const handleEventClick = (info) => {
        setEventData({
            id: info.event.id,
            title: info.event.title,
            start: info.event.startStr,
            description: info.event.extendedProps.description || '',
            user: info.event.extendedProps.userId || ''
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!isUserAdmin) return;
        try {
            const method = eventData.id ? 'PATCH' : 'POST';
            const endpoint = eventData.id ? `/events/${eventData.id}` : '/events';
            await apiRequest(endpoint, { method, body: JSON.stringify(eventData) });
            setShowModal(false);
            loadCalendarData();
        } catch (error) {
            alert("Errore salvataggio");
        }
    };

    const handleDelete = async () => {
        if (!isUserAdmin || !window.confirm("Eliminare la sessione?")) return;
        try {
            await apiRequest(`/events/${eventData.id}`, { method: 'DELETE' });

            setShowModal(false);
            loadCalendarData();
        } catch (error) {
            alert("Errore eliminazione");
        }
    };

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Spinner animation="border" variant="danger" />
        </Container>
    );

    return (
        <div className="calendar-main-container" style={{ backgroundColor: '#fdfdfd', minHeight: '100vh', padding: '40px 0' }}>
            <Container>
                {/* Header Moderno */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="fw-black text-dark m-0" style={{ fontSize: '2.8rem', letterSpacing: '-2px', lineHeight: '1' }}>
                            TRAINING <span style={{ color: '#e5383b' }}>LOG</span>
                        </h1>
                        <div style={{ width: '50px', height: '4px', backgroundColor: '#e5383b', marginTop: '10px' }}></div>
                    </div>
                    {isUserAdmin && (
                        <Button variant="dark" className="rounded-pill px-4 py-2 shadow-sm fw-bold border-0" onClick={() => { setEventData({ id: null, title: '', start: new Date().toISOString().split('T')[0], description: '', user: '' }); setShowModal(true); }}>
                            <CalendarPlus className="me-2" /> NUOVA SESSIONE
                        </Button>
                    )}
                </div>

                {/* Card Calendario */}
                <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                    <Card.Body className="p-4 bg-white">
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={events}
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                            locale="it"
                            height="auto"
                            headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth' }}
                        />
                    </Card.Body>
                </Card>
            </Container>

            {/* Modal Light Modern */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered className="calendar-modal">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-black text-dark text-uppercase" style={{ letterSpacing: '-1px' }}>
                        {isUserAdmin ? (eventData.id ? 'Modifica' : 'Nuovo Programma') : 'Dettagli Workout'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-4">
                    <Form>
                        {isUserAdmin && (
                            <Form.Group className="mb-4">
                                <Form.Label className="small fw-bold text-muted text-uppercase">Atleta</Form.Label>
                                {eventData.id ? (
                                    <div className="p-3 rounded-3 bg-light d-flex align-items-center fw-bold">
                                        <Person className="me-2 text-danger" /> {getAthleteName(eventData.user)}
                                    </div>
                                ) : (
                                    <Form.Select className="border-0 bg-light p-3 rounded-3 shadow-none" value={eventData.user} onChange={(e) => setEventData({ ...eventData, user: e.target.value })}>
                                        <option value="">Seleziona atleta...</option>
                                        {users.map(u => <option key={u._id} value={u._id}>{u.name} {u.surname}</option>)}
                                    </Form.Select>
                                )}
                            </Form.Group>
                        )}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-muted text-uppercase">Titolo Sessione</Form.Label>
                            <Form.Control type="text" className="border-0 bg-light p-3 rounded-3 shadow-none fw-bold" value={eventData.title} readOnly={!isUserAdmin} onChange={(e) => setEventData({ ...eventData, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-muted text-uppercase">Data</Form.Label>
                            <Form.Control type="date" className="border-0 bg-light p-3 rounded-3 shadow-none" value={eventData.start} readOnly={!isUserAdmin} onChange={(e) => setEventData({ ...eventData, start: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-danger text-uppercase">Note Tecniche</Form.Label>
                            <Form.Control as="textarea" rows={5} className="border-0 bg-light p-3 rounded-3 shadow-none" style={{ resize: 'none' }} value={eventData.description} readOnly={!isUserAdmin} onChange={(e) => setEventData({ ...eventData, description: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0 justify-content-between pb-4">
                    {eventData.id && isUserAdmin && (
                        <Button variant="link" onClick={handleDelete} className="text-danger p-0 border-0"><Trash size={22} /></Button>
                    )}
                    <div className="ms-auto">
                        <Button variant="light" className="rounded-pill px-4 me-2 fw-bold text-muted border-0" onClick={() => setShowModal(false)}>CHIUDI</Button>
                        {isUserAdmin && (
                            <Button variant="danger" className="rounded-pill px-4 fw-bold border-0" onClick={handleSave} style={{ backgroundColor: '#e5383b' }}>SALVA</Button>
                        )}
                    </div>
                </Modal.Footer>
            </Modal>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                
                .calendar-main-container { font-family: 'Inter', sans-serif; }
                .fw-black { font-weight: 900; }
                
                /* RIMOZIONE BLU E RESET FULLCALENDAR */
                .fc .fc-toolbar-title { font-weight: 900; text-transform: uppercase; letter-spacing: -1px; color: #212529; }
                .fc .fc-button { background: #212529 !important; border: none !important; border-radius: 50px !important; text-transform: uppercase; font-size: 0.7rem !important; font-weight: 700 !important; transition: all 0.2s; }
                .fc .fc-button:hover { background: #e5383b !important; }
                .fc .fc-button-primary:not(:disabled).fc-button-active, .fc .fc-button-primary:not(:disabled):active { background: #e5383b !important; }
                
                /* Numeri giorni e link giorni */
                .fc-daygrid-day-number, .fc-col-header-cell-cushion { 
                    color: #212529 !important; 
                    text-decoration: none !important; 
                    font-weight: 700 !important;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                }
                .fc-col-header-cell-cushion { color: #adb5bd !important; }

                /* Eventi nel calendario */
                .fc-event { 
                    background-color: #e5383b !important; 
                    border: none !important; 
                    border-radius: 4px !important; 
                    padding: 2px 8px !important;
                    font-weight: 600 !important;
                    font-size: 0.85rem !important;
                }

                .fc-day-today { background: rgba(229, 56, 59, 0.05) !important; }

                /* Modal Styling */
                .calendar-modal .modal-content { border-radius: 24px; border: none; }
                .bg-light { background-color: #f4f4f4 !important; }
                input:read-only, textarea:read-only { background-color: #fbfbfb !important; border: 1px dashed #eee !important; }
            `}</style>
        </div>
    );
};

export default Calendar;