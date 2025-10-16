import React, { useEffect, useState } from "react";
import Header from "./header";
import ListView from "./ListView";
import GridView from "./GridView";

const ListingsPage = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [properties, setProperties] = useState([]);
  const [viewType, setViewType] = useState('list');

  // Filter states
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([100, 10000]);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);


  const [accommodationTypes, setAccommodationTypes] = useState({
    "Apartment/Hotel": false,
    "Bungalow": false,
    "Chalet": false,
    "Divers": false,
    "Farmhouse": false,
    "Holiday village": false,
    "Residence": false,
    "Castle/Mansion": false,
    "Villa": false,
    "Yacht": false,
  });
  const [distanceToSki, setDistanceToSki] = useState(10);

  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:8000/property/list-property?checkIn=${checkIn}&checkOut=${checkOut}`
      );
      const data = await response.json();
      console.log("Fetched data:", data);
      setProperties(data.properties);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }


  const handleSearch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  type AccommodationType = "Apartment/Hotel" | "Bungalow" | "Chalet" | "Divers" | "Farmhouse" | "Holiday village" | "Residence" | "Castle/Mansion" | "Villa" | "Yacht";

  const handleAccommodationTypeChange = (type: AccommodationType) => {
    setAccommodationTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };


  const styles: Record<string, React.CSSProperties> = {
    simpleText: {
      height: "200px",
      background: "linear-gradient(135deg, #d68ec9 0%, #c77aba 100%)",
      position: "relative",
      overflow: "visible",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    searchContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      padding: "0 0px",
      marginTop: "-60px",
      position: "relative",
      zIndex: 10,
    },
    searchBar: {
      maxWidth: "900px",
      width: "100%",
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      padding: "30px 40px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      flex: 1,
    },
    label: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#666",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    input: {
      padding: "14px 16px",
      border: "2px solid #e0e0e0",
      borderRadius: "10px",
      fontSize: "16px",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      width: "100%",
      boxSizing: "border-box",
    },
    button: {
      padding: "16px 32px",
      background: "#e36d68",
      color: "white",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(227, 109, 104, 0.4)",
      marginTop: "26px",
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    mainContainer: {
      display: "flex",
      maxWidth: "1200px",
      margin: "60px auto",
      padding: "0 20px",
      gap: "30px",
    },
    sidebar: {
      width: "320px",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
      padding: "20px 24px",
      height: "fit-content",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    filterHeader: {
      borderBottom: "1px solid #f0f0f0",
      paddingBottom: "10px",
    },
    filterHeading: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#333",
    },
    filterContent: {
      display: "flex",
      flexDirection: "column",
      gap: "28px",
    },
    filterGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },

    filterLabel: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#444",
      marginBottom: "4px",
    },
    selectWrapper: {
      position: "relative",
      width: "100%",
    },
    locationIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#999",
      pointerEvents: "none",
      fontSize: "16px",
    },
    filterSelect: {
      width: "100%",
      padding: "10px 12px 10px 36px",
      borderRadius: "6px",
      border: "1px solid #e5e5e5",
      outline: "none",
      fontSize: "14px",
      boxSizing: "border-box",
      appearance: "none",
      background: "white",
      cursor: "pointer",
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 12px center",
    },
    priceRangeContainer: {
      marginTop: "12px",
    },
    priceLabels: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "12px",
      color: "#666",
      marginBottom: "8px",
    },
    rangeSlider: {
      width: "100%",
      height: "4px",
      background: "#e5e5e5",
      borderRadius: "2px",
      appearance: "none",
      outline: "none",
      accentColor: "#e36d68",
    },
    bedroomBathroomRow: {
      display: "flex",
      gap: "16px",
      marginBottom: '20px'
    },
    halfWidth: {
      flex: 1,
    },
    counterContainer: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginTop: "8px",
    },
    counterButton: {
      width: "32px",
      height: "32px",
      borderRadius: "6px",
      border: "1px solid #e5e5e5",
      background: "white",
      cursor: "pointer",
      fontSize: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#666",
      transition: "all 0.2s ease",
    },
    counterButtonActive: {
      background: "#c77aba",
      color: "white",
      border: "1px solid #c77aba",
    },
    counterValue: {
      fontSize: "16px",
      fontWeight: "500",
      minWidth: "20px",
      textAlign: "center",
      color: "#333",
    },
    sliderContainer: {
      marginTop: "12px",
    },
    sliderValue: {
      fontSize: "12px",
      color: "#666",
      marginTop: "4px",
    },
    checkboxGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
      marginTop: "8px",
    },
    checkboxItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    checkbox: {
      width: "18px",
      height: "18px",
      cursor: "pointer",
      accentColor: "#c77aba",
    },
    checkboxLabel: {
      fontSize: "14px",
      color: "#555",
      cursor: "pointer",
    },
    listContainer: {
      maxWidth: "1100px",
      margin: "60px auto",
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    card: {
      display: "flex",
      gap: "20px",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      overflow: "hidden",
      transition: "transform 0.2s ease",
    },
    image: {
      width: "280px",
      height: "200px",
      objectFit: "cover",
      borderTopLeftRadius: "16px",
      borderBottomLeftRadius: "16px",
    },
    info: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "20px",
      flex: 1,
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "8px",
    },
    location: {
      color: "#777",
      fontSize: "15px",
      marginBottom: "12px",
    },
    details: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "16px",
    },
    price: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#e36d68",
    },
    viewButton: {
      background: "#c77aba",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.3s ease",
      alignSelf: "flex-start",
    },
  };

  return (
    <>
      <Header />
      <div style={styles.simpleText}></div>

      {/* Search Bar Section */}
      <div style={styles.searchContainer}>
        <div style={styles.searchBar}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              style={styles.input}
            />
          </div>

          <button style={styles.button} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={styles.mainContainer}>
        {/* Sidebar Filters */}
        <aside style={styles.sidebar}>
          <div style={styles.filterHeader}>
            <h3 style={styles.filterHeading}>Filter</h3>
          </div>

          <div style={styles.filterContent}>
            {/* Location */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Location</label>
              <div style={styles.selectWrapper}>
                <span style={styles.locationIcon}>📍</span>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={styles.filterSelect}
                >
                  <option value="">Scotland</option>
                  <option value="edinburgh">Edinburgh</option>
                  <option value="glasgow">Glasgow</option>
                  <option value="aberdeen">Aberdeen</option>
                  <option value="inverness">Inverness</option>
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Price Range</label>
              <div style={styles.priceRangeContainer}>
                <div style={styles.priceLabels}>
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  style={styles.rangeSlider}
                />
              </div>
            </div>

            {/* Bedrooms & Bathrooms in same row */}
            <div style={styles.bedroomBathroomRow}>
              {/* Bedrooms */}
              <div style={styles.halfWidth}>
                <label style={styles.filterLabel}>Bedrooms</label>
                <div style={styles.counterContainer}>
                  <button
                    style={styles.counterButton}
                    onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
                  >
                    −
                  </button>
                  <span style={styles.counterValue}>{bedrooms}</span>
                  <button
                    style={{
                      ...styles.counterButton,
                      ...styles.counterButtonActive,
                    }}
                    onClick={() => setBedrooms(bedrooms + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Bathrooms */}
              <div style={styles.halfWidth}>
                <label style={styles.filterLabel}>Bathrooms</label>
                <div style={styles.counterContainer}>
                  <button
                    style={styles.counterButton}
                    onClick={() => setBathrooms(Math.max(0, bathrooms - 1))}
                  >
                    −
                  </button>
                  <span style={styles.counterValue}>{bathrooms}</span>
                  <button
                    style={{
                      ...styles.counterButton,
                      ...styles.counterButtonActive,
                    }}
                    onClick={() => setBathrooms(bathrooms + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Accommodation Type - 2 per row */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Accommodation Type</label>

              <div style={styles.checkboxGrid}>
                {(Object.keys(accommodationTypes) as AccommodationType[]).map((type) => (
                  <div key={type} style={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      id={type}
                      checked={accommodationTypes[type]}
                      onChange={() => handleAccommodationTypeChange(type)}
                      style={styles.checkbox}
                    />
                    <label htmlFor={type} style={styles.checkboxLabel}>
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>


            {/* Distance to Ski */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Distance to lift/piste and Ski-in/Ski-out</label>
              <div style={styles.sliderContainer}>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={distanceToSki}
                  onChange={(e) => setDistanceToSki(parseInt(e.target.value))}
                  style={styles.rangeSlider}
                />
                <div style={styles.sliderValue}>{distanceToSki} km</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Properties List */}
        {viewType === 'list' ? (
          <ListView properties={properties} styles={styles} />
        ) : (
          <GridView />
        )}
      </div>
    </>
  );
};

export default ListingsPage;