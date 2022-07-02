import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Section() {
  const DATA = useSelector(state => state.data);
  const location = window.location.pathname.slice(1);

  return (
    <div className="Section">
      <h1>{location.charAt(0).toUpperCase() + location.slice(1)}</h1>
      {DATA[location]?.map(item => {
        return (
          <div key={item.brand + item.model}>
            <div>{`${item.brand} ${item.model}`}</div>
            <Link key={item} to={`/${location}/${item.brand}${item.model}`}>{item.brand.charAt(0).toUpperCase() + item.brand.slice(1)}</Link>
          </div>
        )
      })}
    </div>
  );
}

export default Section;