import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './HotelDetailsStyle'
import { Link } from "react-router-dom";
import Footer from "./footer";
import { Star, Users, Bed, Home, Wifi, Droplet, Wind, Snowflake, Zap, Leaf, Sun, Recycle, Mountain, Train, Bus, MapPin, Car, Flame, Tv, UtensilsCrossed, Waves, TreePine } from 'lucide-react';
import CheckAvailability from "./CheckAvailability";
import { DatePicker, Select, Button, Typography, Divider, Card } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const HotelDetails = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [hotel, setHotel] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [dates, setDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([
        null,
        null,
    ]);
    const location = useLocation();
    const [pricesArray,setPricesArray]=useState<Array>([])
    const { price } = location.state || {};

    const [totalPrice, setTotalPrice] = useState<number | null>(price);

    const [guests, setGuests] = useState("1");

    const handleDateChange = (values: any) => {
        setDates(values);
    };

    const handleGuestsChange = (value: string) => {
        setGuests(value);
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/property/${id}`);
            setHotel(response.data);
        } catch (error) {
            console.error("Error fetching hotel details:", error);
        } finally {
            setLoading(false);
        }
    };
    // whenever dates change, call API or compute price
    useEffect(() => {
        const [checkIn, checkOut] = dates;
        if (checkIn && checkOut) {
            const nights = checkOut.diff(checkIn, "day");

            axios
                .get("http://localhost:8000/property/api/price", {
                    params: { check_in: checkIn.format("YYYY-MM-DD"), check_out: checkOut.format("YYYY-MM-DD") },
                })
                .then((res) => setTotalPrice(res.data.total))
                .catch((err) => console.error("Error fetching price:", err));
        }
    }, [dates]);
    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, [id]);



    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    // const [guests, setGuests] = useState('1-8 guests');

    if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

    return (
        <>
            <div style={styles.container}>
                {/* Navbar */}
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
                        {["Destinations", "Inspirations", "About Us", "Bookings"].map((link) => (
                            <li key={link}>
                                <a
                                    style={styles.navLink}
                                    onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                                    onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                                    href="#"
                                >
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* Breadcrumbs */}
                <div style={styles.breadcrumbContainer}>
                    <nav style={styles.breadcrumb}>
                        <Link
                            to="/"
                            style={styles.breadcrumbLink}

                        >
                            Home
                        </Link>
                        <span style={styles.breadcrumbSeparator}>›</span>
                        <Link
                            to="/booking-listing"
                            style={styles.breadcrumbLink}

                        >
                            Booking listing
                        </Link>
                        <span style={styles.breadcrumbSeparator}>›</span>
                        <Link
                            to="/hotel"
                            style={styles.breadcrumbLink}

                        >
                            Hotel
                        </Link>
                        <span style={styles.breadcrumbSeparator}>›</span>
                        <span style={styles.breadcrumbCurrent}>
                            {hotel?.name}
                        </span>
                    </nav>
                </div>

                {/* Image Gallery */}
                <div style={styles.gallerySection}>
                    <div style={styles.galleryContainer}>
                        <div style={styles.galleryGrid}>
                            {/* Main Image */}
                            <div style={styles.mainImage}>
                                <img
                                    style={styles.image}
                                    src={hotel?.images[selectedImage]}
                                    alt="Main view"
                                    onClick={() => setSelectedImage(0)}
                                />
                            </div>

                            {/* Thumbnails */}
                            {hotel?.images.slice(1, 5).map((img: string, idx: number) => (
                                <div key={idx}>
                                    <img
                                        style={styles.image}
                                        src={img}
                                        alt={`View ${idx + 2}`}
                                        onClick={() => setSelectedImage(idx + 1)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={styles.wrapper}>
                    <div style={styles.mainLayout}>
                        {/* Left Content */}
                        <div style={styles.descContainer}>


                            <div style={styles.rating}>
                                {Array.from({ length: hotel.stars }).map((_, index) => (
                                    <Star
                                        key={index}
                                        style={{ ...styles.icon, fill: '#facc15', color: '#facc15' }}
                                    />
                                ))}
                            </div>



                            <h1 style={styles.hotelTitle}>{hotel.name}</h1>

                            {/* Property Details */}
                            <div style={styles.propertyDetails}>
                                <div style={styles.detailItem}>
                                    <Home style={styles.icon} />
                                    <span>{hotel.bedrooms} Rooms</span>
                                </div>
                                <div style={styles.detailItem}>
                                    <Droplet style={styles.icon} />
                                    <span>{hotel.bathrooms} Bath</span>
                                </div>
                                <div style={styles.detailItem}>
                                    <Bed style={styles.icon} />
                                    <span>{hotel.toilets} Bed</span>
                                </div>
                                <div style={styles.detailItem}>
                                    <Users style={styles.icon} />
                                    <span>Up To {hotel.max_persons} Guests</span>
                                </div>

                            </div>
                            <div>

                                <div style={styles.mainContent}>
                                    {/* Left Column */}
                                    <div>
                                        {/* Distances */}
                                        <div style={styles.section}>
                                            <h2 style={styles.sectionTitle}>Distances</h2>
                                            <div style={styles.list}>
                                                <div style={styles.listItem}>
                                                    <MapPin style={{ ...styles.icon, ...styles.iconGray }} />
                                                    <span>Nearest town / town centre 2 km</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Bus style={{ ...styles.icon, ...styles.iconGray }} />
                                                    <span>Distance to bus stop 1.8 km</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Train style={{ ...styles.icon, ...styles.iconGray }} />
                                                    <span>Distance to railway station 16.4 km</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <MapPin style={{ ...styles.icon, ...styles.iconGray }} />
                                                    <span>Proximity to golf course 25 km</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Mountain style={{ ...styles.icon, ...styles.iconGray }} />
                                                    <span>Distance to ski slope / mountain lift 300 m</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sustainability */}
                                        <div style={styles.section}>
                                            <h2 style={styles.sectionTitle}>Sustainability</h2>
                                            <div style={styles.facilityGrid}>
                                                <div style={styles.listItem}>
                                                    <Wind style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>Double-glazed windows</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Zap style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>LED lamps</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Droplet style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>Water-efficient toilets / showers</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Flame style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>100% ecological heating system</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Recycle style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>Recycling</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <TreePine style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>Garden</span>
                                                </div>
                                                <div style={{ ...styles.listItem, gridColumn: '1 / -1' }}>
                                                    <Sun style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>100% renewable electricity</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div>
                                        {/* Facilities */}
                                        <div style={styles.section}>
                                            <h2 style={styles.sectionTitle}>Facilities</h2>
                                            <div style={styles.facilityGrid}>
                                                <div style={styles.listItem}>
                                                    <Wifi style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>WiFi</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Flame style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>Fireplace</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <span style={{ ...styles.icon, ...styles.iconRed, fontSize: '16px' }}>🐾</span>
                                                    <span>No pets allowed</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Car style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>Parking</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <UtensilsCrossed style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>Dishwasher</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Tv style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>TV</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Home style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>Balcony / Terrace</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Flame style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>BBQ</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Waves style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>Washing machine</span>
                                                </div>
                                                <div style={styles.listItem}>
                                                    <Wind style={{ ...styles.icon, ...styles.iconGreen }} />
                                                    <span>Non smoking</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div style={styles.description}>
                                        <h2 style={styles.sectionTitle}>Description</h2>
                                        <p style={styles.descriptionText}>
                                            {hotel.inside_description}
                                        </p>
                                        <p style={styles.descriptionText}>
                                            {hotel.outside_description}
                                        </p>

                                    </div>
                                </div>

                            </div>
                            <CheckAvailability dates={dates} onDatesChange={setDates} />
                        </div>

                        {/* Right Sidebar - Booking Widget */}
                        <div style={styles.sidebar}>
                            <div style={styles.sidebarTitle}>Your Selected Travel date is</div>

                            <div style={styles.dateSection}>


                                <div style={styles.dateInput}>
                                    <Text style={{ fontSize: "13px", color: "#666" }}>Arrival</Text>
                                    <DatePicker
                                        style={{
                                            width: "100%",
                                            marginTop: 6,
                                            borderRadius: 8,
                                        }}
                                        placeholder="YYYY-MM-DD"
                                        suffixIcon={<CalendarOutlined />}
                                        value={dates[0]}
                                        onChange={(date) => setDates([date, dates[1]])}
                                    />
                                </div>
                                <div style={styles.dateInput}>
                                    <Text style={{ fontSize: "13px", color: "#666" }}>Departure</Text>
                                    <DatePicker
                                        style={{
                                            width: "100%",
                                            marginTop: 6,
                                            borderRadius: 8,
                                        }}
                                        placeholder="YYYY-MM-DD"
                                        suffixIcon={<CalendarOutlined />}
                                        value={dates[1]}
                                        onChange={(date) => setDates([dates[0], date])}
                                    />
                                </div>
                            </div>

                            <div style={styles.guestsSection}>
                                <label style={styles.label}>Adults and Children</label>
                                <select
                                    style={styles.guestsInput}
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                >

                                    <option>1 guest</option>
                                    <option>2 guests</option>
                                    <option>3 guests</option>
                                    <option>4 guests</option>
                                    <option>5 guests</option>
                                    <option>6 guests</option>
                                    <option>7 guests</option>
                                    <option>8 guests</option>
                                </select>
                            </div>

                            <div style={styles.priceSection}>
                                <span style={styles.priceLabel}>Price per night</span>
                                <span style={styles.price}>EUR {price}</span>
                            </div>

                            <div style={styles.totalSection}>
                                <span style={styles.totalLabel}>Total Price</span>
                                <span style={styles.totalPrice}>EUR 4021</span>
                            </div>

                            <button
                                style={styles.button}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                            >
                                Check Availability
                            </button>

                            <div style={styles.note}>
                                Select your time, you will get a clear summary
                            </div>
                        </div>


                    </div>
                </div>

                <div style={styles.costOverview}>
                    <h2 style={styles.title}>Cost Overview</h2>
                    <div style={styles.noteContainer}>
                        <div style={styles.noteIcon}>!</div>
                        <div style={styles.noteText}>
                            <strong>Note:</strong>
                            <br />
                            Please first select arrival and departure dates
                        </div>
                    </div>
                </div>

                {/* Cards Section */}
                <div style={styles.cardsContainer}>
                    {/* Card 1 - Quality */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.iconCircle}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                            <p style={styles.cardSubtitle}>Only selected and tested accommodation</p>
                        </div>
                        <h3 style={styles.cardTitle}>Quality is our number one priority</h3>
                        <p style={styles.cardDescription}>
                            Every property is checked before your arrival to ensure the best possible stay.
                        </p>
                    </div>



                    {/* Card 2 - Experience */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.iconCircle}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
                                    <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <p style={styles.cardSubtitle}>
                                AI PreciseGuaranteed availability and on-site serviceach
                            </p>
                        </div>
                        <h3 style={styles.cardTitle}>Make the most of our experience</h3>
                        <p style={styles.cardDescription}>
                            Key collection is arranged by our helpful Wintersporten.nl team. 24/7 or on-site service to
                            help you with all your questions, e.g. tips and insights for your holiday destination and
                            your booked accommodation.
                        </p>
                    </div>

                    {/* Card 3 - Privacy */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.iconCircle}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="white" strokeWidth="2" fill="none" />
                                    <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke="white" strokeWidth="2" />
                                    <circle cx="12" cy="16" r="1.5" fill="white" />
                                </svg>
                            </div>
                            <p style={styles.cardSubtitle}>A memorable holiday experience</p>
                        </div>
                        <h3 style={styles.cardTitle}>Privacy and freedom in your own holiday home</h3>
                        <p style={styles.cardDescription}>
                            Be your own boss, eat whenever you want and make the most of plenty of space for all your
                            friends and family.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HotelDetails;
