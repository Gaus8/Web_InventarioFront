import '../assets/styles/styles_dashboard_admin.css';
import {
  FaHome,
  FaBox,
  FaUsers,
  FaChartLine,
  FaCog,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaCogs,
  FaShieldAlt
} from "react-icons/fa";
import { data, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const urlRender = 'https://web-inventario.onrender.com/api/verify-token';
  const urlServer = 'http://localhost:5000/api/verify-token'
  async function getToken() {
    try {
      const res = await axios.get(urlRender, {
        withCredentials: true,
      });
      
      // ✅ Verificar si la respuesta indica que el token es válido
      if (res.data.valid) {
        return res.data;
      } else {
        console.warn("Token inválido:", res.data.message);
        return null;
      }
      
    } catch (error) {
      // ✅ Manejar diferentes tipos de errores
      if (error.response) {
        // El servidor respondió con un código de error
        console.error("Error del servidor:", error.response.data.message);
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        console.error("Sin respuesta del servidor");
      } else {
        // Algo pasó en la configuración de la petición
        console.error("Error:", error.message);
      }
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getToken();
      
      if (data && data.valid) {
        setUserData(data.user);
        console.log("Usuario autenticado:", data.user);
      } else {
        console.warn("No autenticado");
      }
      setLoading(false);
    }
    
    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando información del usuario...</div>;
  }
  else if(!userData){
    
    return <div>Asegurese de Iniciar Sesión.</div>;
  }
  else{


  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header user={userData} setUserData={setUserData} />
        <MainContent />
      </div>
    </div>
  );
}
}
/* ========== COMPONENTE SIDEBAR ========== */
function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="logo">ShopAdmin</h2>
      <ul className="menu">
        <li className={location.pathname === "/dashboard_admin" ? "active" : ""}>
          <Link to="/dashboard_admin" className="link"><FaHome /> Dashboard</Link>
        </li>

        <li className={location.pathname === "/productos" ? "active" : ""}>
          <Link to="/productos" className="link"><FaBox /> Productos</Link>
        </li>

        <li className={location.pathname === "/usuarios" ? "active" : ""}>
          <Link to="/usuarios" className="link"><FaUsers /> Usuarios</Link>
        </li>

        <li className={location.pathname === "/ventas" ? "active" : ""}>
          <Link to="/ventas" className="link"><FaChartLine /> Ventas</Link>
        </li>

        <li className={location.pathname === "/configuracion" ? "active" : ""}>
          <Link to="/configuracion" className="link"><FaCog /> Configuración</Link>
        </li>
      </ul>
    </div>
  );
}

/* ========== HEADER ========== */
function Header({user, setUserData}) {
  const navigate = useNavigate()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notifications] = useState(3);

  const handleLogoutClick = () => {
    setShowProfileDropdown(false);
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
      try {
       await axios.post('https://web-inventario.onrender.com/api/logout', {}, {
        withCredentials: true,
      });
      // Limpiar estado local
      setUserData(null);
      
      // Redirigir al login
      navigate('/login')
      
    } catch (error) {
      console.error('Error en logout:', error);
      navigate('/login')
    }

    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handleProfileClick = () => {
    console.log('Ir a perfil...');
    setShowProfileDropdown(false);
  };

  const handleSettingsClick = () => {
    console.log('Ir a configuraciones...');
    setShowProfileDropdown(false);
  };

  return (
    <div className="header">
      <h1 className="header-title">Gestión de Productos</h1>
      <div className="header-icons">
        {/* Notificaciones */}
        <div className="header-notifications">
          <FaBell className="icon" />
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </div>

        {/* Perfil con Dropdown */}
        <div className="header-profile">
          <FaUserCircle
            className="icon"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            style={{ cursor: 'pointer' }}
          />

          {showProfileDropdown && (
            <div className="profile-dropdown">
              {/* Información del usuario */}
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid #e5e7eb',
                background: '#f9fafb'
              }}>
                <div style={{ fontWeight: '500', color: '#374151' }}>
                  {user.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginTop: '2px'
                }}>
                    {user.email}
                </div>
              </div>

              {/* Opciones del dropdown */}
              <button className="dropdown-item" onClick={handleProfileClick}>
                <FaUser size={14} />
                Mi Perfil
              </button>

              <button className="dropdown-item" onClick={handleSettingsClick}>
                <FaCogs size={14} />
                Configuración
              </button>

              <button className="dropdown-item">
                <FaShieldAlt size={14} />
                Privacidad
              </button>

              <div className="dropdown-divider"></div>

              <button className="dropdown-item logout" onClick={handleLogoutClick}>
                <FaSignOutAlt size={14} />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay para cerrar el dropdown al hacer click fuera */}
      {showProfileDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowProfileDropdown(false)}
        />
      )}

      {/* Modal de Logout */}
      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <FaSignOutAlt className="logout-icon" />
            <h2 className="logout-title">Cerrar Sesión</h2>
            <p className="logout-message">
              ¿Estás seguro de que quieres cerrar sesión?<br />
              Serás redirigido a la página principal.
            </p>
            <div className="logout-actions">
              <button
                className="btn-logout-cancel"
                onClick={handleLogoutCancel}
              >
                Cancelar
              </button>
              <button
                className="btn-logout-confirm"
                onClick={handleLogoutConfirm}
              >
                Sí, Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
/* ========== CONTENIDO PRINCIPAL ========== */
function MainContent() {
  return (
    <div className="dashboard-content">
      <div className="cards">
        <Card title="Ventas Totales" value="$25,400" />
        <Card title="Usuarios Activos" value="1,245" />
        <Card title="Productos" value="312" />
        <Card title="Pedidos Pendientes" value="48" />
      </div>
    </div>
  );
}

/* ========== COMPONENTE CARD ========== */
function Card({ title, value }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}