import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user';
import { useUserStore } from '../stores/useUserStore'; // ✅ חדש
import AuthFormField from '../components/AuthFormField';

const Register = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = useUserStore((state) => state.login); // ✅ חדש

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user, token } = await registerUser({ id, name, phone }); // ✅ עדכון
      login({ ...user, token }); // ✅ שומר ב-zustand + localStorage
      navigate('/dashboard'); // ✅ דילוג על login
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Register to AI Learning Platform
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <AuthFormField
            label="ID"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <AuthFormField
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <AuthFormField
            label="Phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
