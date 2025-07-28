import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle, CheckCircle, Loader2, Shield, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [focusedField, setFocusedField] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (fieldErrors[field]) {
            setFieldErrors(prev => ({ ...prev, [field]: '' }));
        }
        if (error) setError('');
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }
        
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        setError('');
        setSuccess('');
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        setIsLoading(true);
        
        try {
            const requestBody = {
                email: formData.email,
                password: formData.password
            };
            
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setSuccess('Login successful! Redirecting...');
                
                // Store token in Cookies
                    Cookies.set('token', data.token);
                    Cookies.set('user', JSON.stringify(data.user));
                
                // Role-based routing
                setTimeout(() => {
                    const userRole = data.user?.Role || data.user?.role;
                    if (userRole === 'Admin') {
                        console.log('Redirecting to admin dashboard');
                        navigate("/admin-dashboard");
                    } else {
                        console.log('Redirecting to user dashboard');
                        navigate("/dashboard");
                    }
                }, 1500);
                
            } else {
                // Handle backend error responses based on your API tests
                switch (data.errorCode) {
                    case 1001:
                        setError('User not found. Please check your email address.');
                        setFieldErrors({ email: 'User not found' });
                        break;
                    case 1005:
                        setError('Incorrect password. Please try again.');
                        setFieldErrors({ password: 'Incorrect password' });
                        break;
                    case 1003:
                        setError('All fields are required. Please fill in both email and password.');
                        break;
                    default:
                        setError(data.message || 'Login failed. Please try again.');
                }
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800">
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Floating orbs animation */}
                <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                                <LogIn className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                Welcome Back
                            </h1>
                            <p className="text-white/70 text-sm">
                                Sign in to access your account
                            </p>
                        </div>

                        <div className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start space-x-3">
                                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <div className="text-red-200 text-sm">{error}</div>
                                </div>
                            )}
                            
                            {success && (
                                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <div className="text-green-200 text-sm">{success}</div>
                                </div>
                            )}

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className={`w-5 h-5 transition-colors duration-300 ${
                                        focusedField === 'email' ? 'text-blue-400' : 'text-white/50'
                                    }`} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="business@gmail.com"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField('')}
                                    onKeyPress={handleKeyPress}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm ${
                                        fieldErrors.email 
                                            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                                            : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                                    }`}
                                />
                                {fieldErrors.email && (
                                    <div className="absolute -bottom-6 left-0 text-red-400 text-xs flex items-center space-x-1">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>{fieldErrors.email}</span>
                                    </div>
                                )}
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                                    focusedField === 'email' ? 'opacity-100' : ''
                                }`}></div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className={`w-5 h-5 transition-colors duration-300 ${
                                        focusedField === 'password' ? 'text-blue-400' : 'text-white/50'
                                    }`} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField('')}
                                    onKeyPress={handleKeyPress}
                                    className={`w-full pl-12 pr-12 py-4 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm ${
                                        fieldErrors.password 
                                            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                                            : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                                    }`}
                                />
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </div>
                                {fieldErrors.password && (
                                    <div className="absolute -bottom-6 left-0 text-red-400 text-xs flex items-center space-x-1">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>{fieldErrors.password}</span>
                                    </div>
                                )}
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                                    focusedField === 'password' ? 'opacity-100' : ''
                                }`}></div>
                            </div>

                            <div className="text-right">
                                <a href="/forgot-password" className="text-sm text-white/70 hover:text-blue-400 transition-colors duration-300 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>

                            <div
                                onClick={handleSubmit}
                                className={`group relative w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 overflow-hidden cursor-pointer ${
                                    isLoading 
                                        ? 'bg-gray-600 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 hover:shadow-xl text-white'
                                }`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <div className="relative flex items-center justify-center space-x-2">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin text-white" />
                                            <span className="text-white">Signing In...</span>
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="w-5 h-5" />
                                            <span>Sign In</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="text-center pt-4 border-t border-white/10">
                                <p className="text-white/70 text-sm">
                                    Don't have an account?{' '}
                                    <a href="/" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline">
                                        Register here
                                    </a>
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-6">
                                <div className="text-center text-white/60 text-xs mb-3">Quick Access</div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center space-x-2 text-white/70 text-xs">
                                        <User className="w-4 h-4 text-blue-400" />
                                        <span>User Dashboard</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-white/70 text-xs">
                                        <Shield className="w-4 h-4 text-purple-400" />
                                        <span>Admin Dashboard</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-white/50 text-xs">
                            Secure login protected by encryption
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;