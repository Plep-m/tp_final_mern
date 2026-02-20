/**
 * ProductList Component
 */

import { Product } from '../../models/Product';

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

const ProductList = ({ products, onEdit, onDelete }: Props) => (
  products.length === 0 ? (
    <div className="empty-state">
      <div className="empty-state-icon">📦</div>
      <div className="empty-state-text">Aucun produit</div>
    </div>
  ) : (
    <table className="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Catégorie</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p._id}>
            <td><strong>{p.name}</strong></td>
            <td><span className="badge badge-neutral">{p.category}</span></td>
            <td>{p.stock}</td>
            <td>
              <div className="table-actions">
                <button className="btn btn-primary btn-sm" onClick={() => onEdit(p)}>Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(p._id)}>Supprimer</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
);

export default ProductList;
