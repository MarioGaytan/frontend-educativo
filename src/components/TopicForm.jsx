import { useState, useEffect } from "react";

function TopicForm({ onSave, editingTopic, onCancel }) {
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (editingTopic) {
      setTopicName(editingTopic.topic_name);
      setDescription(editingTopic.description);
      setCategoryId(editingTopic.category_id);
    }
  }, [editingTopic]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topicName || !description) {
      alert("Llena todos los campos");
      return;
    }
    onSave({ topic_name: topicName, description});
    setTopicName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h3>{editingTopic ? "Editar Tema" : "Nuevo Tema"}</h3>
      <input
        type="text"
        placeholder="Nombre del tema"
        value={topicName}
        onChange={(e) => setTopicName(e.target.value)}
        style={{ margin: "0.5rem" }}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ margin: "0.5rem" }}
      />
      
      <button type="submit" style={{ marginRight: "0.5rem" }}>
        {editingTopic ? "Actualizar" : "Crear"}
      </button>
      {editingTopic && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default TopicForm;
