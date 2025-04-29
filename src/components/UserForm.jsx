import { useState, useEffect } from "react";

function UserForm({ onSave, editingUser, onCancel }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (editingUser) {
      setUserName(editingUser.user_name);
      setPassword(""); // no mostrar contraseña vieja
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName) {
      alert("Nombre de usuario obligatorio");
      return;
    }

    let userData = { user_name: userName };

    if (!editingUser) {
      if (!password) {
        alert("Contraseña obligatoria para crear usuario");
        return;
      }
      userData.password = password;
    } else {
      if (password.trim() !== "") {
        userData.password = password;
      }
    }

    onSave(userData);
    setUserName("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
        autoComplete="current-password"
      />
      <div style={{ marginTop: "1rem" }}>
        <button type="submit" style={styles.buttonPrimary}>
          {editingUser ? "Actualizar" : "Crear"}
        </button>
        {editingUser && (
          <button type="button" onClick={onCancel} style={styles.buttonSecondary}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  input: {
    margin: "0.5rem",
    padding: "0.5rem",
    width: "300px",
  },
  buttonPrimary: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    marginRight: "0.5rem",
    cursor: "pointer",
  },
  buttonSecondary: {
    padding: "0.5rem 1rem",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    cursor: "pointer",
  }
};

export default UserForm;
