import React from "react";
import { useNavigate } from "react-router-dom";
interface Property {
  id: number | string;
  name: string;
  region: string;
  country: string;
  max_persons: number;
  house_code: string,
  bedrooms: number;
  bathrooms: number;
  images?: string[];
  first_availability?: {
    price?: number;
  };
}

interface ListViewProps {
  properties: Property[];
  isLoading?: boolean;
  skeletonCount?: number;
}

const Skeleton: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    style={{
      background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite linear",
      borderRadius: "4px",
      ...style,
    }}
  />
);

const SkeletonCard: React.FC = () => (
  <div style={styles.card}>
    <Skeleton style={{ ...styles.image, borderRadius: "8px" }} />
    <div style={styles.info}>
      <div>
        <Skeleton style={{ width: "70%", height: "24px", marginBottom: "8px" }} />
        <Skeleton style={{ width: "50%", height: "16px", marginBottom: "12px" }} />
        <Skeleton style={{ width: "90%", height: "16px" }} />
      </div>
      <div>
        <Skeleton style={{ width: "120px", height: "20px", marginBottom: "12px" }} />
        <Skeleton style={{ width: "100%", height: "36px", borderRadius: "4px" }} />
      </div>
    </div>
  </div>
);

const ListView: React.FC<ListViewProps> = ({
  properties,
  isLoading = false,
  skeletonCount = 3,
}) => {
  const navigate=useNavigate()
  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
      <div style={styles.listContainer}>
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))
          : properties.map((property) => (
              <div key={property.id} style={styles.card}>
                <img
                  src={
                    property.images && property.images.length > 0
                      ? property.images[0]
                      : "https://via.placeholder.com/280x200?text=No+Image"
                  }
                  alt={property.name}
                  style={styles.image}
                />
                <div style={styles.info}>
                  <div>
                    <h3 style={styles.title}>{property.name}</h3>
                    <p style={styles.location}>
                      {property.region}, {property.country}
                    </p>
                    <p style={styles.details}>
                      👥 Max guests: {property.max_persons} &nbsp;|&nbsp; 🛏️ Bedrooms:{" "}
                      {property.bedrooms} &nbsp;|&nbsp; 🛁 Bathrooms: {property.bathrooms}
                    </p>
                  </div>
                  <div>
                    <p style={styles.price}>
                      €{property.first_availability?.price ?? "N/A"} / night
                    </p>
                    <button style={styles.viewButton} onClick={() => navigate(`/hotel-details/${property.house_code}`,{state:{price: property.first_availability?.price}})}>View Details</button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
  },
  card: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  image: {
    width: "280px",
    height: "200px",
    objectFit: "cover",
    flexShrink: 0,
  },
  info: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 8px 0",
    color: "#333",
  },
  location: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 12px 0",
  },
  details: {
    fontSize: "14px",
    color: "#666",
    margin: "0",
  },
  price: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#333",
    margin: "0 0 12px 0",
  },
  viewButton: {
    width: "100%",
    padding: "12px 24px",
    backgroundColor: "#E57373",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default ListView;