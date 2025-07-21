import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/user';
import AuthFormField from '../components/AuthFormField';
import { useUserStore } from '../stores/useUserStore';

const Login = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState<{ name?: string; phone?: string; general?: string }>({});

    const navigate = useNavigate();
    const login = useUserStore((state) => state.login);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        let hasError = false;
        const newErrors: typeof errors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            hasError = true;
        }

        if (!phone.trim()) {
            newErrors.phone = 'Phone is required';
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        try {
            const { token, user } = await loginUser({ name, phone });
            login(user, token);
            if (user.isAdmin) { 
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err: any) {
            console.error('LOGIN ERROR:', err);
            const message = err.response?.data?.message || 'Login failed';
            setErrors({ general: message });
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login to AI Learning Platform</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <AuthFormField
                        label="Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={errors.name}
                    />
                    <AuthFormField
                        label="Phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={errors.phone}
                    />
                    {errors.general && (
                        <div className="text-red-500 text-sm mt-2 text-center">
                            {errors.general === 'User not found with this name and phone number' ? (
                                <>
                                    <p>User not found.</p>
                                    <button
                                        onClick={() => navigate('/register')}
                                        className="mt-2 text-blue-600 hover:underline"
                                        type="button"
                                    >
                                        Click here to register
                                    </button>
                                </>
                            ) : (
                                <p>{errors.general}</p>
                            )}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-gray-600 text-center mt-4">
                    Don’t have an account?{' '}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
