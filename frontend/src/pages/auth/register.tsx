// src/pages/Register.tsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService, UserType } from '@/services/auth';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, OAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiLock, FiUser } from 'react-icons/fi';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { z } from 'zod';

// Validación con Zod
const signUpSchema = z.object({
  username: z.string().min(2, 'El nombre de usuario debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  phone: z.string().min(10, 'Ingresa un número de teléfono válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  userType: z.enum(['general', 'artist', 'company'] as const)
});

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    userType: 'general' as UserType
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSocialLogin = async (providerName: 'google' | 'facebook' | 'apple') => {
    setLoading(true);
    setError('');

    try {
      let userCredential;

      if (providerName === 'google') {
        userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
      } else if (providerName === 'facebook') {
        userCredential = await signInWithPopup(auth, new FacebookAuthProvider());
      } else {
        const provider = new OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        userCredential = await signInWithPopup(auth, provider);
      }

      if (userCredential) navigate('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        setError('Ya existe una cuenta con ese correo pero otro método de inicio.');
      } else if (error.code !== 'auth/popup-closed-by-user') {
        setError('Error al iniciar sesión. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      const formatted: Record<string, string> = {};
      result.error.errors.forEach(err => {
        formatted[err.path[0] as string] = err.message;
      });
      setErrors(formatted);
      return;
    }

    try {
      setLoading(true);
      const { email, password, username, userType } = formData;
      await authService.signUp({ email, password, firstName: username, lastName: '', userType });
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Error en el registro:', err);
      
      // Manejar errores específicos de Firebase
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo electrónico ya está en uso. ¿Quieres iniciar sesión?');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña es demasiado débil. Debe tener al menos 6 caracteres.');
      } else if (err.code === 'auth/invalid-email') {
        setError('El correo electrónico no es válido.');
      } else {
        setError('Error al registrar. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-start lg:items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-5xl bg-gray-900 rounded-xl lg:rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(187,0,170,0.3)] flex flex-col lg:flex-row relative z-10 border border-gray-800 mt-4 lg:mt-0">
        {/* Columna izquierda */}
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
            <h1 className="text-lg sm:text-xl font-bold text-white mb-1">Crea tu cuenta</h1>
            <p className="text-gray-400 text-xs">
              Únete a BuscArt y comienza tu viaje
            </p>
          </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm bg-black rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(187,0,170,0.2)] border border-[#bb00aa]/30 relative"
            >
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Nombre de usuario"
                  className={`pl-8 w-full py-2 text-sm rounded-lg bg-gray-800 border ${errors.username ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-400`}
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <FiUser className="h-4 w-4 text-gray-400" />
                </div>
                {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
              </div>

              {[
                { id: 'email', icon: <FiMail />, type: 'email', placeholder: 'Correo electrónico' },
                { id: 'phone', icon: <FiPhone />, type: 'tel', placeholder: 'Teléfono' },
                { id: 'password', icon: <FiLock />, type: 'password', placeholder: 'Contraseña' }
              ].map(({ id, icon, type, placeholder }) => (
                <div key={id} className="relative">
                  <input
                    name={id}
                    type={type}
                    value={(formData as any)[id]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`pl-8 w-full py-2 text-sm rounded-lg bg-gray-800 border ${errors[id] ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-400`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    {icon}
                  </div>
                  {errors[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
                </div>
              ))}

              {/* Tipo de cuenta */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Tipo de cuenta</label>
                <div className="grid grid-cols-3 gap-1">
                  {['general', 'artist', 'company'].map((type) => (
                    <label key={type}>
                      <input
                        type="radio"
                        name="userType"
                        className="hidden"
                        checked={formData.userType === type}
                        onChange={() => setFormData({ ...formData, userType: type as UserType })}
                      />
                      <div className={`text-xs text-center py-2 rounded-lg border cursor-pointer transition ${
                        formData.userType === type
                          ? 'bg-[#bb00aa] text-white border-[#bb00aa]'
                          : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                      }`}>
                        {type === 'general' ? 'General' : type === 'artist' ? 'Artista' : 'Empresa'}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-[#bb00aa] to-[#9e00a8] text-white text-sm font-medium hover:from-[#d400c0] hover:to-[#b300a8] transition mt-2"
              >
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>

              {error && <div className="text-sm text-red-400 bg-red-900/20 p-2 rounded-lg">{error}</div>}
            </form>

            {/* Divider y redes */}
            <div className="my-4 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm text-gray-400 bg-black px-2">
                O regístrate con
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { name: 'google', icon: <FaGoogle /> },
                { name: 'facebook', icon: <FaFacebookF /> },
                { name: 'apple', icon: <FaApple /> }
              ].map(({ name, icon }) => (
                <button
                  key={name}
                  onClick={() => handleSocialLogin(name as any)}
                  className="py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white flex justify-center text-lg"
                >
                  {icon}
                </button>
              ))}
            </div>

              <div className="text-center mt-4 text-xs text-gray-400">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="text-[#bb00aa] hover:underline">Inicia sesión</Link>
              </div>
            </motion.div>
        </div>

        {/* Imagen - Derecha */}
        <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
          <img
            src="/images/diseñoapp.svg"
            alt="Diseño"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = '/images/diseñoapp.svg')}
          />
        </div>
      </div>
    </div>
  );
}