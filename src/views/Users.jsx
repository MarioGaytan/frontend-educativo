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
      <h1 style={{ marginBottom: "1rem" }}>Usuarios Registrados</h1>

      <button onClick={() => navigate("/topics")} style={styles.buttonNav}>
        Ir a Temas
      </button>

      <UserForm
        onSave={handleSave}
        editingUser={editingUser}
        onCancel={() => setEditingUser(null)}
      />

      <table style={styles.table}>
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
                  <button onClick={() => setEditingUser(user)} style={styles.buttonPrimary}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(user._id)} style={styles.buttonDanger}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">No hay usuarios registrados</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  buttonNav: {
    marginBottom: "2rem",
    backgroundColor: "#8e44ad",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    cursor: "pointer",
  },
  buttonPrimary: {
    marginRight: "0.5rem",
    backgroundColor: "#2980b9",
    color: "white",
    padding: "0.3rem 0.6rem",
    border: "none",
    cursor: "pointer",
  },
  buttonDanger: {
    backgroundColor: "#c0392b",
    color: "white",
    padding: "0.3rem 0.6rem",
    border: "none",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  }
};

export default Users;
