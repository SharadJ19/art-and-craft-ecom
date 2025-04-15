import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // Function to fetch products based on search term
  const fetchProducts = async (keyword) => {
    try {
      setLoading(true);
      setError(null);
      // Your interceptor already extracts .data from the response
      const response = await api.get(`/products?keyword=${encodeURIComponent(keyword || '')}`);
      
      if (!Array.isArray(response)) {
        throw new Error('Invalid data format received from server');
      }
      
      setProducts(response);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Update URL when search term changes
  const updateURL = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term.trim()) {
      params.set('search', term.trim());
    } else {
      params.delete('search');
    }
    navigate(`/products?${params.toString()}`, { replace: true });
  };

  // Load products when component mounts or search param changes
  useEffect(() => {
    const searchParam = searchParams.get('search') || '';
    setSearchTerm(searchParam);
    fetchProducts(searchParam);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    updateURL(searchTerm);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="input w-full pr-10"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
      
      {products.length === 0 ? (
        <div className="text-center py-8">
          {searchTerm ? `No products found for "${searchTerm}"` : 'No products available'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                image_url: product.imageUrl || 'https://placehold.co/300x200/000000/FFFFFF.png?text=No+Image'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;