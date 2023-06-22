import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Topbar from './components/topbar/Topbar'
import Comprehension from './components/comprehension/Comprehension'


const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <>
        <Topbar/>
        <div>Home</div>
      </>
  },
  {
    path: "/comprehension",
    element: 
      <>
        <Topbar/>
        <Comprehension/>
      </>
  },
  {
    path: "/vocab",
    element: 
      <>
        <Topbar/>
        <div>Vocab</div>
      </>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
