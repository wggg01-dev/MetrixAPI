import { useEffect, useState } from "react";
import { Database, Shield, CheckCircle, Loader2 } from "lucide-react";

interface AuthenticatingScreenProps {
  onNext: () => void;
}

export function AuthenticatingScreen({ onNext }: AuthenticatingScreenProps) {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Connecting to NIBSS database", icon: Database, duration: 900 },
    { label: "Verifying BVN credentials", icon: Shield, duration: 1100 },
    { label: "Fetching account details", icon: Database, duration: 900 },
    { label: "Authentication successful", icon: CheckCircle, duration: 600 },
  ];

  useEffect(() => {
    let current = 0;
    let total = 0;
    steps.forEach((s, i) => {
      setTimeout(() => setStep(i + 1), total);
      total += s.duration;
    });
    setTimeout(onNext, total + 400);
  }, []);

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">Smartmonie</h1>
        </div>

        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-ping" />
              <div className="absolute inset-2 rounded-full gradient-primary opacity-30 animate-ping" style={{ animationDelay: "0.3s" }} />
              <div className="relative w-full h-full gradient-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40">
                <Database className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">Authenticating User Data</h2>
            <p className="text-sm text-muted-foreground">Please wait while we securely verify your identity</p>
          </div>

          <div className="space-y-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isDone = step > i + 1;
              const isActive = step === i + 1;
              const isPending = step < i + 1;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                    isDone ? "bg-green-50 border border-green-200" :
                    isActive ? "bg-primary/10 border border-primary/30" :
                    "bg-muted/30 border border-transparent"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isDone ? "bg-green-500" :
                    isActive ? "bg-primary" :
                    "bg-muted"
                  }`}>
                    {isDone ? (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : isActive ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : (
                      <Icon className="w-4 h-4 text-muted-foreground" />
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

          <div className="mt-6 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            {step < steps.length ? "Establishing secure connection..." : "Authentication complete"}
          </p>
        </div>
      </div>
    </div>
  );
}
