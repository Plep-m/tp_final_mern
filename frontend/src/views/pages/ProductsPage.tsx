/**
 * Products Page (Catalog)
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductModel, Product, ProductCategory } from '../../models/Product';
import { CartService } from '../../models/cart';
import { useAuth } from '../../controllers/AuthController';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await ProductModel.getAll(category || undefined);
      setProducts(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    try {
      CartService.addToCart({ productId: product._id, productName: product.name, quantity: 1 });
      setAddedId(product._id);
      setTimeout(() => setAddedId(null), 1500);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to add to cart');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Catalogue produits</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/cart')}>🛒 Panier</button>
          <button onClick={() => navigate('/orders')}>📦 Mes commandes</button>
          {isAdmin() && (
            <button onClick={() => navigate('/admin/products')} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer' }}>
              ⚙️ Admin produits
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div style={{ marginBottom: '20px' }}>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value=''>Toutes les catégories</option>
          {Object.values(ProductCategory).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* States */}
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}

      {/* Product grid */}
      {!loading && !error && (
        products.length === 0 ? (
          <p>Aucun produit trouvé.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {products.map(product => (
              <div
                key={product._id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '16px',
                  background: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                )}
                <strong style={{ fontSize: '16px' }}>{product.name}</strong>
                <span style={{ fontSize: '13px', color: '#666' }}>{product.category}</span>
                {product.description && (
                  <p style={{ fontSize: '13px', color: '#444', margin: 0 }}>{product.description}</p>
                )}
                <span style={{ fontSize: '13px' }}>
                  Stock : <strong>{product.stock}</strong>
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  style={{
                    marginTop: 'auto',
                    padding: '8px',
                    background: addedId === product._id ? '#28a745' : product.stock === 0 ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    transition: 'background 0.2s',
                  }}
                >
                  {addedId === product._id ? '✓ Ajouté !' : product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ProductsPage;
