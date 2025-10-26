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
  FaImage,
  FaCloudUploadAlt
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";

// Configuración de Cloudinary 
const CLOUD_NAME = 'dvm6e1hbr'; 
const UPLOAD_PRESET = 'CDISFRUTA'; 

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
  return (
    <div className="header">
      <h1 className="header-title">Gestión de Productos</h1>
      <div className="header-icons">
        <FaBell className="icon" />
        <FaUserCircle className="icon" />
      </div>
    </div>
  );
}

/* ========== CONTENIDO PRINCIPAL ========== */
function MainContent() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop Gaming",
      price: 1200,
      stock: 15,
      description: "Laptop para gaming de alta gama",
      image: "https://res.cloudinary.com/demo/image/upload/v1626299476/sample.jpg"
    },
    {
      id: 2,
      name: "Smartphone Pro",
      price: 800,
      stock: 25,
      description: "Teléfono inteligente con cámara profesional",
      image: "https://res.cloudinary.com/demo/image/upload/v1626299477/sample2.jpg"
    },
    {
      id: 3,
      name: "Tablet Android",
      price: 350,
      stock: 8,
      description: "Tablet perfecta para trabajo y entretenimiento",
      image: ""
    },
    {
      id: 4,
      name: "Auriculares Bluetooth",
      price: 150,
      stock: 30,
      description: "Auriculares inalámbricos con cancelación de ruido",
      image: ""
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', stock: '', description: '', image: '' });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image || ''
    });
    setShowModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  // Función para subir imagen a Cloudinary
  const uploadImage = async (file) => {
    setUploading(true);
    
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
      setFormData(prev => ({ ...prev, image: data.secure_url }));
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
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

  const handleSaveProduct = () => {
    if (editingProduct) {
      // Editar producto existente
      setProducts(products.map(product => 
        product.id === editingProduct.id 
          ? { 
              ...editingProduct, 
              ...formData, 
              price: Number(formData.price), 
              stock: Number(formData.stock),
              image: formData.image
            }
          : product
      ));
    } else {
      // Agregar nuevo producto
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock),
        description: formData.description,
        image: formData.image
      };
      setProducts([...products, newProduct]);
    }
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="preview-image"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <FaImage size={32} />
                )}
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-price">${product.price}</div>
                <div className="product-stock">
                  {product.stock} unidades en stock
                </div>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
                  {product.description}
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
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FaTrash style={{ marginRight: '6px' }} />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
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
              {formData.image ? 'Imagen seleccionada' : 'Haz click o arrastra una imagen aquí'}
            </div>
            <div className="upload-hint">
              PNG, JPG, WEBP (Máx. 5MB)
            </div>
            
            {uploading && (
              <div className="upload-loading">Subiendo imagen...</div>
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
          <label>Nombre del Producto</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ingresa el nombre del producto"
          />
        </div>
        <div className="form-group">
          <label>Precio ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Ingresa el precio"
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Ingresa la cantidad en stock"
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Ingresa una descripción del producto"
          />
        </div>
      </div>

      <div className="form-actions">
        <button 
          className="btn btn-cancel"
          onClick={() => setShowModal(false)}
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