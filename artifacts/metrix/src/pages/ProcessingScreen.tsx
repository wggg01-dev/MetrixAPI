import { useEffect, useState } from "react";
import { Wifi, CreditCard, CheckCircle, Loader2, Zap } from "lucide-react";

interface ProcessingScreenProps {
  amount: string;
  onNext: () => void;
}

export function ProcessingScreen({ amount, onNext }: ProcessingScreenProps) {
  const [step, setStep] = useState(0);

  const steps = [
    { label: "Initiating secure transaction", icon: Wifi, duration: 800 },
    { label: "Debiting your account", icon: CreditCard, duration: 1000 },
    { label: "Crediting merchant account", icon: Zap, duration: 900 },
    { label: "Transaction confirmed", icon: CheckCircle, duration: 700 },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let total = 0;
    steps.forEach((s, i) => {
      timers.push(setTimeout(() => setStep(i + 1), total));
      total += s.duration;
    });
    timers.push(setTimeout(onNext, total + 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  const dots = [0, 1, 2];

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md animate-fade-up">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-md">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Smartmonie</h1>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="relative w-28 h-28 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
              <div className="absolute inset-3 rounded-full border-2 border-primary/30" />
              <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-primary/60 animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="gradient-primary w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-primary/40">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-1">Processing Payment</h2>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-lg font-bold text-primary">₦{Number(amount).toLocaleString("en-NG")}</span>
            </div>
            <div className="flex justify-center gap-1 mt-3">
              {dots.map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isDone = step > i + 1;
              const isActive = step === i + 1;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                    isDone ? "bg-green-50 border border-green-200" :
                    isActive ? "bg-primary/10 border border-primary/30" :
                    "bg-muted/30 border border-transparent"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isDone ? "bg-green-500" :
                    isActive ? "bg-primary" :
                    "bg-muted"
                  }`}>
                    {isDone ? (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : isActive ? (
                      <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                    ) : (
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    isDone ? "text-green-700" :
                    isActive ? "text-primary" :
                    "text-muted-foreground"
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>

          <p className="text-center text-xs text-muted-foreground mt-3">
            Please do not close this window
          </p>
        </div>
      </div>
    </div>
  );
}
