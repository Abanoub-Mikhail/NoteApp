import logo from './logo.svg';
import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import LayOut from './Component/LayOut/LayOut';
import Home from './Component/Home/Home';
import Register from './Component/Register/Register';
import Signin from './Component/Signin/Signin';
import Start from './Component/Start/Start';
import NotFound from './Component/NotFound/NotFound';
import { useContext, useEffect } from 'react';
import { userContext } from './Context/UserContext';
import ProtectedRoutes from './Component/ProtectedRoutes/ProtectedRoutes';
import ProtectedAuth from './Component/ProtectedAuth/ProtectedAuth';

function App() {

  let {setToken}=useContext(userContext)

  const routes = createHashRouter([
    {path:'/', element:<LayOut/>, children: [
      {path:'/home' , element: <ProtectedRoutes> <Home/></ProtectedRoutes>},
      {path:'/register' , element: <ProtectedAuth><Register/></ProtectedAuth> },
      {path:'/signin' , element: <ProtectedAuth><Signin/></ProtectedAuth> },
      {index:true , element: <ProtectedAuth> <Start/></ProtectedAuth>},
      {path:'*' , element:<NotFound/>},
    ]}
  ]);



  useEffect(()=>{
    if (localStorage.getItem("noteToken") != null) {
      setToken(localStorage.getItem("noteToken"))
    }
  },[])

  return <RouterProvider router={routes}></RouterProvider> ;
}

export default App;
