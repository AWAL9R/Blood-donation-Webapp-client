import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuthContextProvider from './contexts/AuthContextProvider';
import { Toaster } from 'react-hot-toast';
import LogoutPage from './pages/LogoutPage';
import CreateDonationRequest from './pages/dashboard/CreateDonationRequest';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import MyDonationRequests from './pages/dashboard/MyDonationRequests';
import DashboardLayout from './layouts/DashboardLAyout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DonationPage from './pages/DonationPage';
import ProfilePage from './pages/dashboard/ProfilePage';



const geoDataLoader=async () => {
          try {
            let data = await fetch("/bangladesh.json")
            return data;
          } catch (err) {
            err; // to hide editor warning
            return []
          }
        }

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>
      },
      {
        loader: geoDataLoader,
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
      },
      {
        path: "/donation/:id",
        element: <DonationPage />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>
      },
      {
        loader: geoDataLoader,
        path: "create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>
      },
      {
        path:"my-donation-requests",
        element: <MyDonationRequests></MyDonationRequests>
      },
      {
        loader: geoDataLoader,
        path:"profile",
        element: <ProfilePage/>
      }
    ]
  },
  {
    path: "*",
    element: <>Page not found</>
  },
]);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <RouterProvider router={router} />
    </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
