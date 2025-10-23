import { FaShoppingCart, FaSearch, FaUserCircle } from "react-icons/fa";
import '../assets/styles/styles_dashboard_user.css';

export default function UserPage() {
  return (
    <div className="userpage">
      <Header />
      <ProductList />
    </div>
  );
}

/* ========== COMPONENTE HEADER ========== */
function Header() {
  return (
    <header className="user-header">
      <h1 className="logo">ShopOnline</h1>
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Buscar productos..." />
      </div>
      <div className="header-icons">
        <FaShoppingCart className="icon" />
        <FaUserCircle className="icon" />
      </div>
    </header>
  );
}

/* ========== LISTA DE PRODUCTOS ========== */
function ProductList() {
  const products = [
    {
      id: 1,
      name: "Camiseta básica",
      price: 45_000,
      image: "https://via.placeholder.com/200x150?text=Camiseta",
    },
    {
      id: 2,
      name: "Jeans clásico",
      price: 89_000,
      image: "https://via.placeholder.com/200x150?text=Jeans",
    },
    {
      id: 3,
      name: "Tenis deportivos",
      price: 150_000,
      image: "https://via.placeholder.com/200x150?text=Tenis",
    },
    {
      id: 4,
      name: "Reloj elegante",
      price: 199_000,
      image: "https://via.placeholder.com/200x150?text=Reloj",
    },
  ];

  return (
    <main className="product-list">
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </main>
  );
}

/* ========== TARJETA DE PRODUCTO ========== */
function ProductCard({ name, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>${price.toLocaleString("es-CO")}</p>
      <button>Agregar al carrito</button>
    </div>
  );
}
