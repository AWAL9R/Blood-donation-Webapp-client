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
import BloodDonationRequests from './pages/BloodDonationRequests';
import AdminRoute from './components/AdminRoute';
import AllBloodDonationRequests from './pages/dashboard/AllBloodDonationRequests';
import AllUsers from './pages/dashboard/AllUsers';
import AdminRequiredCard from './components/AdminRequiredCard';
import Error404 from './components/Error404';
import AdminOrVolunteerRoute from './components/AdminOrVolunteerRoute';
import SearchPage from './pages/SearchPage';
import FundingPage from './pages/FundingPage';



const geoDataLoader = async () => {
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
        element: <PrivateRoute><DonationPage /></PrivateRoute>
      },
      {
        path: "/blood-donation-requests",
        element: <BloodDonationRequests />
      },
      {
        path: "/funding",
        element: <PrivateRoute><FundingPage /></PrivateRoute>
      },
      {
        loader: geoDataLoader,
        path: "/search",
        element: <SearchPage />
      },

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
        path: "my-donation-requests",
        element: <MyDonationRequests></MyDonationRequests>
      },
      {
        path: "all-blood-donation-request",
        element: <AdminOrVolunteerRoute fallback={<AdminRequiredCard />}><AllBloodDonationRequests /></AdminOrVolunteerRoute>
      },
      {
        path: "all-users",
        element: <AdminRoute fallback={<AdminRequiredCard />}><AllUsers /></AdminRoute>
      },
      {
        loader: geoDataLoader,
        path: "profile",
        element: <ProfilePage />
      }
    ]
  },
  {
    path: "*",
    element: <Error404 />
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
