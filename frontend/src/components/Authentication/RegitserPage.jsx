import React, { useState } from 'react';
import { Eye, EyeOff, Building2, MapPin, Phone, Mail, Lock, Sparkles, ArrowRight, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        businessName: '',
        businessAddress: '',
        phone: '',
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
        
        if (!formData.businessName.trim()) {
            errors.businessName = 'Business name is required';
        }
        
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^[+]?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s/g, ''))) {
            errors.phone = 'Please enter a valid phone number';
        }
        
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        // Clear previous errors
        setError('');
        setSuccess('');
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        setIsLoading(true);
        
        try {
            const requestBody = {
                name: formData.businessName,
                email: formData.email,
                PhoneNo: formData.phone,
                address: formData.businessAddress,
                password: formData.password
            };
            
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setSuccess('Account created successfully! Welcome aboard!');
                setFormData({
                    businessName: '',
                    businessAddress: '',
                    phone: '',
                    email: '',
                    password: ''
                });
                
                setTimeout(() => {
                    console.log('Redirect to login or dashboard');
                    navigate('/login');
                }, 2000);
                
            } else {
                switch (data.errorCode) {
                    case 1002:
                        setError('An account with this email already exists. Please use a different email or try logging in.');
                        setFieldErrors({ email: 'Email already registered' });
                        break;
                    case 1003:
                        setError('Please fill in all required fields.');
                        break;
                    case 2002:
                        setError('Please check your input data and try again.');
                        break;
                    default:
                        setError(data.message || 'Registration failed. Please try again.');
                }
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
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
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Create Account
                            </h2>
                            <p className="text-white/70 text-sm">
                                Join thousands of businesses today
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
                                    <Building2 className={`w-5 h-5 transition-colors duration-300 ${
                                        focusedField === 'businessName' ? 'text-blue-400' : 'text-white/50'
                                    }`} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Business Name"
                                    value={formData.businessName}
                                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                                    onFocus={() => setFocusedField('businessName')}
                                    onBlur={() => setFocusedField('')}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm ${
                                        fieldErrors.businessName 
                                            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                                            : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                                    }`}
                                />
                                {fieldErrors.businessName && (
                                    <div className="absolute -bottom-6 left-0 text-red-400 text-xs flex items-center space-x-1">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>{fieldErrors.businessName}</span>
                                    </div>
                                )}
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                                    focusedField === 'businessName' ? 'opacity-100' : ''
                                }`}></div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin className={`w-5 h-5 transition-colors duration-300 ${
                                        focusedField === 'businessAddress' ? 'text-blue-400' : 'text-white/50'
                                    }`} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Business Address"
                                    value={formData.businessAddress}
                                    onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                                    onFocus={() => setFocusedField('businessAddress')}
                                    onBlur={() => setFocusedField('')}
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                                />
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                                    focusedField === 'businessAddress' ? 'opacity-100' : ''
                                }`}></div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Phone className={`w-5 h-5 transition-colors duration-300 ${
                                        focusedField === 'phone' ? 'text-blue-400' : 'text-white/50'
                                    }`} />
                                </div>
                                <input
                                    type="tel"
                                    placeholder="+91 XXXXXXXXXX"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    onFocus={() => setFocusedField('phone')}
                                    onBlur={() => setFocusedField('')}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm ${
                                        fieldErrors.phone 
                                            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                                            : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                                    }`}
                                />
                                {fieldErrors.phone && (
                                    <div className="absolute -bottom-6 left-0 text-red-400 text-xs flex items-center space-x-1">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>{fieldErrors.phone}</span>
                                    </div>
                                )}
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                                    focusedField === 'phone' ? 'opacity-100' : ''
                                }`}></div>
                            </div>

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
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
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
                                    placeholder="Set Password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField('')}
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
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
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
                                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl text-white'
                                }`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <div className="relative flex items-center justify-center space-x-2">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin text-white" />
                                            <span className="text-white">Creating Account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                                            <span>Create Account</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="text-center pt-4 border-t border-white/10">
                                <p className="text-white/70 text-sm">
                                    Already have an account?{' '}
                                    <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:underline">
                                        Login here
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-white/50 text-xs">
                            By creating an account, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}