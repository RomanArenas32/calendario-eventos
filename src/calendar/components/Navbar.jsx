import { useAuthStore } from "../../hooks/useAuthStore";

export const Navbar = () => {


  const {user, startLogout} = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        <h4>Uso privado e interno D.D.I.C Azul</h4> 
        {user.name}
      </span>

      <button className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fa fa-sing-out-all"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};
