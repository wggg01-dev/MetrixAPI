import { useState } from "react";
import { Phone, ArrowLeft, ChevronRight, Info } from "lucide-react";

interface PhoneScreenProps {
  onNext: (phone: string) => void;
  onBack: () => void;
}

export function PhoneScreen({ onNext, onBack }: PhoneScreenProps) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (phone.length < 10) {
      setError("Please enter a valid 11-digit phone number");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNext(phone);
    }, 1200);
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    setPhone(digits);
    if (error) setError("");
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">Smartmonie</h1>
        </div>

        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">BVN Phone Verification</h2>
            <p className="text-sm text-muted-foreground">
              Enter the phone number linked to your Bank Verification Number (BVN)
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
              <div className={`flex items-center gap-3 border-2 rounded-2xl px-4 py-3.5 transition-all ${error ? "border-destructive bg-destructive/5" : phone ? "border-primary bg-primary/5" : "border-border bg-secondary/30"}`}>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-sm font-semibold">🇳🇬</span>
                  <span className="text-sm text-muted-foreground">+234</span>
                </div>
                <div className="w-px h-5 bg-border" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => formatPhone(e.target.value)}
                  placeholder="08012345678"
                  className="flex-1 bg-transparent text-base font-medium outline-none placeholder:text-muted-foreground/50"
                  autoFocus
                />
                {phone.length === 11 && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              {error && (
                <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  {error}
                </p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex gap-2">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                This must be the same number registered with NIBSS at the time of your BVN enrollment.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={phone.length < 10 || isLoading}
              className="w-full gradient-primary text-white font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify & Continue
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
