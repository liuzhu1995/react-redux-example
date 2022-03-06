import { useContext } from "react";
import { useHistory } from 'react-router-dom';
import style from './layout.module.scss';
import AuthContext from '../contexts/AuthContext';
import Menu from './Menu';


/**
 * @description 需要认证后进入的操作界面的布局
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function BasicLayout({ children }) {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const onLogout = () => {
    auth.logout(() => {
      history.push('/login');
    })
  }
  return (
    <div className={style.basicWrapper}>
      <div className={style.nav}>
        <Menu/>
      </div>
      <main className={style.container}>
        <header className={style.header}>
          <ul>
            <li>nav-1</li>
            <li>nav-2</li>
          </ul>
          <div className={style.logout} onClick={onLogout}>logout</div>
        </header>
        <div className={style.content}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default BasicLayout;