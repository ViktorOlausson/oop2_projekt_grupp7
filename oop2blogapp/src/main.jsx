import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Home from "./pages/Home.jsx"
import ErrorPage from './pages/ErrorPage.jsx'
import Login from './pages/Login.jsx'
import CreatePost from './pages/CreatePost.jsx'
import ReadPost from './pages/ReadPost.jsx'
import UpdatePost from './pages/UpdatePost.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement: <ErrorPage/>,
    children:[
      {path:"/", element: <Home/>},
      {path:"/login", element: <Login/>},
      { path: "/createpost", element: <CreatePost/>},
      {path: "/readmore", element: <ReadPost/>},
      {path: "/updatepost", element: <UpdatePost/>}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
