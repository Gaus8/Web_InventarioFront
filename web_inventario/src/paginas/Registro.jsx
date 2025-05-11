import '../assets/styles/styles_forms.css'

function Registro() {
  return (
    <>
      <div className="body">
        <form className="form-container">
          <img className="logo-empresa" src="/img/logo_amg.jpg" alt="logo_aplicacion" />
            <h3>Crear Cuenta</h3>
            <div className="form-container-input">
              <ion-icon name="person-outline" alt="logo-facebook"></ion-icon>
              <input id="name-input" type="text" placeholder="Ingrese su nombre" />
            </div>
            <p id="error-name"></p>
            <div className="form-container-input">
              <ion-icon name="mail-outline"></ion-icon> <input id="email-input" type="email" placeholder="Ingrese su email" />
            </div>
            <p id="error-email"></p>
            <div className="form-container-input">
              <ion-icon name="lock-closed-outline"></ion-icon><input id="password-input" type="password" placeholder="Ingrese una contraseña" />
            </div>
            <p id="error-password"></p>
            <a href="/login">Iniciar Sesión</a>
            <button className="button" id="send-form">Enviar</button>
        </form>
      </div>
    </>
  )
}

export default Registro;

