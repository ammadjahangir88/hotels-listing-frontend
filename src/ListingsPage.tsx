import React, { useEffect, useState } from "react";
import Header from "./header";
import ListView from "./ListView";
import GridView from "./GridView";
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Footer from "./footer";
import { EnvironmentOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Slider } from "antd"; // make sure this is imported at the top

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
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8000/property/list-property?checkIn=${checkIn}&checkOut=${checkOut}`
      );
      const data = await response.json();
      console.log("Fetched data:", data);
      setProperties(data.properties);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    finally {
      setIsLoading(false);
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
      padding: "9px 16px",
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
      padding: "23px 33px",
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

    viewToggleContainer: {
      display: "inline-flex",
      background: "#e36d68",
      borderRadius: "40px",
      padding: "6px",
      alignItems: "center",
      gap: "6px",

      alignSelf: "flex-end",
    },

    toggleButton: {
      border: "none",
      borderRadius: "30px",
      background: "transparent",
      color: "white",
      fontWeight: "500",
      padding: "8px 18px",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      // transition: "all 0.3s ease",
    },

    toggleButtonActive: {
      background: "white",
      color: "#333",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },

    icon: {
      fontSize: "16px",
    },


  };

  return (
    <>
      <Header />

      {/* Search Bar Section */}
      <div style={styles.searchContainer}>
        <div style={styles.searchBar}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Check-in</label>
            <DatePicker
              format="YYYY-MM-DD"
              value={checkIn ? dayjs(checkIn, "YYYY-MM-DD") : null}
              onChange={(date, dateString) => {
                if (typeof dateString === "string") {
                  setCheckIn(dateString);
                } else {
                  setCheckIn("");
                }
              }}
              style={{ width: "100%", borderRadius: 8, ...styles.input }}
              placeholder="Select date"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Check-out</label>
            <DatePicker
              format="YYYY-MM-DD"
              value={checkOut ? dayjs(checkOut, "YYYY-MM-DD") : null}
              onChange={(date, dateString) => {
                if (typeof dateString === "string") {
                  setCheckOut(dateString);
                } else {
                  setCheckOut("");
                }
              }}
              style={{ width: "100%", borderRadius: 8, ...styles.input }}
              placeholder="Select date"
            />
          </div>


          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            style={{
              ...styles.button,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "8px",
            }}
          >
            Search
          </Button>

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
                <span style={styles.locationIcon}><EnvironmentOutlined /></span>
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

                <Slider
                  range
                  min={100}
                  max={10000}
                  step={50}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value)}
                  trackStyle={[{ backgroundColor: "#e36d68" }]}
                  handleStyle={[
                    { borderColor: "#e36d68" },
                    { borderColor: "#e36d68" },
                  ]}
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


            {/* Distance to lift/piste and Ski-in/Ski-out */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Distance to lift/piste and Ski-in/Ski-out</label>
              <div style={styles.sliderContainer}>
                <Slider
                  min={0}
                  max={50}
                  step={1}
                  value={distanceToSki}
                  onChange={(value) => setDistanceToSki(value)}
                  tooltip={{ formatter: (value) => `${value} km` }}
                  trackStyle={[{ backgroundColor: "#e36d68" }]}
                  handleStyle={[{ borderColor: "#e36d68" }]}
                />
                <div style={styles.sliderValue}>{distanceToSki} km</div>
              </div>
            </div>

          </div>
        </aside>
        {/* View Toggle */}

        {/* Properties List */}
        <div style={{ flex: 1 }}>
          {properties.length >= 0 && (
            <div style={styles.viewToggleContainer}>
              <button
                onClick={() => setViewType('grid')}
                style={{
                  ...styles.toggleButton,
                  ...(viewType === 'grid' ? styles.toggleButtonActive : {}),
                }}
              >
                <AppstoreOutlined style={{ marginRight: '8px', fontSize: 18, }} />
                Grid
              </button>
              <button
                onClick={() => setViewType('list')}
                style={{
                  ...styles.toggleButton,
                  ...(viewType === 'list' ? styles.toggleButtonActive : {}),
                }}
              >
                <UnorderedListOutlined style={{ marginRight: '8px', fontSize: 18, }} />
                List
              </button>
            </div>
          )}
          {viewType === "list" ? (
            <ListView
              properties={properties}

              isLoading={isLoading}
              skeletonCount={6}
            />
          ) : (
            <GridView properties={properties}

              isLoading={isLoading}
              skeletonCount={6} />
          )}
        </div>

      </div>
      <Footer />
    </>
  );
};

export default ListingsPage;