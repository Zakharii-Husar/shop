import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Menu() {

  const DATA = useSelector(state => state.data);
  const NAMES = Object.keys(DATA);

  return (
    <div className="Menu">
      <Link to="/favourite">Favourite</Link>
      {NAMES.map(section=>{
        return(<Link key={section} state={section} to={`/${section}`}>{section.charAt(0).toUpperCase() + section.slice(1)}</Link>)
      })}
      <Outlet />
    </div >
  );
}

export default Menu;