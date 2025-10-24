import React from "react";
const styles: Record<string, React.CSSProperties> = {
  container: {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    backgroundColor: "white",

  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 60px",
    background: "linear-gradient(135deg, #d68ec9 0%, #c77aba 100%)",
    height: "75px",
    color: "white",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "18px",
    fontWeight: 500,
  },
  logoIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "contain",

    padding: "5px",
  },
  navLinks: {
    display: "flex",
    gap: "40px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontWeight: 500,
    transition: "opacity 0.3s ease, transform 0.2s ease",
    cursor: "pointer",
  },
  breadcrumbContainer: {
    maxWidth: "1280px",
    margin: "0 auto ",
    padding: "20px 16px 0 16px"

  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#666",
  },
  breadcrumbLink: {
    color: "#666",
    textDecoration: "none",
    transition: "color 0.3s ease",
    cursor: "pointer",
  },
  breadcrumbSeparator: {
    color: "#999",
    userSelect: "none",
  },
  breadcrumbCurrent: {
    color: "#333",
    fontWeight: 500,
  },
  gallerySection: {
    backgroundColor: "white",
  },
  galleryContainer: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "24px 16px",
    marginBottom: '50px'
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
    height: "400px",
  },
  mainImage: {
    gridColumn: "span 2",
    gridRow: "span 2",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  },

  costOverview: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 16px",

    marginBottom: '20px'
  },
  title: {
    fontSize: "32px",
    fontWeight: 600,
    color: "#333",
    marginBottom: "20px",
  },
  noteContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "16px",
    backgroundColor: "#fff5f5",
    borderRadius: "8px",
    border: "1px solid #fecaca",
  },
  noteIcon: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#ef4444",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "16px",
    flexShrink: 0,
  },
  noteText: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.5",
  },
  cardsContainer: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 16px",

    marginBottom: '20px',

    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "white",
    padding: "0",
    borderRadius: "12px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardHeader: {
    background: "linear-gradient(135deg, #d68ec9 0%, #c77aba 100%)",
    padding: "30px 24px",
    borderRadius: "12px 12px 0 0",
    marginBottom: "20px",
  },
  iconCircle: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  cardSubtitle: {
    color: "white",
    fontSize: "14px",
    margin: 0,
    lineHeight: "1.5",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#333",
    marginBottom: "12px",
    padding: "0 24px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
    margin: 0,
    padding: "0 24px 24px 24px",
  },
  wrapper: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '40px',
    alignItems: 'start'
  },
  descContainer: {
    backgroundColor: '#fff'
    
  },
 
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px'
  },
  hotelTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  propertyDetails: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '32px',
    fontSize: '14px',
    color: '#666'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    marginBottom: '32px'
  },
  section: {
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#333'
  },
  list: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '8px'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#444'
  },
  facilityGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px'
  },
  icon: {
    width: '16px',
    height: '16px',
    flexShrink: 0
  },
  iconGreen: {
    color: '#22c55e'
  },
  iconRed: {
    color: '#ef4444'
  },
  iconGray: {
    color: '#666'
  },
  description: {
    gridColumn: '1 / -1',
    marginTop: '32px'
  },
  descriptionText: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#444',
    marginBottom: '16px'
  },
  readMore: {
    color: '#ef4444',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  sidebar: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #e5e5e5',
    position: 'sticky',
    top: '20px'
  },
  sidebarTitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '16px'
  },
  dateSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '16px'
  },
  dateInput: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  label: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '500'
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#333',
    backgroundColor: '#f9f9f9'
  },
  guestsSection: {
    marginBottom: '16px'
  },
  guestsInput: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#333',
    backgroundColor: '#ffffff'
  },
  priceSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e5e5'
  },
  priceLabel: {
    fontSize: '14px',
    color: '#666'
  },
  price: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333'
  },
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    paddingTop: '8px'
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333'
  },
  totalPrice: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333'
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#e36d68',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  note: {
    fontSize: '11px',
    color: '#999',
    textAlign: 'center',
    marginTop: '12px',
    lineHeight: '1.4'
  }
};
export default styles;