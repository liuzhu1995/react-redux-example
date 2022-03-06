import { Link } from "react-router-dom";
import routeList from '../router/index';


/**
 * @description 左边栏菜单
 * @returns {JSX.Element}
 * @constructor
 */
function Menu() {
  return (
    <ul>
      {
        routeList.map(routeParent => (
            <li key={routeParent.path}>
              <div>{routeParent.name}</div>
              <ul>
                {
                  routeParent.routes.map(routeChildren => <li key={routeChildren.path}>
                    <Link to={routeChildren.path}>{routeChildren.name}</Link>
                  </li>)
                }
              </ul>
            </li>
          ))
      }
    </ul>
  )
}

export default Menu;