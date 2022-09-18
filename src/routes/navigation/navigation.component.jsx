// Fragment is essentially a component that renders to nothing when mounted on the DOM
// We use it because we have a top level 'containing' component to nest other components.
import { signOut } from 'firebase/auth';
import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg' ;
import { UserContext } from '../../contexts/user.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

const Navigation = () => {
  // useContext as a hook tells this component 'whenever a value inside of this context updates,
  // re-render me. Because useContext is listening for the currentUser value, which changes when someone signs in.
  // This is because is leverages the useState hook, which calls the setter function that changes the user.
  
  // in the nav comp, we want the currentUser value. In the sign-in, we want to set it;
  // call useContext on UserContext.
  const { currentUser } = useContext(UserContext);
  

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>

          {currentUser ? (
            <span className='nav-link' onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;