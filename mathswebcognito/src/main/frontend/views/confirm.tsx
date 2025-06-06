import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { VerticalLayout, TextField, Button } from '@vaadin/react-components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmSignUp } from 'Frontend/util/authService';
import '../themes/mathswebcognito/styles.css';

export const config: ViewConfig = {
  menu: { exclude: true },
  title: 'Confirm Account',
};

export default function ConfirmUserPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmSignUp(email, confirmationCode);
      alert('Account confirmed successfully! Sign in on next page.');
      navigate('/login');
    } catch (error: any) {
      alert(`Failed to confirm account: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <VerticalLayout
      className="min-h-screen flex flex-col items-center justify-center p-4 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Confirm Account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
        <TextField
          label="Confirmation Code"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          required
          className="w-full"
        />
        <Button
          theme="primary"
          type="submit"
          className="w-full"
        >
          Confirm Account
        </Button>
      </form>
    </VerticalLayout>
  );
}