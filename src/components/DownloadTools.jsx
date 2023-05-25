import React from "react";
import { Helmet } from "react-helmet";

const DownloadTools = () => {
    const handleDownloadArchive = () => {
        window.location.href = 'https:///api.lulu-bot.tech/api/download/tools';
    };

    const handleDownloadInstaller = () => {
        window.location.href = 'https:///api.lulu-bot.tech/api/download/autotools';
    };
    return (
        <>
            <Helmet>
                <title>Скачать Lulu Tools</title>
                <link rel="icon" type="image/png" href="/image/logo.png"/> 
            </Helmet>
            <div style={styles.container}>
                <h1 style={styles.heading}>Страница скачивания Lulu Tools</h1>
                <div style={styles.section}>
                    <h2 style={styles.subheading}>Скачать архив</h2>
                    <button style={styles.button} onClick={handleDownloadArchive}>Скачать</button>
                </div>
                <div style={styles.section}>
                    <h2 style={styles.subheading}>Скачать автоустановщик</h2>
                    <button style={styles.button} onClick={handleDownloadInstaller}>Скачать</button>
                </div>
            </div>
        </>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f2f2f2',
        padding: '20px',
        fontFamily: 'Montserrat, sans-serif',
        textAlign: 'center',
    },
    heading: {
        fontSize: '32px',
        marginBottom: '20px',
        color: '#333',
    },
    section: {
        marginBottom: '20px',
    },
    subheading: {
        fontSize: '24px',
        marginBottom: '10px',
        color: '#666',
    },
    button: {
        padding: '10px 20px',
        fontSize: '20px',
        backgroundColor: '#4285F4',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default DownloadTools;
