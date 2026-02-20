import { Product } from "../../models/Product";

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

const ProductList = ({ products, onEdit, onDelete }: Props) => (
  <table>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Catégorie</th>
        <th>Stock</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {products.map((p) => (
        <tr key={p._id}>
          <td>{p.name}</td>
          <td>{p.category}</td>
          <td>{p.stock.toString()}</td>
          <td>
            <button onClick={() => onEdit(p)}>Modifier</button>
            <button onClick={() => onDelete(p._id)}>Supprimer</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductList;
