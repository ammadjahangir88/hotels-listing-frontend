import React from "react";

interface Property {
  id: number | string;
  name: string;
  region: string;
  country: string;
  max_persons: number;
  bedrooms: number;
  bathrooms: number;
  images?: string[];
  first_availability?: {
    price?: number;
  };
}

interface ListViewProps {
  properties: Property[];
  styles: Record<string, React.CSSProperties>;
}

const ListView: React.FC<ListViewProps> = ({ properties, styles }) => {
  return (
    <div style={styles.listContainer}>
      {properties.map((property) => (
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
                {property.bedrooms} &nbsp;|&nbsp; 🛁 Bathrooms:{" "}
                {property.bathrooms}
              </p>
            </div>

            <div>
              <p style={styles.price}>
                €{property.first_availability?.price ?? "N/A"} / night
              </p>
              <button style={styles.viewButton}>View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListView;
