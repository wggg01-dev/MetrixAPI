import { useState } from "react";
import { User, Phone, Calendar, CreditCard, Hash, Mail, ChevronRight, ArrowLeft, Shield, Eye, EyeOff } from "lucide-react";
import { USER_BVN_DATA } from "../data/banks";

interface UserDetailsScreenProps {
  onNext: () => void;
  onBack: () => void;
}

function MaskedField({ label, value, icon: Icon, masked, color = "text-foreground" }: { label: string; value: string; icon: any; masked?: boolean; color?: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-xl">
      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className={`text-sm font-semibold ${color} font-mono`}>{value}</p>
      </div>
      {masked && (
        <div className="flex items-center gap-1 text-xs text-primary">
          <Shield className="w-3 h-3" />
          <span>Protected</span>
        </div>
      )}
    </div>
  );
}

export function UserDetailsScreen({ onNext, onBack }: UserDetailsScreenProps) {
  const data = USER_BVN_DATA;

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">Smartmonie</h1>
        </div>

        <div className="glass-card rounded-3xl p-6 shadow-2xl">
          <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-6">
            <div className="relative inline-block mb-3">
              <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 mx-auto">
                <span className="text-3xl font-bold text-white">
                  {data.fullName.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-bold text-foreground">{data.fullName}</h2>
            <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 rounded-full px-3 py-1 text-xs font-medium mt-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              BVN Verified
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <MaskedField
              label="Phone Number"
              value={data.phone}
              icon={Phone}
              masked
            />
            <MaskedField
              label="Date of Birth"
              value={data.maskedDob}
              icon={Calendar}
              masked
            />
            <MaskedField
              label="BVN Number"
              value={`${data.bvn.slice(0, 3)}XXXXX${data.bvn.slice(-3)}`}
              icon={CreditCard}
              masked
            />
            <MaskedField
              label="NIN"
              value={data.nin}
              icon={Hash}
              masked
            />
            <MaskedField
              label="Email Address"
              value={data.email}
              icon={Mail}
              masked
            />
            <MaskedField
              label="Gender"
              value={data.gender}
              icon={User}
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 flex gap-2">
            <Shield className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              Sensitive information is masked to protect your privacy. Only you can authorize payments with your biometrics.
            </p>
          </div>

          <button
            onClick={onNext}
            className="w-full gradient-primary text-white font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Proceed to Select Bank
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
