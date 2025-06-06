import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeView from './views/@index';
import MainLayout from './views/@layout';
import LoginPage from './views/login';
import DashboardView from './views/dashboard';
import MathsView from './views/maths';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView />,
  },
  {
      path: '/home',
      element: <HomeView />,
    },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/dashboard',
        element: <DashboardView />,
      },
  {
          path: '/maths',
          element: <MathsView />,
        },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('outlet')!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);