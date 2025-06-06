import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { VerticalLayout, Button } from '@vaadin/react-components';
import { useEffect } from 'react';
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
    console.log('Signed out, sessionStorage cleared');
    navigate('/');
  };

  return (
    <VerticalLayout
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100"
    >
      <h1 className="text-3xl font-bold mb-4">Welcome to MathsWebCognito</h1>
      <p className="text-lg mb-6">A simple Hilla app with Cognito authentication</p>
      {isLoggedIn ? (
        <Button
          theme="primary"
          className="w-48"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          theme="primary"
          className="w-48"
          onClick={() => navigate('/login')}
        >
          Sign In
        </Button>
      )}
    </VerticalLayout>
  );
}