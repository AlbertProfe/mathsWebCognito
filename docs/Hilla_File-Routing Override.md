## Hilla File-Routing Override

We <mark>replaced Hilla's default file-based routing with a custom routing system</mark> using `react-router-dom`.

- **Why?** Hilla's file-routing automatically applies a layout with a navigation drawer to all pages, but we wanted the home page (`/`) to display without the drawer.
- **How?** In `index.tsx`, we use `createBrowserRouter` to define routes manually. The home page (`/`) and `/home` render `HomeView` directly, while `/login`, `/dashboard`, and `/maths` use `MainLayout` with the drawer.
- **New Entry Point**: `index.tsx` is the main entry point, where we set up the router and render the app using `RouterProvider`.

> This gives us control over which pages have the drawer and supports our AWS Cognito authentication flow.

## Relevant Code

### `index.tsx`

This file sets up the custom router using `react-router-dom`, defining routes for the home page without the drawer and other pages with the drawer.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeView from './views/@index';
import MainLayout from './views/@layout';
import LoginPage from './views/login';
import DashboardView from './views/dashboard';
import MathsView from './views/maths';

const router = createBrowserRouter([
  { path: '/', element: <HomeView /> },
  { path: '/home', element: <HomeView /> },
  {
    element: <MainLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/dashboard', element: <DashboardView /> },
      { path: '/maths', element: <MathsView /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('outlet')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

### `@index.tsx` (HomeView)

This file defines the home page, which renders without the drawer and shows a "Sign In" or "Sign Out" button based on authentication status.

```jsx
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { VerticalLayout, Button } from '@vaadin/react-components';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'Frontend/util/authService';
import '../themes/mathswebcognito/styles.css';

export const config: ViewConfig = {
  menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' },
  title: 'Home',
};

export default function HomeView() {
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem('accessToken');

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <VerticalLayout className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to MathsWebCognito</h1>
      <p className="text-lg mb-6">A simple Hilla app with Cognito authentication</p>
      {isLoggedIn ? (
        <Button theme="primary" className="w-48" onClick={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button theme="primary" className="w-48" onClick={() => navigate('/login')}>
          Sign In
        </Button>
      )}
    </VerticalLayout>
  );
}
```

### `@layout.tsx` (MainLayout)

This file defines the layout with the navigation drawer, applied to `/login`, `/dashboard`, and `/maths`. It excludes the home page from the sidebar and protects routes with an authentication check.

```jsx
import { createMenuItems } from '@vaadin/hilla-file-router/runtime.js';
import { AppLayout, DrawerToggle, Icon, SideNav, SideNavItem } from '@vaadin/react-components';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../themes/mathswebcognito/styles.css';

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = createMenuItems().filter(item => item.title !== 'Home');

  useEffect(() => {
    if (!sessionStorage.getItem('accessToken') && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <div
            className="font-semibold text-l cursor-pointer text-left hover:underline"
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate
```