import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff, BookOpen } from 'lucide-react';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', adminKey: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/users/login', form);
      const user = res.data.user;

      if (user.role === 'admin' && form.adminKey !== 'admin') {
        setError('Invalid admin code');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(user));

      // 👉 Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin/suggestions');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {form.email === 'admin@blog.com' && (
                  <div className="space-y-2">
                    <Label htmlFor="adminKey">Admin Code</Label>
                    <Input
                      id="adminKey"
                      type="text"
                      name="adminKey"
                      value={form.adminKey}
                      onChange={handleChange}
                      placeholder="Enter admin code"
                      required
                    />
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link 
                    to="/register" 
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div 
        className="hidden lg:block bg-cover bg-center bg-gray-100"
        style={{ backgroundImage: "url('/login_image.jpeg')" }}
      >
        <div className="h-full bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <h2 className="text-4xl font-bold mb-4">Join Our Story Community</h2>
            <p className="text-xl opacity-90">Discover and share amazing stories</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;