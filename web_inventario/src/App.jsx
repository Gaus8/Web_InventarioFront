import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "./paginas/login"
import Registro from "./paginas/Registro"
import MainPage from "./paginas/MainPage"
function App() {
  const router = createBrowserRouter([
    {path:'/', element:<MainPage />},
    {path:'/login', element:<Login />},
    {path:'/registro', element:<Registro />}
  ])
  return (
    <RouterProvider router={router} />
  )
}
 
export default App