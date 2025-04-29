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
    if (!userName || !password) {
      alert("Por favor llena todos los campos");
      return;
    }
    onSave({ user_name: userName, password });
    setUserName("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h3>{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</h3>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ margin: "0.5rem" }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "0.5rem" }}
      />
      <button type="submit" style={{ marginRight: "0.5rem" }}>
        {editingUser ? "Actualizar" : "Crear"}
      </button>
      {editingUser && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default UserForm;
