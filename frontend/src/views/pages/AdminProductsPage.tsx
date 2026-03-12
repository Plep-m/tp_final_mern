/**
 * Admin Products Page
 */

import { useEffect, useState } from 'react';
import { ProductModel, Product } from '../../models/Product';
import { IProduct } from '@ligue-sportive/shared';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductModel.getAll();
        setProducts(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (data: IProduct, id?: string) => {
    try {
      if (id) {
        const result = await ProductModel.update(id, data);
        setProducts(prev => prev.map(p => p._id === id ? result : p));
      } else {
        const result = await ProductModel.create(data);
        setProducts(prev => [...prev, result]);
      }
      setSelectedProduct(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try {
      await ProductModel.delete(id);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">⚙️ Gestion des produits</h1>
      </div>

      {loading && <div className="loading-state">Chargement...</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="admin-layout">
        <div className="admin-list-panel card">
          <ProductList
            products={products}
            onEdit={setSelectedProduct}
            onDelete={handleDelete}
          />
        </div>

        <div className="admin-form-panel card card-body">
          <ProductForm
            product={selectedProduct}
            onSubmit={handleSubmit}
            onCancel={() => setSelectedProduct(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;
