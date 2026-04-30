import React from 'react';

const LogoTYM = ({ size = 60 }) => {
    // Calcoliamo le proporzioni in base alla prop "size"
    const boxStyle = {
        backgroundColor: '#e63244', // Il rosso tipico dell'immagine
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'skewX(-8deg)', // Inclinazione del quadrato
        borderRadius: '2px',
        cursor: 'pointer'
    };

    const textStyle = {
        color: 'white',
        fontFamily: '"Arial Black", Gadget, sans-serif',
        fontSize: `${size * 0.35}px`, // Font proporzionale al quadrato
        fontWeight: '900',
        letterSpacing: '-1px',
        transform: 'skewX(8deg)', // Contro-inclinazione per raddrizzare il testo
        userSelect: 'none'
    };

    return (
        <div style={boxStyle}>
            <span style={textStyle}>TYM</span>
        </div>
    );
};

export default LogoTYM;