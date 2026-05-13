import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', surname: '', email: '', password: '', birthDate: '' });
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleFile = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (avatar) data.append('avatar', avatar);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, { method: 'POST', body: data });
        if (response.ok) navigate('/login');
        else alert("Errore durante la registrazione");
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Registrati</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.avatarZone}>
                        <div style={styles.circle}>{preview && <img src={preview} style={styles.img} />}</div>
                        <input type="file" id="up" hidden onChange={handleFile} />
                        <label htmlFor="up" style={styles.linkLabel}>Carica Foto</label>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input name="name" placeholder="Nome" onChange={e => setFormData({ ...formData, name: e.target.value })} style={styles.inputHalf} />
                        <input name="surname" placeholder="Cognome" onChange={e => setFormData({ ...formData, surname: e.target.value })} style={styles.inputHalf} />
                    </div>
                    <input name="email" type="email" placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} style={styles.input} />
                    <input name="password" type="password" placeholder="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} style={styles.input} />
                    <input name="birthDate" type="date" onChange={e => setFormData({ ...formData, birthDate: e.target.value })} style={styles.input} />
                    <button type="submit" style={styles.button}>Crea Account</button>

                </form>
                <p style={styles.footer}>Hai un account? <span onClick={() => navigate('/login')} style={styles.link}>Login</span></p>
            </div>
        </div>
    );
};
const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' },
    card: { backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
    title: { marginBottom: '20px', color: '#333' },
    form: { display: 'flex', flexDirection: 'column', gap: '12px' },
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' },
    inputHalf: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', width: '50%' },
    button: { padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#333', color: '#fff', fontWeight: 'bold', cursor: 'pointer' },
    googleButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer' },
    avatarZone: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' },
    circle: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#eee', overflow: 'hidden' },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    linkLabel: { fontSize: '12px', color: '#007bff', cursor: 'pointer' },
    footer: { marginTop: '15px', fontSize: '14px' },
    link: { color: '#007bff', cursor: 'pointer', fontWeight: 'bold' },
    divider: { margin: '15px 0', color: '#aaa', fontSize: '12px' },
    errorBadge: { color: 'red', fontSize: '13px', marginBottom: '10px' }
};
export default RegisterPage