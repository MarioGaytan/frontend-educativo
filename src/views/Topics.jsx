import { useEffect, useState } from "react";
import { getTopics, createTopic, updateTopic, deleteTopic } from "../api/topicsApi";
import TopicForm from "../components/TopicForm";
import { useNavigate } from "react-router-dom";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [editingTopic, setEditingTopic] = useState(null);
  const navigate = useNavigate();

  const fetchTopics = async () => {
    try {
      const res = await getTopics();
      setTopics(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al obtener los temas");
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleSave = async (topicData) => {
    try {
      if (editingTopic) {
        await updateTopic(editingTopic._id, topicData);
        alert("Tema actualizado");
      } else {
        await createTopic(topicData);
        alert("Tema creado");
      }
      setEditingTopic(null);
      fetchTopics();
    } catch (err) {
      console.error(err);
      alert("Error al guardar tema");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este tema?")) return;
    try {
      await deleteTopic(id);
      alert("Tema eliminado");
      fetchTopics();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar tema");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Temas</h1>

      <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
        Volver a Usuarios
      </button>

      <TopicForm
        onSave={handleSave}
        editingTopic={editingTopic}
        onCancel={() => setEditingTopic(null)}
      />

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "1rem", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Nombre del Tema</th>
            <th>Descripción</th>
            <th>ID Categoría</th>
            <th>Fecha de creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {topics.length > 0 ? (
            topics.map((topic) => (
              <tr key={topic._id}>
                <td>{topic.topic_name}</td>
                <td>{topic.description}</td>
                <td>{topic.category_id}</td>
                <td>{new Date(topic.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => setEditingTopic(topic)} style={{ marginRight: "0.5rem" }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(topic._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay temas registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Topics;
