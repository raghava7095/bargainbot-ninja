
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { EyeIcon, EyeOffIcon, ArrowRight, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      await login(data.email, data.password);
      
      toast({
        title: "Login Successful",
        description: "Welcome back to BargainBotNinja!",
        variant: "default",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    try {
      // Simulate Google login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock Google user
      const userData = { 
        name: 'Google User', 
        email: 'google.user@example.com', 
        isLoggedIn: true 
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Google Login Successful",
        description: "Welcome to BargainBotNinja!",
        variant: "default",
      });
      
      navigate('/');
      window.location.reload(); // Refresh to update the navbar
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: "Google Login Failed",
        description: "There was a problem signing in with Google.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to access your saved deals
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-brand-purple hover:text-brand-light-purple transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className={errors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          
          <Separator className="my-6" />
          
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center" 
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              {!isGoogleLoading && (
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              {isGoogleLoading ? "Signing in with Google..." : "Sign in with Google"}
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-purple hover:text-brand-light-purple transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
      
      <div className="mt-8 max-w-md w-full">
        <div className="bg-brand-purple/5 border border-brand-purple/20 rounded-lg p-4">
          <h3 className="font-medium text-brand-purple flex items-center mb-2">
            <Check className="h-4 w-4 mr-2" />
            Why Create an Account?
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center">
              <ArrowRight className="h-3 w-3 text-brand-purple mr-2 flex-shrink-0" />
              <span>Save products to your wishlist and track price changes</span>
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-3 w-3 text-brand-purple mr-2 flex-shrink-0" />
              <span>Get personalized deal alerts based on your preferences</span>
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-3 w-3 text-brand-purple mr-2 flex-shrink-0" />
              <span>Access AI-powered shopping recommendations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
