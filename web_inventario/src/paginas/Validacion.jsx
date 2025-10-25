import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/styles_validacion.css';

function Validacion() {
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // capturar token de la URL
  const navigate = useNavigate();
  
  const urlRender = `https://web-inventario.onrender.com/validacion/${token}`;
  const urlServer = `http://localhost:5000/api/validacion/${token}`


  useEffect(() => {
    const verificarCuenta = async () => {
      try {
        const res = await axios.get(urlServer);
        if (res.status === 200) {
          // Mensaje opcional antes de redirigir
          setMensaje(res.data?.mensaje || 'Cuenta verificada correctamente.');
          setTimeout(() => {
            navigate('/login');
          }, 2000); // esperar 2 segundos antes de redirigir
        } else {
          setError('Error al verificar la cuenta.');
        }
      } catch (err) {
        if (err.response?.data) {
          setError(err.response.data.mensaje);
        } else {
          setError('Error del servidor al verificar la cuenta.');
        }
      }
    };

    if (token) {
      verificarCuenta();
    }
  }, [token, navigate]);

  return (
    <div className="body-validacion">
      <form className="form-container-validacion" onSubmit={(e) => e.preventDefault()}>
        <img
          className="logo-empresa-validacion"
          src="/img/logo_siecu.png"
          alt="logo_aplicacion"
        />
        <h3>Verificación de Cuenta</h3>

        {mensaje && <p className="mensaje-ok">{mensaje}</p>}
        <a href="/login">Iniciar Sesion</a>
        {error && <p className="mensaje-error">{error}</p>}
      </form>
    </div>
  );
}

export default Validacion;
