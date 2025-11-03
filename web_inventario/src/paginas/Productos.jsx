import '../assets/styles/styles_dashboard_admin.css';
import {
  FaHome,
  FaBox,
  FaUsers,
  FaChartLine,
  FaCog,
  FaBell,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCloudUploadAlt,
  FaSignOutAlt,
  FaUser,
  FaCogs,
  FaShieldAlt
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import MainContent from './RegistroProducto';
const urlRender = 'https://web-inventario.onrender.com/';
const urlServer = 'http://localhost:5000/api'
export default function Productos() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <MainContent API_URL={urlRender}/>
      </div>
    </div>
  );
}

/* ========== SIDEBAR ========== */
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
function Header() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notifications] = useState(3);

  const handleLogoutClick = () => {
    setShowProfileDropdown(false);
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    // Aquí va tu lógica de logout
    console.log('Cerrando sesión...');
    
    // Limpiar datos de sesión (si los tienes)
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    
    // Redirigir a la página principal
    window.location.href = '/'; // Esto recargará la página y llevará al MainPage
    
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
                  Admin User
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#6b7280',
                  marginTop: '2px'
                }}>
                  admin@cdisfruta.com
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

