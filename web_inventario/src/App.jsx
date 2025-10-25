import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "./paginas/Login"
import Registro from "./paginas/Registro"
import MainPage from "./paginas/MainPage"
import Validacion from "./paginas/Validacion"
import ValidacionCorreo from "./paginas/ValidacionCorreo"
import Dashboard from "./paginas/Dashboard"
import UserPage from "./paginas/UserPage"
import Productos from "./paginas/Productos"

function App() {
  const router = createBrowserRouter([
    {path:'/', element:<MainPage />},
    {path:'/login', element:<Login />},
    {path:'/registro', element:<Registro />},
    {path:'/validacion/:token', element:<Validacion />},
    {path:'/validacion', element:<ValidacionCorreo />},
    {path:'/dashboard_admin', element:<Dashboard />},
    {path:'/dashboard_user', element:<UserPage />},
    {path:'/productos', element:<Productos />},

  ])
  return (
    <RouterProvider router={router} />
  )
}
 
export default App