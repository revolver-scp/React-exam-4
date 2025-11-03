import React from 'react'
import Layout from "./pages/layout" 
import Home from "./pages/home"
import About from "./pages/aboutID" 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
        index: true,
        element: <Home/>
        },
        {
          path: "about/:id",
          element: <About/>
        }
      ]
    }
  ])
  return (
    <>
     <RouterProvider router={router}/> 
    </>
  )
}
export default App