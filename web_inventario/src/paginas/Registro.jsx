import '../assets/styles/styles_forms.css';
import { useState } from 'react';


function Registro() {

  const [data, setData] = useState({
    name: "",
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
    if (!data.name || !data.email || !data.password) {
      alert('Todos los campos son obligatorios');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/registro', { // cambia URL según tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log('Respuesta del servidor:', result);
      // Puedes redirigir o mostrar un mensaje aquí
    } catch (err) {
      console.error('Error al enviar formulario:', err);
    }
  };



  return (
    <>
      <div className="body">
        <form className="form-container" onSubmit={handleSubmit}>
          <img className="logo-empresa" src="/img/logo_amg.jpg" alt="logo_aplicacion" />
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
          <p id="error-name"></p>
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
            <input
              id="password-input"
              type="password"
              placeholder="Ingrese una contraseña"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <p id="error-password"></p>
          <a href="/login">Iniciar Sesión</a>
          <button className="button" type="submit" id="send-form" >Enviar</button>
        </form>
      </div>
    </>
  )
}

export default Registro;

