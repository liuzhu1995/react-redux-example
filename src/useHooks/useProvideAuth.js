import { useState } from "react";
/**
 * @type {{logout(*=): void, isAuthenticated: boolean, login(*=): void}}
 */
const fakeAuth = {
  isAuthenticated: false,
  login(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  logout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

/**
 * @description 提供用户信息,登录退出方法给Auth Provider
 * @returns {{logout: logout, login: login, user: string}}
 */
function useProvideAuth() {
  const [user, setUser] = useState('jason');

  const login = cb => {
    fakeAuth.login(() => {
      setUser('user');
      cb();
    });
  }
  const logout = cb => {
    fakeAuth.logout(() => {
      setUser(null);
      cb();
    });
  }

  return {
    user,
    login,
    logout,
  }
}
export default useProvideAuth;