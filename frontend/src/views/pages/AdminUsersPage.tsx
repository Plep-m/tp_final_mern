/**
 * Admin Users Page
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../controllers/AuthController';
import { ApiService } from '../../models/api';
import type { IUserResponse, UserRole } from '@ligue-sportive/shared';

interface EditingUser {
  _id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

const AdminUsersPage = () => {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const [users, setUsers] = useState<IUserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<EditingUser | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin()) {
      // Will be redirected by ProtectedRoute component
      return;
    }

    if (authLoading) return;

    fetchUsers();
  }, [authLoading, isAdmin]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await ApiService.getUsers();
      setUsers(response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (user: IUserResponse) => {
    setEditingId(user._id);
    setEditingData({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingData) return;

    try {
      setError('');
      await ApiService.updateUser(editingData._id, {
        firstName: editingData.firstName,
        lastName: editingData.lastName,
        role: editingData.role,
      });

      // Update local state - explicitly cast editingData to IUserResponse
      setUsers(
        users.map((u) =>
          u._id === editingData._id
            ? { ...u, ...editingData } as IUserResponse
            : u
        )
      );

      setEditingId(null);
      setEditingData(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      setError('');
      await ApiService.deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
      setDeleteConfirm(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  if (authLoading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin - User Management</h1>

      {error && (
        <div
          style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '4px',
          }}
        >
          {error}
        </div>
      )}

      {isLoading && <div>Loading users...</div>}

      {!isLoading && users.length === 0 && <div>No users found</div>}

      {!isLoading && users.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>
                Email
              </th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>
                First Name
              </th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>
                Last Name
              </th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>
                Role
              </th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ backgroundColor: editingId === user._id ? '#fffacd' : 'white' }}>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{user.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  {editingId === user._id ? (
                    <input
                      type="text"
                      value={editingData?.firstName || ''}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData!,
                          firstName: e.target.value,
                        })
                      }
                      style={{ width: '100%', padding: '4px' }}
                    />
                  ) : (
                    user.firstName
                  )}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  {editingId === user._id ? (
                    <input
                      type="text"
                      value={editingData?.lastName || ''}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData!,
                          lastName: e.target.value,
                        })
                      }
                      style={{ width: '100%', padding: '4px' }}
                    />
                  ) : (
                    user.lastName
                  )}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  {editingId === user._id ? (
                    <select
                      value={editingData?.role || 'MEMBER'}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData!,
                          role: e.target.value as UserRole,
                        })
                      }
                      style={{ width: '100%', padding: '4px' }}
                    >
                      <option value="MEMBER">MEMBER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  {editingId === user._id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        style={{
                          marginRight: '10px',
                          padding: '6px 12px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#6c757d',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        style={{
                          marginRight: '10px',
                          padding: '6px 12px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                      >
                        Edit
                      </button>
                      {deleteConfirm === user._id ? (
                        <>
                          <button
                            onClick={() => handleDelete(user._id)}
                            style={{
                              marginRight: '10px',
                              padding: '6px 12px',
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              cursor: 'pointer',
                              borderRadius: '4px',
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#6c757d',
                              color: 'white',
                              border: 'none',
                              cursor: 'pointer',
                              borderRadius: '4px',
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(user._id)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '4px',
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsersPage;
