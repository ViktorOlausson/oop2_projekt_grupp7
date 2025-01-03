import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./Store/store.js"
import Protected from "./components/Protected.jsx"
import './index.css'
import App from './App.jsx'
import Home from "./pages/Home.jsx"
import ErrorPage from './pages/ErrorPage.jsx'
import Login from './pages/Login.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement: <ErrorPage/>,
    children:[
      {path:"/", element: <Home/>},
      {path:"/login", element: <Protected authentication={false}>
      <Login/>
    </Protected>},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
