import '../assets/styles/styles_dashboard.css';
import {
  FaHome,
  FaBox,
  FaUsers,
  FaChartLine,
  FaCog,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";


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
  return (
    <div className="sidebar">
      <h2 className="logo">ShopAdmin</h2>
      <ul className="menu">
        <li><FaHome /> Dashboard</li>
        <li><FaBox /> Productos</li>
        <li><FaUsers /> Usuarios</li>
        <li><FaChartLine /> Ventas</li>
        <li><FaCog /> Configuración</li>
      </ul>
    </div>
  );
}

/* ========== COMPONENTE HEADER ========== */
function Header() {
  return (
    <div className="header">
      <h1>Panel de Control</h1>
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
