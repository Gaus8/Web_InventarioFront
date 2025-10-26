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

// Configuración 
const CLOUD_NAME = 'dvm6e1hbr'; 
const UPLOAD_PRESET = 'CDISFRUTA'; 
const API_URL = 'http://localhost:5000/api';

export default function Productos() {
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

/* ========== CONTENIDO PRINCIPAL ========== */
function MainContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    descripcion: '',
    categoria: '',
    imagen: ''
  });
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/productos`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('📦 Productos cargados:', data);
        setProducts(data);
        
      } catch (error) {
        console.error('Error cargando productos:', error);
        alert(`Error al cargar productos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({ 
      nombre: '', 
      precio: '', 
      stock: '', 
      descripcion: '', 
      categoria: '', 
      imagen: '' 
    });
    setUploadStatus('');
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      nombre: product.nombre,
      precio: product.precio,
      stock: product.stock,
      descripcion: product.descripcion,
      categoria: product.categoria,
      imagen: product.imagen || ''
    });
    setUploadStatus('');
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await fetch(`${API_URL}/productos/${productId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Error al eliminar producto');
        }
        
        const result = await response.json();
        setProducts(products.filter(product => product._id !== productId));
        alert(result.message);
      } catch (error) {
        alert('Error al eliminar el producto: ' + error.message);
      }
    }
  };

  // Función para subir imagen a Cloudinary
  const uploadImage = async (file) => {
    setUploading(true);
    setUploadStatus('loading');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      const data = await response.json();
      setFormData(prev => ({ ...prev, imagen: data.secure_url }));
      setUploadStatus('success');
      
      setTimeout(() => setUploadStatus(''), 3000);
      
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('error');
      alert('Error al subir la imagen');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es demasiado grande. Máximo 5MB.');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido.');
        return;
      }
      
      await uploadImage(file);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      await handleFileSelect({ target: { files } });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
  };

  const handleSaveProduct = async () => {
    try {
      const productData = {
        nombre: formData.nombre,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        descripcion: formData.descripcion,
        categoria: formData.categoria || 'General',
        imagen: formData.imagen
      };

      if (editingProduct) {
        // Editar producto existente
        const response = await fetch(`${API_URL}/productos/${editingProduct._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
        
        if (!response.ok) {
          throw new Error('Error al actualizar producto');
        }
        
        const result = await response.json();
        setProducts(products.map(product => 
          product._id === editingProduct._id ? result.product : product
        ));
        alert(result.message);
      } else {
        // Agregar nuevo producto
        const response = await fetch(`${API_URL}/registro-productos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
        
        if (!response.ok) {
          throw new Error('Error al crear producto');
        }
        
        const result = await response.json();
        setProducts([...products, result.product]);
        alert(result.message);
      }
      setShowModal(false);
    } catch (error) {
      alert('Error al guardar el producto: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="dashboard-content">
        <div className="products-container">
          <div className="loading">Cargando productos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="products-container">
        <div className="table-header">
          <h2 className="title">Lista de Productos</h2>
          <button className="add-btn" onClick={handleAddProduct}>
            <FaPlus style={{ marginRight: '8px' }} />
            Agregar Producto
          </button>
        </div>

        <div className="products-grid">
          {products.length === 0 ? (
            <div className="no-products">
              No hay productos registrados
            </div>
          ) : (
            products.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  {product.imagen ? (
                    <img 
                      src={product.imagen} 
                      alt={product.nombre}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      background: '#f3f4f6',
                      borderRadius: '6px'
                    }}></div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.nombre}</h3>
                  <div className="product-price">${product.precio}</div>
                  <div className="product-stock">
                    {product.stock} unidades en stock
                  </div>
                  <div className="product-category">
                    Categoría: {product.categoria}
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
                    {product.descripcion}
                  </p>
                  <div className="product-actions">
                    <button 
                      className="btn btn-edit"
                      onClick={() => handleEditProduct(product)}
                    >
                      <FaEdit style={{ marginRight: '6px' }} />
                      Editar
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <FaTrash style={{ marginRight: '6px' }} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
              
              <div className="modal-content">
                {/* Upload de imagen */}
                <div className="form-group">
                  <label>Imagen del Producto</label>
                  <div 
                    className="image-upload"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FaCloudUploadAlt className="upload-icon" />
                    <div className="upload-text">
                      {formData.imagen ? 'Imagen lista para subir' : 'Haz click o arrastra una imagen aquí'}
                    </div>
                    <div className="upload-hint">
                      PNG, JPG, WEBP (Máx. 5MB)
                    </div>
                    
                    {/* Estados del upload */}
                    {uploadStatus === 'loading' && (
                      <div className="upload-loading">
                        📤 Subiendo imagen...
                      </div>
                    )}
                    {uploadStatus === 'success' && (
                      <div className="upload-success">
                        ✅ Imagen subida con éxito
                      </div>
                    )}
                    {uploadStatus === 'error' && (
                      <div className="upload-error">
                        ❌ Error al subir imagen
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </div>

                <div className="form-group">
                  <label>Nombre del Producto *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ingresa el nombre del producto"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Categoría *</label>
                  <input
                    type="text"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    placeholder="Ingresa la categoría del producto"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Precio ($) *</label>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    placeholder="Ingresa el precio"
                    required
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="Ingresa la cantidad en stock"
                    required
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Descripción *</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder="Ingresa una descripción del producto"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  className="btn btn-cancel"
                  onClick={() => setShowModal(false)}
                  disabled={uploading}
                >
                  Cancelar
                </button>
                <button 
                  className="btn btn-save"
                  onClick={handleSaveProduct}
                  disabled={uploading}
                >
                  {editingProduct ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}