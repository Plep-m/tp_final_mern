/**
 * Products Page (Catalog)
 */

import { useState, useEffect } from 'react';
import { ProductModel, Product, ProductCategory } from '../../models/Product';
import { CartService } from '../../models/cart';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);

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
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
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
      alert(err instanceof Error ? err.message : 'Erreur panier');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Catalogue produits</h1>
        <div className="filter-row" style={{ margin: 0 }}>
          <select
            className="form-control"
            style={{ width: 'auto' }}
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {Object.values(ProductCategory).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <div className="loading-state">Chargement des produits...</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {!loading && !error && (
        products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <div className="empty-state-text">Aucun produit trouvé</div>
          </div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <div className="product-card" key={product._id}>
                {product.imageUrl && (
                  <img className="product-card-img" src={product.imageUrl} alt={product.name} />
                )}
                <div className="product-card-body">
                  <span className="product-card-category">{product.category}</span>
                  <strong className="product-card-name">{product.name}</strong>
                  {product.description && (
                    <p className="product-card-desc">{product.description}</p>
                  )}
                  <span className="product-card-stock">
                    Stock : <strong>{product.stock}</strong>
                  </span>
                  <button
                    className={`btn btn-sm ${addedId === product._id ? 'btn-success' : product.stock === 0 ? 'btn-ghost' : 'btn-primary'}`}
                    style={{ marginTop: 'auto' }}
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {addedId === product._id ? '✓ Ajouté !' : product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ProductsPage;
