import { useEffect, useState } from "react";
import { Product, ProductCategory } from "../../models/Product";

interface Props {
  product: Product | null;
  onSubmit: (data: Omit<Product, "_id">, id?: string) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSubmit, onCancel }: Props) => {
  const [form, setForm] = useState<Omit<Product, "_id">>({
    name: "",
    description: "",
    category: ProductCategory.FOOTBALL,
    stock: 0,
    imageUrl: ""
  });

  useEffect(() => {
    if (product) {
      const { _id, ...rest } = product;
      setForm(rest);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, product?._id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{product ? "Modifier un produit" : "Ajouter un produit"}</h3>

      <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <select name="category" value={form.category} onChange={handleChange}>
        {Object.values(ProductCategory).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        required
      />

      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
      />

      <button type="submit">
        {product ? "Modifier" : "Ajouter"}
      </button>

      {product && (
        <button type="button" onClick={onCancel}>
          Annuler
        </button>
      )}
    </form>
  );
};

export default ProductForm;
