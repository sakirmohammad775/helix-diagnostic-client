import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function useAuth() {
  const context = useContext(AuthContext);
  // LOGIC: Ensure that the hook is used within the AuthProvider context
  if (!context) {
    throw new Error('useAuth must be utilized within an absolute <AuthProvider> context wrapper');
  }
  
  return context;
}