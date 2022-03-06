import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

/**
 * @description 在路由匹配时执行的render方法中,判断是否有认证权限,没有则重定向到login页面
 * @param children {Any}
 * @param rest {object}
 * @param from {object} 包含pathname属性,登录成功后重定向回跳转到login之前的页面
 * @returns {JSX.Element}
 * @constructor
 */
function PrivateRoute({ children, ...rest }) {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (auth.user) {
          return (children);
        }
        return <Redirect to={{ pathname: '/login', state: { from : location }}} />
      }}
    />
  )
}

export default PrivateRoute;