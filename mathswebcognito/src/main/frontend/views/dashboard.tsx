import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { VerticalLayout } from '@vaadin/react-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../themes/mathswebcognito/styles.css';

export const config: ViewConfig = {
  menu: { order: 1, icon: 'line-awesome/svg/tachometer-alt-solid.svg' },
  title: 'Dashboard',
};

export default function DashboardView() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('accessToken')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <VerticalLayout className="h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="text-lg">Welcome to your private dashboard!</p>
    </VerticalLayout>
  );
}