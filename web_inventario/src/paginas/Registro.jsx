import '../assets/styles/styles_forms.css';
import { useState } from 'react';
import axios from 'axios'
function Registro() {

  const urlRender = 'https://web-inventario.onrender.com/registro';
  const urlServer = 'http://localhost:5000/api/registro'

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [respuestaServer, setRespuestaServer] = useState("");
  const [respuesta2Server, setRespuesta2Server] = useState("");
  const [respuesta3Server, setRespuesta3Server] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    setRespuestaServer("");
    setRespuesta2Server("");
    setRespuesta3Server("");
    e.preventDefault();
    if (!data.name || !data.email || !data.password) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      //Cambiar a urlRender para el deploy
      const response = await axios.post(urlRender, data);

      if (response.status === 201) {
        localStorage.setItem('userEmail', data.email);
        window.location.href = "/validacion";
      }
    } catch (err) {
      const errorData = err.response?.data;

      if (errorData?.status === 'error') {
        if (Array.isArray(errorData.error)) {
          errorData.error.forEach(err => {
            if (err.message === "error1") {
              setRespuestaServer("El nombre solo puede tener caracteres alfabéticos")
            }
            else if (err.message === "error2") {
              setRespuesta2Server("El email debe ser válido")
            }
            else if (err.message === "error3") {
              setRespuesta3Server(
                "La contraseña debe tener al menos 8 caracteres e incluir: una letra mayúscula, una letra minúscula, un número y al menos uno de los siguientes caracteres especiales:.!@#$%^&*"
              );
            }
          });
        } else {
          setRespuesta3Server(errorData.message || 'Error desconocido');
        }
      } else {
        console.error('Error al enviar formulario:', err.message);
      }
    }
  };


  return (
    <>
      <div className="body">
        <form className="form-container" onSubmit={handleSubmit}>
          <img className="logo-empresa" src="/img/logo_siecu.png" alt="logo_aplicacion" />
          <h3>Crear Cuenta</h3>
          <div className="form-container-input">
            <ion-icon name="person-outline" alt="logo-facebook"></ion-icon>
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
          <button className="button" type="submit" id="send-form" >Enviar</button>
        </form>
      </div>
    </>
  )
}

export default Registro;

