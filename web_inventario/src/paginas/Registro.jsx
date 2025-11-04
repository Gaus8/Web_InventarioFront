import '../assets/styles/styles_forms.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Registro() {
  const navigate = useNavigate();

  // URL del backend
  const urlRender = 'https://web-inventario.onrender.com/api/registro';
  const urlLocal = 'http://localhost:5000/api/registro';

  // Estado para los campos del formulario
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Estado para los mensajes de error
  const [respuestaServer, setRespuestaServer] = useState("");
  const [respuesta2Server, setRespuesta2Server] = useState("");
  const [respuesta3Server, setRespuesta3Server] = useState("");

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpia los mensajes previos
    setRespuestaServer("");
    setRespuesta2Server("");
    setRespuesta3Server("");

    // Validación básica en frontend
    if (!data.name || !data.email || !data.password) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      // 🔹 Cambia entre local o render según el entorno
      const response = await axios.post(urlRender, data, { withCredentials: true });

      if (response.status === 201) {
        localStorage.setItem('userEmail', data.email);
        navigate('/validacion');
      }
    } catch (err) {
      console.error("Error en el registro:", err);

      const errorData = err.response?.data;

      // 🔹 Si el backend envía errores de validación como arreglo
      if (errorData?.error && Array.isArray(errorData.error)) {
        errorData.error.forEach((e) => {
          if (e.message === "error1") {
            setRespuestaServer("El nombre solo puede tener caracteres alfabéticos");
          } else if (e.message === "error2") {
            setRespuesta2Server("El email debe ser válido");
          } else if (e.message === "error3") {
            setRespuesta3Server(
              "La contraseña debe tener al menos 8 caracteres e incluir: una letra mayúscula, una letra minúscula, un número y al menos uno de los siguientes caracteres especiales: .!@#$%^&*"
            );
          }
        });
      } 
      // 🔹 Si el backend envía un solo mensaje (como Render)
      else if (errorData?.message) {
        setRespuesta3Server(errorData.message);
      } 
      // 🔹 Fallback para errores desconocidos
      else {
        setRespuesta3Server('Error desconocido al registrar usuario');
      }
    }
  };

  return (
    <div className="body">
      <form className="form-container" onSubmit={handleSubmit}>
        <img className="logo-empresa" src="/img/logo_siecu.png" alt="logo_aplicacion" />
        <h3>Crear Cuenta</h3>

        {/* Campo nombre */}
        <div className="form-container-input">
          <ion-icon name="person-outline"></ion-icon>
          <input
            id="name-input"
            type="text"
            placeholder="Ingrese su nombre"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <p id="error-name">{respuestaServer}</p>

        {/* Campo email */}
        <div className="form-container-input">
          <ion-icon name="mail-outline"></ion-icon>
          <input
            id="email-input"
            type="email"
            placeholder="Ingrese su email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <p id="error-email">{respuesta2Server}</p>

        {/* Campo contraseña */}
        <div className="form-container-input">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input
            id="password-input"
            type="password"
            placeholder="Ingrese una contraseña"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <p id="error-password">{respuesta3Server}</p>

        <a href="/login">Iniciar Sesión</a>
        <button className="button" type="submit" id="send-form">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Registro;
