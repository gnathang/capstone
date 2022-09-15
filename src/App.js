
// import Routes and Route components
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';

const Shop = () => {
  return (
    <div>
      I am the shop page
    </div>
  )
}

const App = () => {
  return (
    //  '/' = the end of the path. Then give us a whole rendered {component}
    // index attribute matches the slash as the base component
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element= {<Home/>} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  ); 
};

export default App; 