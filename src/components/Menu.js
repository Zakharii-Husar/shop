import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Menu() {

  const DATA = useSelector(state => state.data);
  const names = Object.keys(DATA);

  return (
    <div className="Menu">
      {names.map(name=>{
        return(<Link key={name} to={`/${name}`}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>)
      })}
      <Outlet />
    </div >
  );
}

export default Menu;