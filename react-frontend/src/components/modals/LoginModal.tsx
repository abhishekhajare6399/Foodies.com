import React, { useState } from 'react';
import axios from "axios";
import { X, Eye, EyeOff } from 'lucide-react';

// import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../contexts/ModalContext';

const LoginModal: React.FC = () => {
  const { closeModal, openModal } = useModal();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!username || !password) {
      setError('All fields are required');
      return;
    }
    setIsLoading(true);
    try {
      const success = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });
       if (success) {
        closeModal();
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // const { login } = useAuth();
  // const { closeModal, openModal } = useModal();
  
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  
  // const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);
    
  //   if (!email || !password) {
  //     setError('All fields are required');
  //     return;
  //   }
    
  //   setIsLoading(true);
  //   try {
  //     const success = await login(email, password);
  //     if (success) {
  //       closeModal();
  //     } else {
  //       setError('Invalid credentials');
  //     }
  //   } catch (err) {
  //     setError('Something went wrong. Please try again.');
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  const openSignupModal = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal('signup');
  };
  
  return (
    <div>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Login</h2>
        <button onClick={closeModal} className="text-neutral-500 hover:text-neutral-700">
          <X size={20} />
        </button>
      </div>
      
      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-danger rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              Email
            </label>
            <input
              id="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <a href="#" className="text-xs text-primary-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className={`btn btn-primary w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral-600">
            Don't have an account?{' '}
            <a href="#" onClick={openSignupModal} className="text-primary-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;