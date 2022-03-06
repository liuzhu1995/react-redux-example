import AuthContext from '../contexts/AuthContext';
import { useProvideAuth } from '../useHooks';

/**
 * @description Auth Context Provider 作为全局使用以使后代组件订阅认证信息
 * @param children {Any}
 * @returns {JSX.Element}
 * @constructor
 */
function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export default ProvideAuth;