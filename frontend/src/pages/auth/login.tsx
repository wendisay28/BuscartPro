import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/services/auth';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, OAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.signIn(formData);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerName: 'google' | 'facebook' | 'apple') => {
    setLoading(true);
    setError('');

    try {
      let userCredential;
      
      if (providerName === 'google') {
        const googleProvider = new GoogleAuthProvider();
        userCredential = await signInWithPopup(auth, googleProvider);
      } else if (providerName === 'facebook') {
        const facebookProvider = new FacebookAuthProvider();
        userCredential = await signInWithPopup(auth, facebookProvider);
      } else if (providerName === 'apple') {
        const appleProvider = new OAuthProvider('apple.com');
        appleProvider.addScope('email');
        appleProvider.addScope('name');
        userCredential = await signInWithPopup(auth, appleProvider);
      }

      if (userCredential) {
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error(`Error en autenticación con ${providerName}:`, error);
      
      let errorMessage = 'Error al iniciar sesión. Por favor, intenta de nuevo.';
      
      if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'Ya existe una cuenta con el mismo correo electrónico pero con un método de inicio de sesión diferente.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = '';
      } else if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-blocked') {
        errorMessage = 'La ventana de inicio de sesión fue bloqueada. Por favor, permite las ventanas emergentes para este sitio.';
      }
      
      if (errorMessage) {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-start lg:items-center justify-center p-2 sm:p-4">
      <div
        className="w-full max-w-5xl bg-gray-900 rounded-xl lg:rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(187,0,170,0.3)] flex flex-col lg:flex-row relative z-10 border border-gray-800 mt-4 lg:mt-0 max-h-[80vh]"
        style={{ maxHeight: '80vh' }}
      >
        
        {/* Columna izquierda - Formulario */}
        <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full text-center mb-4">
            <div className="relative w-48 h-14 mx-auto mb-2">
              <img 
                src="/images/logo3.svg" 
                alt="BuscArt"
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error('Error al cargar el logo:', e);
                  e.currentTarget.src = '/images/logo3.svg';
                }}
              />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white mb-1">Bienvenido a BuscArt</h1>
            <p className="text-gray-400 text-xs">
              Inicia sesión para continuar
            </p>
          </div>
          
          <div className="w-full">

            {/* Formulario */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm bg-black rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(187,0,170,0.2)] border border-[#bb00aa]/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#bb00aa]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>
              
              <div className="text-center relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2">Inicia sesión</h2>
                <p className="text-sm text-gray-400 mb-6">
                  O{' '}
                  <Link 
                    to="/register" 
                    className="font-medium text-[#bb00aa] hover:text-[#d966ff] transition-colors relative z-20"
                  >
                    crea una cuenta
                  </Link>
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">Correo electrónico</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bb00aa] focus:border-transparent`}
                      placeholder="Correo electrónico"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">Contraseña</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bb00aa] focus:border-transparent`}
                      placeholder="Contraseña"
                    />
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#bb00aa] focus:ring-[#bb00aa] border-gray-700 rounded bg-gray-800"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-gray-400">
                      Recuérdame
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-[#bb00aa] hover:text-[#d966ff]">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#bb00aa] to-[#9e00a8] hover:from-[#d400c0] hover:to-[#b300a8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bb00aa] transition-all duration-200 transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <span className="flex items-center">
                        Iniciar sesión <FiArrowRight className="ml-2" />
                      </span>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-gray-900 text-gray-400 text-xs sm:text-sm">O continúa con</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { 
                      provider: 'google', 
                      label: 'Google',
                      icon: (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                      )
                    },
                    { 
                      provider: 'facebook', 
                      label: 'Facebook',
                      icon: (
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      )
                    },
                    { 
                      provider: 'apple', 
                      label: 'Apple',
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-3.188 1.52-.14-1.36.396-2.66 1.168-3.48.7-.85 1.91-1.43 3.12-1.43.02 1.1.08 2.3.08 3.31zM5.5 23.5c1.5 0 2.08-.29 3.07-.99.85-.6 1.49-1.9 1.49-1.9s-1.11.29-2.17.29c-4.5 0-7.39-3.6-7.39-10.02 0-6.15 3.79-10.58 8.55-10.58 1.5 0 3.03.43 4.28 1.17l-1.66 2.88c-.62-.35-1.25-.6-1.98-.6-2.83 0-5.15 2.5-5.15 5.9 0 3.3 1.86 5.7 4.46 5.7 1.2 0 2.05-.5 2.78-1.2.3-.3.5-.5.9-.8.8-.6 1.5-.8 2.4-.8h.1c.5 0 1.5.1 2.3 1.4.1.2.1.6.1.9 0 1.1-.5 2.3-1.5 3.6-1.2 1.5-2.5 2.6-4.6 2.6-1.3 0-1.7-.3-2.7-.3-1.1 0-1.4.3-2.6.3z" />
                        </svg>
                      )
                    }
                  ].map(({ provider, label, icon }) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => handleSocialLogin(provider as 'google' | 'facebook' | 'apple')}
                      disabled={loading}
                      className="w-full inline-flex justify-center py-2 px-2 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bb00aa] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Iniciar sesión con {label}</span>
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Columna derecha - Imagen */}
        <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
          <img
            src={encodeURI("/images/diseñoapp.svg")}
            alt="Diseño de la aplicación"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Error al cargar la imagen decorativa:', e);
              e.currentTarget.src = encodeURI('/images/diseñoapp.svg');
            }}
          />
        </div>
      </div>
    </div>
  );
}
