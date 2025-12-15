import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './layouts/MainLayout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuthContextProvider from './contexts/AuthContextProvider';
import { Toaster } from 'react-hot-toast';
import LogoutPage from './pages/LogoutPage';
import CreateDonationRequest from './pages/dashboard/CreateDonationRequest';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import MyDonationRequests from './pages/dashboard/MyDonationRequests';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <IndexPage></IndexPage>
      },
      {
        loader: async () => {
          try {
            let data = await fetch("/bangladesh.json")
            return data;
          } catch (err) {
            err; // to hide editor warning
            return []
          }
        },
        path: "/signup",
        element: <SignupPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/logout",
        element: <LogoutPage />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><MainLayout></MainLayout></PrivateRoute>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>
      },
      {
        loader: async () => {
          try {
            let data = await fetch("/bangladesh.json")
            return data;
          } catch (err) {
            err; // to hide editor warning
            return []
          }
        },
        path: "create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>
      },
      {
        path:"my-donation-requests",
        element: <MyDonationRequests></MyDonationRequests>
      }
    ]
  },
  {
    path: "*",
    element: <>Page not found</>
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
)
