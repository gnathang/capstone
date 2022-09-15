// Fragment is essentially a component that renders to nothing when mounted on the DOM
// We use it because we have a top level 'containing' component to nest other components.
import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation.styles.scss';

const Navigation = () => {
  return (
    // use Fragment instea of a wrapping div
    <Fragment>
      <div className='navigation'>

        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          <Link className='nav-link' to='/sign-in'>
            SIGN IN
          </Link>
        </div>

      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;  