import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router'
import './index.css'
import Root from "./Root"
import Home from "./Components/Home/Home"
import About from "./Components/About/About"
import Project from "./Components/Project/Project"
import Service from "./Components/Service/Service"








const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='' element={<Home />} />
      <Route path='About' element={<About />} />
      <Route path='Project' element={<Project />} />
      <Route path='Service'  element={<Service/>}/>
      
    
      
    </Route>
  ))
  

  createRoot(document.getElementById('root')).render(
    <StrictMode>
  
       <RouterProvider router={router}/>
  
    </StrictMode>,
  )