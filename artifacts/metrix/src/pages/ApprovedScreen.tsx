import { useEffect, useState } from "react";
import { CheckCircle, ChevronRight, Trophy, Star, MessageCircle, Phone } from "lucide-react";
import { type Bank } from "../data/banks";
import { USER_BVN_DATA } from "../data/banks";

interface ApprovedScreenProps {
  bank: Bank;
  amount: string;
  onNext: () => void;
}

export function ApprovedScreen({ bank, amount, onNext }: ApprovedScreenProps) {
  const [showContent, setShowContent] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; color: string; size: number; delay: number }[]>([]);

  const cashback = Math.round(Number(amount) * 0.015);

  useEffect(() => {
    const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];
    const ps = Array.from({ length: 20 }, (_, i) => ({
      x: 10 + Math.random() * 80,
      y: Math.random() * 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 8,
      delay: Math.random() * 0.5,
    }));
    setParticles(ps);
    setTimeout(() => setShowContent(true), 400);
  }, []);

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-sm"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animation: `confetti-fall 1.5s ease-in ${p.delay}s both`,
              transform: "rotate(45deg)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-md">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Smartmonie</h1>
          </div>
        </div>

        <div className={`glass-card rounded-3xl p-8 shadow-2xl transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-6">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" style={{ animationDuration: "2s" }} />
              <div className="absolute inset-0 rounded-full bg-green-500/10 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
              <div className={`relative w-full h-full bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/40 transition-all duration-500 ${showContent ? "scale-100" : "scale-0"}`}>
                <CheckCircle className="w-14 h-14 text-white" />
              </div>
            </div>

            <div className={`transition-all duration-500 delay-200 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <h2 className="text-2xl font-bold text-foreground mb-1">Payment Approved!</h2>
              <p className="text-3xl font-bold text-green-600 mt-2">₦{Number(amount).toLocaleString("en-NG")}</p>
              <p className="text-sm text-muted-foreground mt-1">Successfully debited from {bank.name}</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">Processed by VaultX</p>
            </div>
          </div>

          <div className={`bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-4 mb-6 transition-all duration-500 delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">1.5% Cashback Earned!</span>
                </div>
                <p className="text-sm font-bold text-amber-900 leading-snug">
                  Congratulations, you've received{" "}
                  <span className="text-amber-600">₦{cashback.toLocaleString("en-NG")}</span>{" "}
                  cashback for all purchases.
                </p>
                <p className="text-xs text-amber-700 mt-1">Credited to your Smartmonie wallet instantly!</p>
              </div>
            </div>
          </div>

          <div className={`space-y-3 transition-all duration-500 delay-400 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <button
              onClick={onNext}
              className="w-full gradient-primary text-white font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              View & Print Receipt
              <ChevronRight className="w-5 h-5" />
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Receipt automatically sent to your email
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="flex items-center gap-1.5 bg-green-500/10 text-green-700 rounded-full px-3 py-1">
                <MessageCircle className="w-3 h-3" />
                <span className="text-xs font-medium">WhatsApp</span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-500/10 text-blue-700 rounded-full px-3 py-1">
                <Phone className="w-3 h-3" />
                <span className="text-xs font-medium">SMS</span>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground/70 mt-1">
              Also sent via WhatsApp &amp; SMS to {USER_BVN_DATA.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
