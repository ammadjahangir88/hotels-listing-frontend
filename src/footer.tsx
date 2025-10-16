import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                {/* Header Section */}
                <div style={styles.header}>
                    <div style={styles.logoSection}>
                        
                            <img
                                style={styles.logoIcon}
                                src="https://cdn.prod.website-files.com/66d0721a484d4719438c9a34/67224afcbca6e4fcae1d8d7d_Logo.svg"
                                alt="Logo"
                            />

                    
                        <h2 style={styles.logoText}>Wintersporten.nl</h2>
                    </div>
                    <p style={styles.tagline}>Feeling good has a name.</p>
                </div>

                {/* Main Content Grid */}
                <div style={styles.mainGrid}>
                    {/* Bestemmingen Column */}
                    <div style={styles.column}>
                        <h3 style={styles.columnTitle}>Bestemmingen</h3>
                        <div style={styles.twoColumnLinks}>
                            <a href="#" style={styles.link}>Andorra</a>
                            <a href="#" style={styles.link}>Duitsland</a>
                            <a href="#" style={styles.link}>Finland</a>
                            <a href="#" style={styles.link}>Frankrijk</a>
                            <a href="#" style={styles.link}>Italië</a>
                            <a href="#" style={styles.link}>Noorwegen</a>
                            <a href="#" style={styles.link}>Oostenrijk</a>
                            <a href="#" style={styles.link}>Polen</a>
                            <a href="#" style={styles.link}>Spanje</a>
                            <a href="#" style={styles.link}>Tsjechië</a>
                            <a href="#" style={styles.link}>Zweden</a>
                            <a href="#" style={styles.link}>Zwitserland</a>
                        </div>
                    </div>

                    {/* Inspiratie Column */}
                    <div style={styles.column}>
                        <h3 style={styles.columnTitle}>Inspiratie</h3>
                        <div style={styles.twoColumnLinks}>
                            <a href="#" style={styles.link}>Après-Ski</a>
                            <a href="#" style={styles.link}>Berg Beleving</a>
                            <a href="#" style={styles.link}>Skigebieden</a>
                            <a href="#" style={styles.link}>Team</a>
                            <a href="#" style={styles.link}>Tips & Tricks</a>
                            <a href="#" style={styles.link}>Wintersporten</a>
                        </div>
                    </div>

                    {/* More Column */}
                    <div style={{ ...styles.column, ...styles.moreColumn }}>
                        <h3 style={styles.columnTitle}>More</h3>
                        <div style={styles.horizontalLinks}>
                            <a href="#" style={styles.link}>Home</a>
                            <a href="#" style={styles.link}>Over Ons</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div style={styles.bottom}>
                    <div style={styles.bottomLeft}>
                        <span style={styles.copyright}>© 2025 Wintersporten.nl. All rights reserved.</span>
                        <a href="#" style={styles.link}>Privacyverklaring</a>
                        <a href="#" style={styles.link}>Gebruiksvoorwaarden</a>
                        <span style={styles.madeWith}>
                            Made with <span style={styles.heart}>❤</span> by P/NK PINEAPPLE
                        </span>
                    </div>

                    <div style={styles.socialIcons}>
                        <a href="#" style={styles.iconLink}>
                            <Facebook size={20} />
                        </a>
                        <a href="#" style={styles.iconLink}>
                            <Instagram size={20} />
                        </a>
                        <a href="#" style={styles.iconLink}>
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const styles: Record<string, React.CSSProperties> = {
    footer: {
        backgroundColor: '#3f3d4f',
        color: '#ffffff',
        padding: '48px 32px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    container: {
        maxWidth: '1280px',
        margin: '0 auto',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '48px',
        paddingBottom: '32px',
        borderBottom: '1px solid #6b6b7b',
        flexWrap: 'wrap',
        gap: '16px',
    },
    logoSection: {
        display: 'flex',
        alignItems: 'center',
        height: '30px'
      
    },
   
    logoIcon: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "40px",
        marginRight:'12px'
    },
   
    logoText: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: 0,
    },
    tagline: {
        fontSize: '18px',
        fontStyle: 'italic',
        margin: 0,
    },
    mainGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '48px',
        marginBottom: '48px',
        paddingBottom: '32px',
        borderBottom: '1px solid #6b6b7b',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    moreColumn: {
        gridColumn: 'span 2',
    },
    columnTitle: {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '16px',
        marginTop: 0,
    },
    twoColumnLinks: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px 32px',
    },
    horizontalLinks: {
        display: 'flex',
        gap: '32px',
        flexWrap: 'wrap',
    },
    link: {
        color: '#d1d5db',
        textDecoration: 'none',
        transition: 'color 0.2s',
        cursor: 'pointer',
    },
    bottom: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
    },
    bottomLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        fontSize: '14px',
        color: '#d1d5db',
        flexWrap: 'wrap',
    },
    copyright: {
        color: '#d1d5db',
    },
    madeWith: {
        color: '#d1d5db',
    },
    heart: {
        color: '#ef4444',
    },
    socialIcons: {
        display: 'flex',
        gap: '16px',
    },
    iconLink: {
        color: '#d1d5db',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        transition: 'color 0.2s',
        cursor: 'pointer',
    },
};

// Add hover effects with a style tag
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  footer a:hover {
    color: #ffffff !important;
  }
`;
document.head.appendChild(styleTag);