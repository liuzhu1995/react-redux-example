import { useHistory, useLocation} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  console.log(location, 'location');
  const { from } = location.state || { from : { pathname: '/' }};
  const onLogin = () => {
    auth.login(() => {
      history.replace(from);
    });
  }
  return (
    <div>
      <p>Login</p>
      <button type="button" onClick={onLogin}>Login</button>
    </div>
  )
}

export default LoginPage;