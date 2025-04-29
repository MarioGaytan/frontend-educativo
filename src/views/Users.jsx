import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/usersApi";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al obtener usuarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (userData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser._id, userData);
        alert("Usuario actualizado");
      } else {
        await createUser(userData);
        alert("Usuario creado");
      }
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Error al guardar usuario");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      await deleteUser(id);
      alert("Usuario eliminado");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar usuario");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Usuarios Registrados</h1>

      <button onClick={() => navigate("/topics")} style={{ marginBottom: "1rem" }}>
        Ir a Temas
      </button>

      <UserForm
        onSave={handleSave}
        editingUser={editingUser}
        onCancel={() => setEditingUser(null)}
      />

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "1rem", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Nombre de usuario</th>
            <th>Rol ID</th>
            <th>Fecha de creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.user_name}</td>
                <td>{user.role_id}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => setEditingUser(user)} style={{ marginRight: "0.5rem" }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(user._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay usuarios registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
