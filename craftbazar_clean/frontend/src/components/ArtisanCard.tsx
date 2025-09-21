import React from "react";

interface Product {
  name: string;
  price?: number;
  description?: string;
  image?: string;
  ecoFriendly?: boolean;
  fragile?: boolean;
}

interface Artisan {
  _id: string;
  name: string;
  craft: string;
  location?: string;
  bio?: string;
  products?: Product[];
}

const ArtisanCard: React.FC<{ artisan: Artisan }> = ({ artisan }) => {
  const product = artisan.products?.[0];
  return (
    <div className="artisan-card">
      <img
        src={product?.image || "/placeholder.png"}
        alt={`${artisan.name}${product?.name ? " - " + product.name : ""}`}
        className="artisan-image"
      />
      <h3>{artisan.name}</h3>
      <p className="craft">{artisan.craft}</p>
      {artisan.location && <p className="location">{artisan.location}</p>}
      {product && (
        <>
          <p className="product-name">
            {product.name}
            {product.price !== undefined ? ` • ₹${product.price}` : ""}
          </p>
          <p className="story">{product.description}</p>
        </>
      )}
      {artisan.bio && <p className="bio">{artisan.bio}</p>}
    </div>
  );
};

export default ArtisanCard;
