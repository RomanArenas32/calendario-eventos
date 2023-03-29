export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; Uso privado Azul
      </span>

      <button className="btn btn-outline-danger">
        <i className="fa fa-sing-out-all"></i>
        <span>Salir</span>
      </button>
    </div>
  );
};
