import '../assets/styles/styles_forms.css'
import axios from 'axios';
import { useState } from 'react';

function Login() {

const [respuestaServer, setRespuestaServer] = useState("");

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!data.email || !data.password) {
    alert('Todos los campos son obligatorios');
    return;
  }

  try {
    const res = await axios.post('http://localhost:5000/login', data);
    
    // 👇 CORRECTA COMPARACIÓN
    if (res.status === 200) {
      alert("Usuario Loggeado");
      window.location.href = "/login";
    } 
  } catch (err) {
    const errorData = err.response?.data;
     if (errorData?.status === 'error') {
      setRespuestaServer(errorData.message);
    }
   
  }
};

  return (
    <>
      <div className="body">
        <form className="form-container" onSubmit={handleSubmit}>
          <img className="logo-empresa" src="/img/logo_amg.jpg" alt="logo_aplicacion" />
          <h3>Inicio de Sesión</h3>
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
          <p id="error-email"></p>
          <div className="form-container-input">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input id="password-input" 
              type="password" 
              placeholder="Ingrese una contraseña"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <p id="error-password">{respuestaServer}</p>
          <a href="/registro">Registrarse</a>
          <button className="button" id="send-form">Enviar</button>
        </form>
      </div>
    </>
  )
}

export default Login;

