import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Menu() {
  const DATA = useSelector((state) => state.data);
  const NAMES = Object.keys(DATA);

  return (
    <div className="Menu">
      <Link to="/favourite">
        <h2>Favourite</h2>
        <img src={require(`../img/menu/fav.png`)} alt="img" />
      </Link>
      {NAMES.map((section) => {
        return (
          <Link key={section} state={section} to={`/${section}`}>
            <h2>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
            <img src={require(`../img/menu/${section}.jpg`)} alt="img" />
          </Link>
        );
      })}
      <Outlet />
    </div>
  );
}

export default Menu;
