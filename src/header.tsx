import React from "react";

const Header: React.FC = () => {
  const styles: Record<string, React.CSSProperties> = {
    header: {
      background: "linear-gradient(135deg, #d68ec9 0%, #c77aba 100%)",
      height: "500px",
      padding: "0",
      position: "relative",
      overflow: "hidden",
      width: "100%",
    },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 60px",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "white",
      fontSize: "18px",
      fontWeight: "500",
    },
    logoIcon: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
    },
    navLinks: {
      display: "flex",
      gap: "40px",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "15px",
      cursor: "pointer",
      transition: "opacity 0.3s",
    },
    heroContent: {
      padding: "70px",
      position: "relative",
      zIndex: 1,
    },
    heroTitle: {
      color: "white",
      fontSize: "56px",
      fontWeight: "300",
      lineHeight: "1.2",
      margin: 0,
      maxWidth: "500px",
    },
    mountainShape: {
      position: "absolute",
      bottom: "0",
      right: "100px",
      width: "0",
      height: "0",
      borderLeft: "150px solid transparent",
      borderRight: "150px solid transparent",
      borderBottom: "200px solid rgba(255, 255, 255, 0.1)",
    },
  };

  return (
    <div style={styles.header}>
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <img
            style={styles.logoIcon}
            src="https://cdn.prod.website-files.com/66d0721a484d4719438c9a34/67224afcbca6e4fcae1d8d7d_Logo.svg"
            alt="Logo"
          />
          <span>Wintersporten.nl</span>
        </div>

        <ul style={styles.navLinks}>
          {["Destinations", "Inspirations", "About Us", "Bookings"].map(
            (link) => (
              <li key={link}>
                <a
                  style={styles.navLink}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.opacity = "0.8";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.opacity = "1";
                  }}
                >
                  {link}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>

      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>
          Feeling good
          <br />
          has a name
        </h1>
      </div>

      <div style={styles.mountainShape}></div>
    </div>
  );
};

export default Header;
