import '../assets/styles/styles_main_page.css';
import { Link } from "react-router-dom";
import Videos from './Videos';
//ICONOS SECCION
import { MdOutlineComputer } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";
//ICONOS FOOTER
import { IoLocationOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";

function MainPage() {
  return (
    <>
      <div className="body">
        <header>
          <div className="logo-img">
            <img src="/img/logo_amg.jpg" alt="" />
          </div>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="show-menu">&#8801;</label>
          <nav className="navbar">
            <a href="#">Inicio</a>
            <a href="#section-products">Sobre Nosotros</a>
            <a href="#section-icons">Info</a>
            <a href="#">Contacto</a>
            <label htmlFor="check" className="hide-menu">&#215;</label>
          </nav>
        </header>
        <section className="section-info">
          <div className="section-info-text">
            <h1>Aplicativo Moderno <br />de Gestión del Inventario <br /> (AMG)</h1>
            <p>
              Desarrollar una aplicación web destinada a mejorar la gestión de inventario,<br />
              para aumentar la productividad en los pequeños sectores comerciales, <br />
              específicamente en la empresa CDISFRUTA ubicada en la Villa de San Diego de Ubaté.
            </p>
            <Link to={'/registro'}>
              <button className="btn-login" type="submit" >Empezar</button>
            </Link>
          </div>

          <div className="section-info-img">
          </div>
        </section>
        <section id="section-products">
          <div className="section-products-container">
            <div className="image-products">
              <img src="/img/cdisfruta_01.jpg" alt="" />
            </div>
            <div className="products-text">
              <h4>CDISFRUTA EN MELBOURNE</h4>
              <p>¡Nuestro producto de aromaticas ya esta en <br />
                Melbourne, Australia! <br />
                Disfruta de su sabor y frescura<br />
                Elaborado con 100% ingredientes colombianos
                naturales<br /> de alta calidad.
              </p>
            </div>
          </div>
          <div className="section-products-container">
            <div className="image-products">
              <img src="/img/cdisfruta_02.jpg" alt="" />
            </div>
            <div className="products-text">
              <h4>FRUTAS DESHIDRATADAS</h4>
              <p>
                Disfruta de nuestras deliciosas frutas deshidratadas. <br />
                Un snack saludable y practico, perfecto para <br />
                cualquier momento del dia. <br />
                ¡Calidad y frescura en cada bocado!
              </p>
            </div>
          </div>
          <div className="section-products-container">
            <div className="image-products">
              <img src="/img/cdisfruta_03.jpg" alt="" />
            </div>
            <div className="products-text">
              <h4>CDISFRUTA UBATÉ</h4>
              <p>Desde el corazon de Ubaté , Cundinamarca, nuestra empresa <br />
                lleva el auténtico sabor colombiano.<br />
                Listo para acompañarte en cualquier momento.<br />
                ¡Llévate un pedazo de Ubaté a donde vayas!</p>
            </div>
          </div>
          <div className="section-products-container">
            <div className="image-products">
              <img src="/img/cdisfruta_04.jpg" alt="" />
            </div>
            <div className="products-text">
              <h4>BOLSITAS CDISFRUTA</h4>
              <p>
                Cada bolsita es un susurro de frescura, una mezcla <br />
                de hierbas y frutas seleccionadas para <br />
                brindarte un momento de calma y bienestar.<br />
                ¡Un aromatica con a"lma colombiana!
              </p>
            </div>
          </div>
        </section>

        <Videos />
        <section id="section-icons">
          <div className="section-icons-1">
            <h3 className="icon-text">Aplicación Responsive</h3>
            <MdOutlineComputer size={30} />
          </div>
          <div className="section-icons-2">
            <h3 className="icon-text">Procesos</h3>
            <IoIosTimer size={30} />
          </div>
          <div className="section-icons-3">
            <h3 className="icon-text">Modenizacion</h3>
            <AiOutlineGlobal size={30} />
          </div>
          <div className="section-icons-4">
            <h3 className="icon-text">Rendimiento</h3>
            <FaArrowTrendUp size={30} />
          </div>
        </section>

        <footer>
          <div className="footer-info">
            <div>
              <IoLocationOutline size={15} />
              <p>Ubaté, Cundinamarca</p>
            </div>
            <div>
              <BsTelephone size={15} />
              <p>3007108920</p>
            </div>
            <div>
              <MdOutlineMail size={15} />
              <p>cdifruta@gmail.com</p>
            </div>
          </div>
          <div className="footer-social">
            <h3>Acerca de CDISFRUTA</h3>
            <p>Somos una empresa de Ubaté con dos años en el mercado, dedicada <br />
              a la produccion de frutas deshidratas, promoviendo una
              alimentacion saludable.
            </p>
          </div>

        </footer>
    

      </div>
    </>
  )
}

export default MainPage;

