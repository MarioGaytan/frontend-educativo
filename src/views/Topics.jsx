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
      alert("Error al obtener temas");
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
      <h1 style={{ marginBottom: "1rem" }}>Temas</h1>

      <button onClick={() => navigate("/")} style={styles.buttonNav}>
        Volver a Usuarios
      </button>

      <TopicForm
        onSave={handleSave}
        editingTopic={editingTopic}
        onCancel={() => setEditingTopic(null)}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Nombre del Tema</th>
            <th>Descripción</th>
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
                <td>{new Date(topic.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => setEditingTopic(topic)} style={styles.buttonPrimary}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(topic._id)} style={styles.buttonDanger}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">No hay temas registrados</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  buttonNav: {
    marginBottom: "2rem",
    backgroundColor: "#27ae60",
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

export default Topics;
