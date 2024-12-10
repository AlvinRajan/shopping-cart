import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import Header from './components/Header/Header.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Description from './components/Description/Description.jsx';
import Body from './components/Body/Body.jsx';
import Shop from './components/Shop/Shop.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <Body /> },
    ],
  },
  {
    path: "shop/:category",
    element: <Header />,
    children: [
      { index: true, element: <Shop /> },
    ],
  },
  {
    path: "/shop",
    element: <Header />,
    children: [
      { index: true, element: <Shop /> },
    ],
  },
  {
    path: "/description",
    element: <Header />,
    children: [ 
      { index: true, element: <Description /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)