/**
 * Admin Products Page
 */

import { useEffect, useState } from "react";
import { ProductModel } from "../../models/Product";
import { IProduct } from '@ligue-sportive/shared';
import { Product } from "../../models/Product";

import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Chargement initial
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductModel.getAll();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Ajout ou modification
  const handleSubmit = async (data: IProduct, id?: string) => {
    try {
      let result: Product;
      if (id) {
        result = await ProductModel.update(id, data);
        setProducts((prev) =>
          prev.map((p) => ((p as any)._id === id ? result : p))
        );
      } else {
        result = await ProductModel.create(data);
        setProducts((prev) => [...prev, result]);
      }
      setSelectedProduct(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'enregistrement");
    }
  };

  // Suppression
  const handleDelete = async (id: string) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      await ProductModel.delete(id);
      setProducts((prev) => prev.filter((p) => (p as any)._id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de la suppression");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Administration des produits</h2>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
        <ProductList
          products={products}
          onEdit={setSelectedProduct}
          onDelete={handleDelete}
        />

        <ProductForm
          product={selectedProduct}
          onSubmit={handleSubmit}
          onCancel={() => setSelectedProduct(null)}
        />
      </div>
    </div>
  );
};

export default AdminProductsPage;
