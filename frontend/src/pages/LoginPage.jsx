// import { useState } from "react";
// import api from "../api/axios";
// import { useAuthStore } from "../store/authStore";
// import { Link, useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const { setToken } = useAuthStore();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async () => {
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       setToken(res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-200">
//       <div className="p-8 bg-white shadow-xl rounded-xl w-96">
//         <h1 className="text-2xl font-bold mb-4">Login</h1>

//         <input
//           className="w-full p-2 border rounded mb-3"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           className="w-full p-2 border rounded mb-3"
//           placeholder="Password"
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={login}
//           className="w-full bg-blue-600 text-white py-2 rounded mt-2"
//         >
//           Login
//         </button>

//         <p className="text-center mt-3 text-sm">
//           No account? <Link to="/register" className="text-blue-600">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, Eye, EyeOff, Sparkles, UserPlus } from "lucide-react";

export default function LoginPage() {
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    if (!email.trim() || !password.trim()) return;

    try {
      setIsLoading(true);
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <>
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-indigo-500/15 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-full blur-3xl animate-float-fast"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="flex justify-center items-center min-h-screen p-6">
        {/* Main Login Card */}
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Sparkles size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                PrashnaAI
              </h1>
            </div>
            <p className="text-gray-400 text-lg">Welcome back to your research assistant</p>
          </div>

          {/* Login Form */}
          <div className="bg-gray-900/60 backdrop-blur-2xl border border-gray-700/50 rounded-3xl shadow-2xl shadow-black/50 p-8">
            {/* Card Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2 text-center">Sign In</h2>
              <p className="text-gray-400 text-center mb-8">Enter your credentials to continue</p>

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
                      focus:outline-none focus:border-blue-500/70 focus:bg-gray-800/90
                      transition-all duration-300 font-normal
                      focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    type="email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
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
                      focus:outline-none focus:border-blue-500/70 focus:bg-gray-800/90
                      transition-all duration-300 font-normal
                      focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>

              {/* Login Button */}
              <button
                onClick={login}
                disabled={!email.trim() || !password.trim() || isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 
                  hover:from-blue-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-800
                  text-white rounded-xl font-semibold transition-all duration-300
                  flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105
                  disabled:cursor-not-allowed disabled:hover:scale-100
                  border border-blue-500/30 hover:border-blue-400/50 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
                ) : (
                  <LogIn size={20} className="relative z-10" />
                )}
                <span className="relative z-10">
                  {isLoading ? "Signing In..." : "Sign In"}
                </span>
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-700/50"></div>
                <span className="px-4 text-gray-500 text-sm">New to PrashnaAI?</span>
                <div className="flex-1 border-t border-gray-700/50"></div>
              </div>

              {/* Register Link */}
              <Link 
                to="/register" 
                className="w-full h-12 bg-gray-800/50 hover:bg-gray-700/60
                  border border-gray-600/50 hover:border-gray-500/70
                  text-gray-300 hover:text-white rounded-xl font-semibold
                  transition-all duration-300 flex items-center justify-center gap-3
                  shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <UserPlus size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                <span>Create New Account</span>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Secure AI-powered research platform
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