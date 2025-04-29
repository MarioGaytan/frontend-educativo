import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./views/Users";
import Topics from "./views/Topics"; // <<--- Importa Topics

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/topics" element={<Topics />} /> {/* Ruta nueva */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
