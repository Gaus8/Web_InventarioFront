import '../assets/styles/styles_dashboard_admin.css';
import {
  FaHome,
  FaBox,
  FaUsers,
  FaChartLine,
  FaCog,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom"; 

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <MainContent />
      </div>
    </div>
  );
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

/* ========== COMPONENTE HEADER ========== */
function Header() {
  return (
    <div className="header">
      <h1 className="header-title">Panel de Control</h1>
      <div className="header-icons">
        <FaBell className="icon" />
        <FaUserCircle className="icon" />
      </div>
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
