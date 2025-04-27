import { useState } from 'react';
import { motion } from 'framer-motion';
import { Apple, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import { useAuth } from '../context/AuthContext';
import PriyaLogo from '../components/UI/PriyaLogo';

const Welcome = () => {
  const { login, loginWithGoogle, loginWithApple } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  
  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    navigate('/categories');
  };
  
  const handleAppleLogin = async () => {
    await loginWithApple();
    navigate('/categories');
  };
  
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate('/categories');
  };
  
  return (
    <PageLayout backgroundColor="bg-primary-500" withPadding={false}>
      <div className="flex flex-col items-center justify-between h-full py-16 px-6">
        <div className="w-full text-center text-white">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4"
          >
            <h1 className="text-3xl font-bold mb-2">Welcome to</h1>
            <h1 className="text-5xl font-bold mb-8">Priya AAC</h1>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-xl opacity-90">
              Thank you for downloading Priya AAC, let's get started with setting up your profile.
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="py-10"
        >
          <PriyaLogo size={180} />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full space-y-4"
        >
          {showEmailForm ? (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
              <button type="submit" className="btn btn-secondary w-full">
                Sign in
              </button>
              <button 
                type="button" 
                onClick={() => setShowEmailForm(false)}
                className="text-white underline w-full text-center py-2"
              >
                Back to options
              </button>
            </form>
          ) : (
            <>
              <button 
                onClick={handleAppleLogin} 
                className="btn w-full bg-white text-black"
              >
                <Apple className="mr-2" size={20} />
                Sign in with Apple
              </button>
              
              <button 
                onClick={handleGoogleLogin} 
                className="btn w-full bg-white text-black"
              >
                <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Sign in with Google
              </button>
              
              <button 
                onClick={() => setShowEmailForm(true)} 
                className="btn w-full bg-white text-black"
              >
                <Mail className="mr-2" size={20} />
                Sign in with Email
              </button>
            </>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center text-white text-sm mt-6"
        >
          <p>
            By signing in you accept our{' '}
            <a href="#" className="underline">Terms of Use</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Welcome;