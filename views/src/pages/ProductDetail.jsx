import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct({
          ...response,
          price: Number(response.price)
        });
      } catch (err) {
        setError(err.message || 'Failed to load product');
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.imageUrl,
      stock: product.stock
    }, quantity);

    alert(`${quantity} ${product.name} added to cart!`);
  };

  if (!product) return <div className="text-center py-8">Loading or product not found...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 bg-gray-50 p-4 rounded-lg">
          <img
            src={product.imageUrl || 'https://placehold.co/300x200/000000/FFFFFF.png?text=No+Image'}
            alt={product.name}
            className="w-full h-auto object-cover rounded"
            onError={(e) => {
              e.target.src = 'https://placehold.co/300x200/000000/FFFFFF.png?text=No+Image';
            }}
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="mb-6">
            Availability:
            <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
              {product.stock > 0 ? ` In Stock (${product.stock} available)` : ' Out of Stock'}
            </span>
          </p>

          {product.stock > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
              >
                Add to Cart ({quantity})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;