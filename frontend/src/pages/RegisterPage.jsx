// import { useState } from "react";
// import api from "../api/axios";
// import { Link, useNavigate } from "react-router-dom";

// export default function RegisterPage() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const register = async () => {
//     try {
//       await api.post("/auth/register", form);
//       navigate("/");
//     } catch (err) {
//       alert("Error registering user");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-200">
//       <div className="p-8 bg-white shadow-xl rounded-xl w-96">
//         <h1 className="text-2xl font-bold mb-4">Register</h1>

//         <input className="w-full p-2 border rounded mb-3" placeholder="Name"
//           onChange={(e) => setForm({ ...form, name: e.target.value })} />

//         <input className="w-full p-2 border rounded mb-3" placeholder="Email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })} />

//         <input className="w-full p-2 border rounded mb-3" type="password" placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })} />

//         <button onClick={register} className="w-full bg-blue-600 text-white py-2 rounded">
//           Register
//         </button>

//         <p className="text-center mt-3 text-sm">
//           Already have an account? <Link to="/" className="text-blue-600">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, User, Mail, Lock, Eye, EyeOff, Sparkles, LogIn, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const register = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) return;

    try {
      setIsLoading(true);
      await api.post("/auth/register", form);
      navigate("/");
    } catch (err) {
      alert("Error registering user. Please try again with different credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      register();
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setForm({ ...form, password });
    
    // Simple password strength calculation
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return "bg-gray-500";
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0: return "Very Weak";
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Strong";
      default: return "Very Weak";
    }
  };

  return (
    <>
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-indigo-500/15 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-float-fast"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="flex justify-center items-center min-h-screen p-6">
        {/* Main Register Card */}
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Sparkles size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                PrashnaAI
              </h1>
            </div>
            <p className="text-gray-400 text-lg">Join our intelligent research platform</p>
          </div>

          {/* Register Form */}
          <div className="bg-gray-900/60 backdrop-blur-2xl border border-gray-700/50 rounded-3xl shadow-2xl shadow-black/50 p-8">
            {/* Card Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2 text-center">Create Account</h2>
              <p className="text-gray-400 text-center mb-8">Start your research journey today</p>

              {/* Name Input */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <input
                    className="w-full h-12 pl-12 pr-4 bg-gray-800/70 backdrop-blur-sm 
                      border border-gray-600/50 rounded-xl text-white placeholder-gray-400
                      focus:outline-none focus:border-purple-500/70 focus:bg-gray-800/90
                      transition-all duration-300 font-normal
                      focus:ring-2 focus:ring-purple-500/20"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Mail size={20} className="text-gray-500" />
                  </div>
                  <input
                    className="w-full h-12 pl-12 pr-4 bg-gray-800/70 backdrop-blur-sm 
                      border border-gray-600/50 rounded-xl text-white placeholder-gray-400
                      focus:outline-none focus:border-purple-500/70 focus:bg-gray-800/90
                      transition-all duration-300 font-normal
                      focus:ring-2 focus:ring-purple-500/20"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    type="email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Lock size={20} className="text-gray-500" />
                  </div>
                  <input
                    className="w-full h-12 pl-12 pr-12 bg-gray-800/70 backdrop-blur-sm 
                      border border-gray-600/50 rounded-xl text-white placeholder-gray-400
                      focus:outline-none focus:border-purple-500/70 focus:bg-gray-800/90
                      transition-all duration-300 font-normal
                      focus:ring-2 focus:ring-purple-500/20"
                    placeholder="Create a strong password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {form.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Password strength</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength === 0 ? 'text-gray-400' :
                        passwordStrength === 1 ? 'text-red-400' :
                        passwordStrength === 2 ? 'text-orange-400' :
                        passwordStrength === 3 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Password Requirements */}
              <div className="mb-6 space-y-2">
                {[
                  { text: "At least 8 characters", met: form.password.length >= 8 },
                  { text: "One uppercase letter", met: /[A-Z]/.test(form.password) },
                  { text: "One number", met: /[0-9]/.test(form.password) },
                  { text: "One special character", met: /[^A-Za-z0-9]/.test(form.password) }
                ].map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle 
                      size={16} 
                      className={req.met ? "text-green-500" : "text-gray-600"} 
                    />
                    <span className={`text-xs ${req.met ? "text-green-400" : "text-gray-500"}`}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Register Button */}
              <button
                onClick={register}
                disabled={!form.name.trim() || !form.email.trim() || !form.password.trim() || isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 
                  hover:from-purple-500 hover:to-indigo-500 disabled:from-gray-700 disabled:to-gray-800
                  text-white rounded-xl font-semibold transition-all duration-300
                  flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105
                  disabled:cursor-not-allowed disabled:hover:scale-100
                  border border-purple-500/30 hover:border-purple-400/50 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
                ) : (
                  <UserPlus size={20} className="relative z-10" />
                )}
                <span className="relative z-10">
                  {isLoading ? "Creating Account..." : "Create Account"}
                </span>
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-700/50"></div>
                <span className="px-4 text-gray-500 text-sm">Already registered?</span>
                <div className="flex-1 border-t border-gray-700/50"></div>
              </div>

              {/* Login Link */}
              <Link 
                to="/" 
                className="w-full h-12 bg-gray-800/50 hover:bg-gray-700/60
                  border border-gray-600/50 hover:border-gray-500/70
                  text-gray-300 hover:text-white rounded-xl font-semibold
                  transition-all duration-300 flex items-center justify-center gap-3
                  shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <LogIn size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                <span>Sign In to Existing Account</span>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Join thousands of researchers using AI-powered insights
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, -10px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, 10px) rotate(-180deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(8px, -8px) rotate(90deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 10s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}