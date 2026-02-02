
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Star, Zap, Crown, Loader2 } from "lucide-react";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

const PLANS = [
    {
        id: "free",
        name: "Free Starter",
        price: 0,
        features: ["20 URLs per day", "10 Queries per chat", "Basic Support"],
        icon: Star,
        color: "from-blue-400 to-cyan-400"
    },
    {
        id: "pro",
        name: "Pro Researcher",
        price: 999,
        features: ["10 URLs per day", "20 Queries per chat", "Priority Support", "No Ads"],
        icon: Zap,
        color: "from-purple-400 to-pink-400",
        popular: true
    },
    {
        id: "expert",
        name: "Expert Analyst",
        price: 2499,
        features: ["100 URLs per day", "100 Queries per chat", "24/7 Support", "API Access"],
        icon: Crown,
        color: "from-amber-400 to-orange-400"
    }
];

export default function PaymentPage() {
    const navigate = useNavigate();
    const { token, user, checkAuth } = useAuthStore();
    const [loading, setLoading] = useState("");

    const handleSelectPlan = async (plan) => {
        if (plan.id === "free") {
            setLoading("Activating Free Plan...");
            // Call api to set plan to free (if not already)
            try {
                await api.post("/payment/free", {}, { headers: { Authorization: `Bearer ${token}` } });
                await checkAuth(); // refresh user
                navigate("/dashboard");
            } catch (e) {
                console.error(e);
                setLoading("");
            }
            return;
        }

        // Razorpay Logic (Mock for now or partial implementation)
        // Needs backend endpoint /payment/order
        try {
            setLoading(`Processing ${plan.name}...`);
            const { data: order } = await api.post("/payment/order", { planId: plan.id }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY, // User needs to provide this
                amount: order.amount,
                currency: order.currency,
                name: "PrashnaAI",
                description: `Subscription for ${plan.name}`,
                order_id: order.id,
                handler: async function (response) {
                    // Verify payment
                    try {
                        await api.post("/payment/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            planId: plan.id
                        }, { headers: { Authorization: `Bearer ${token}` } });

                        await checkAuth();
                        navigate("/dashboard");
                    } catch (error) {
                        alert("Payment Verification Failed");
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
            setLoading("");

        } catch (err) {
            console.error("Payment Error", err);
            setLoading("");
            alert("Failed to initiate payment. Make sure Razorpay details are configured.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Choose Your Research Plan</h1>
                <p className="text-gray-400 text-lg">
                    Unlock the full potential of AI-powered research. Select a plan that fits your needs.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
                {PLANS.map((plan) => {
                    const Icon = plan.icon;
                    return (
                        <div
                            key={plan.id}
                            className={`relative bg-gray-800/50 backdrop-blur-xl border 
                    ${plan.popular ? 'border-purple-500/50 shadow-purple-500/20 shadow-xl scale-105 z-10' : 'border-gray-700 hover:border-gray-600'} 
                    rounded-3xl p-8 flex flex-col transition-all duration-300 hover:transform hover:scale-[1.02]`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 shadow-lg`}>
                                <Icon size={28} className="text-white" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold text-white">₹{plan.price}</span>
                                <span className="text-gray-500">/month</span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <Check size={12} className="text-green-400" />
                                        </div>
                                        <span className="text-sm">{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSelectPlan(plan)}
                                disabled={!!loading}
                                className={`w-full py-4 rounded-xl font-bold transition-all duration-300
                            ${plan.id === 'free'
                                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                        : `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl hover:opacity-90`
                                    }
                            disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
                        `}
                            >
                                {loading && loading.includes(plan.name) ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : (
                                    "Get Started"
                                )}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
