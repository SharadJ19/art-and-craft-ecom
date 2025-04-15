import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking "Add to Cart"
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price), // Ensure price is a number
      image_url: product.image_url || product.imageUrl, // Handle both field names
      stock: product.stock
    });
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.image_url || 'https://placehold.co/300x200/000000/FFFFFF.png?text=No+Image'} 
          alt={product.name}
          className="product-image"
        />
      </Link>
      
      <div className="product-info">
        <Link to={`/products/${product.id}`} className="product-name">
          <h3>{product.name}</h3>
        </Link>
        <p className="product-price">${Number(product.price).toFixed(2)}</p>
        
        <button 
          onClick={handleAddToCart}
          className="add-to-cart-btn"
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;