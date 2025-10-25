import '../assets/styles/styles_validacion.css';

function ValidacionCorreo() {
  const correo = localStorage.getItem('userEmail') || 'tu correo';

  return (
    <div className="body-validacion">
      <form className="form-container-validacion" onSubmit={(e) => e.preventDefault()}>
        <img
          className="logo-empresa-validacion"
          src="/img/logo_siecu.png"
          alt="logo_aplicacion"
        />
        <h3>Verificación pendiente</h3>
        <p className="mensaje-ok">
          Revisa tu correo electrónico <strong>{correo}</strong> para activar tu cuenta.
        </p>
      </form>
    </div>
  );
}

export default ValidacionCorreo;