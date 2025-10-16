import React from "react";

interface Property {
  id: number | string;
  name: string;
  region: string;
  country: string;
  max_persons: number;
  bedrooms: number;
  bathrooms: number;
  stars:number;
  images?: string[];
  first_availability?: {
    price?: number;
  };
}

interface GridViewProps {
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
  <div style={styles.gridCard}>
    <Skeleton style={{ width: "100%", height: "200px", borderRadius: "12px 12px 0 0" }} />
    <div style={styles.gridCardContent}>
      <Skeleton style={{ width: "80%", height: "20px", marginBottom: "8px" }} />
      <Skeleton style={{ width: "60%", height: "16px", marginBottom: "8px" }} />
      <Skeleton style={{ width: "100%", height: "16px", marginBottom: "12px" }} />
      <Skeleton style={{ width: "50%", height: "24px", marginBottom: "12px" }} />
      <Skeleton style={{ width: "100%", height: "40px", borderRadius: "4px" }} />
    </div>
  </div>
);

const GridView: React.FC<GridViewProps> = ({
  properties,
  isLoading = false,
  skeletonCount = 6,
}) => {
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
      <div style={styles.gridContainer}>
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))
          : properties.map((property) => (
              <div key={property.id} style={styles.gridCard}>
                <div style={styles.imageContainer}>
                  <img
                    src={
                      property.images && property.images.length > 0
                        ? property.images[0]
                        : "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={property.name}
                    style={styles.gridImage}
                  />
                
                </div>
                <div style={styles.gridCardContent}>
                  <div style={styles.stars}>★★★★★</div>
                  <h3 style={styles.gridTitle}>{property.name}</h3>
                  <p style={styles.gridLocation}>
                    {property.region}, {property.country}
                  </p>
                  <p style={styles.gridDetails}>
                    👥 {property.max_persons} Guests · 🛏️ {property.bedrooms} Bedrooms · 🛁{" "}
                    {property.bathrooms} Bathrooms
                  </p>
                  <div style={styles.priceContainer}>
                    <span style={styles.badge2}>{property.stars}/5</span>
                    {/* <span style={styles.reviewText}>(4 reviews)</span> */}
                    <span style={styles.fromText}>From</span>
                    <span style={styles.gridPrice}>
                      EUR{property.first_availability?.price ?? "N/A"}
                    </span>
                    <span style={styles.nightText}>/Night</span>
                  </div>
                  <button style={styles.gridButton}>View Details</button>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
    padding: "20px",
  },
  gridCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "200px",
  },
  gridImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  badge: {
    position: "absolute",
    bottom: "12px",
    right: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "14px",
    color: "#333",
  },
  gridCardContent: {
    padding: "16px",
  },
  stars: {
    color: "#000",
    fontSize: "12px",
    marginBottom: "8px",
    letterSpacing: "1px",
  },
  gridTitle: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 6px 0",
    color: "#333",
  },
  gridLocation: {
    fontSize: "13px",
    color: "#666",
    margin: "0 0 8px 0",
  },
  gridDetails: {
    fontSize: "12px",
    color: "#666",
    margin: "0 0 12px 0",
    lineHeight: "1.4",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "12px",
    flexWrap: "wrap",
  },
  badge2: {
    backgroundColor: "#E91E63",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "600",
  },
  reviewText: {
    fontSize: "11px",
    color: "#666",
  },
  fromText: {
    fontSize: "11px",
    color: "#666",
    marginLeft: "auto",
  },
  gridPrice: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#333",
  },
  nightText: {
    fontSize: "11px",
    color: "#666",
  },
  gridButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#E57373",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default GridView;