import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Section() {
  const DATA = useSelector(state => state.data);
  const location = useLocation();
  const menuProps = location.state
  console.log(menuProps)

  return (
    <div className="Section">
      {DATA[menuProps]?.map(item => {
        return (
          <div key={item.brand + item.model}>
            <Link state={item} to={`/${menuProps}/${item.brand}${item.model}`}>
              {`${item.brand.charAt(0).toUpperCase()}${item.brand.slice(1)}
              ${item.model.charAt(0).toUpperCase()}${item.model.slice(1)}`}</Link>
          </div>
        )
      })}
      <Outlet />
    </div>
  );
}

export default Section;