import { Route } from "react-router-dom";
import React from "react";
import PrivateRoute from "./PrivateRoute";

/**
 * @description 根据参数routes动态渲染Route组件
 * @param routes {Array | Object}
 * @param routes.path {string}
 * @returns {JSX.Element|*}
 */
function RouteWithSubRoutes(routes) {
  if (Array.isArray(routes)) {
    return routes.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        render={() => (
          <route.component>
            {/* 将Route作为Children在父组件中渲染 */}
            {
              route.routes.map(item => <RouteWithSubRoutes key={item.path} {...item} />)
            }
          </route.component>
        )}
      />
    ))
  }
  return (
    <PrivateRoute path={routes.path}>
      <routes.component/>
    </PrivateRoute>
  );
}

export default RouteWithSubRoutes;