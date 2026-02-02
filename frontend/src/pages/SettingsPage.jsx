
import { useState } from "react";
import { User, Mail, CreditCard, Save, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import api from "../api/axios";
import AppLayout from "../layouts/AppLayout";

export default function SettingsPage() {
    const navigate = useNavigate();
    const { user, token, checkAuth } = useAuthStore();

    const [name, setName] = useState(user?.name || "");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put("/auth/profile", { name }, { headers: { Authorization: `Bearer ${token}` } });
            await checkAuth();
            setSuccess("Profile updated successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-900 text-white p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-3xl font-bold">Settings</h1>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Profile Section */}
                        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <User className="text-blue-400" size={24} />
                                <h2 className="text-xl font-bold">Personal Information</h2>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-12 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Email Address</label>
                                    <div className="relative opacity-50 cursor-not-allowed">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="email"
                                            value={user?.email}
                                            disabled
                                            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-12 py-3"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                    Save Changes
                                </button>

                                {success && (
                                    <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm">
                                        {success}
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Subscription Section */}
                        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard className="text-purple-400" size={24} />
                                <h2 className="text-xl font-bold">Subscription Plan</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
                                    <p className="text-gray-400 text-sm mb-1">Current Plan</p>
                                    <h3 className="text-2xl font-bold text-white capitalize">{user?.plan || "Free"}</h3>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {user?.plan === 'free' ? 'Basic features for personal use' : 'Premium features unlocked'}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Daily URL Limit</span>
                                        <span className="text-white">{user?.dailyURLCount || 0} / {
                                            user?.plan === 'expert' ? 100 : user?.plan === 'pro' ? 10 : 20
                                        }</span>
                                    </div>
                                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500"
                                            style={{
                                                width: `${Math.min(((user?.dailyURLCount || 0) / (user?.plan === 'expert' ? 100 : user?.plan === 'pro' ? 10 : 20)) * 100, 100)}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate("/payment")}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-xl font-bold shadow-lg transition-all transform hover:scale-[1.02]"
                                >
                                    Upgrade Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
