import { useState, useEffect } from "react";

function TopicForm({ onSave, editingTopic, onCancel }) {
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTopic) {
      setTopicName(editingTopic.topic_name);
      setDescription(editingTopic.description);
    }
  }, [editingTopic]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!topicName || !description) {
      alert("Todos los campos son obligatorios");
      return;
    }

    onSave({ topic_name: topicName, description });
    setTopicName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>{editingTopic ? "Editar Tema" : "Nuevo Tema"}</h2>
      <input
        type="text"
        placeholder="Nombre del tema"
        value={topicName}
        onChange={(e) => setTopicName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
      />
      <div style={{ marginTop: "1rem" }}>
        <button type="submit" style={styles.buttonPrimary}>
          {editingTopic ? "Actualizar" : "Crear"}
        </button>
        {editingTopic && (
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
    backgroundColor: "#2ecc71",
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

export default TopicForm;
