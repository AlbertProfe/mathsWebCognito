import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { VerticalLayout, TextField, Button } from '@vaadin/react-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, confirmForgotPassword } from 'Frontend/util/authService';
import '../themes/mathswebcognito/styles.css';

export const config: ViewConfig = {
  menu: { exclude: true },
  title: 'Forgot Password',
};

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setStep(2);
    } catch (error: any) {
      alert(`Failed to send code: ${error.message || 'Unknown error'}`);
    }
  };

  const handleConfirmPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmForgotPassword(email, code, newPassword);
      alert('Password reset successfully! You can now log in with your new password.');
      navigate('/login');
    } catch (error: any) {
      alert(`Failed to reset password: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <VerticalLayout
      className="min-h-screen flex flex-col items-center justify-center p-4 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      {step === 1 ? (
        <form onSubmit={handleSendCode} className="flex flex-col gap-4 w-full">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
          <Button
            theme="primary"
            type="submit"
            className="w-full"
          >
            Send Code
          </Button>
        </form>
      ) : (
        <form onSubmit={handleConfirmPassword} className="flex flex-col gap-4 w-full">
          <TextField
            label="Confirmation Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full"
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full"
          />
          <Button
            theme="primary"
            type="submit"
            className="w-full"
          >
            Reset Password
          </Button>
        </form>
      )}
    </VerticalLayout>
  );
}