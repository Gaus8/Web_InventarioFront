import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "./paginas/Login"
import Registro from "./paginas/Registro"
import MainPage from "./paginas/MainPage"
import Validacion from "./paginas/Validacion"
import ValidacionCorreo from "./paginas/ValidacionCorreo"
import Dashboard from "./paginas/dashboard"
function App() {
  const router = createBrowserRouter([
    {path:'/', element:<MainPage />},
    {path:'/login', element:<Login />},
    {path:'/registro', element:<Registro />},
    {path:'/validacion/:token', element:<Validacion />},
    {path:'/validacion', element:<ValidacionCorreo />},
    {path:'/dashboard', element:<Dashboard />},
  ])
  return (
    <RouterProvider router={router} />
  )
}
 
export default App