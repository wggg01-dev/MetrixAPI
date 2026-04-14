import { useState } from "react";
import { Shield, Fingerprint, Eye, Zap } from "lucide-react";
import { FaceScanner } from "../components/FaceScanner";

interface AuthorizeScreenProps {
  onNext: () => void;
}

export function AuthorizeScreen({ onNext }: AuthorizeScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState<"idle" | "scanning" | "done">("idle");

  const handleAuthorize = () => {
    setIsScanning(true);
    setStatus("scanning");
  };

  const handleScanComplete = () => {
    setStatus("done");
    setTimeout(onNext, 800);
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Smartmonie</h1>
          </div>
          <p className="text-blue-200 text-sm">Biometric Merchant Payments</p>
        </div>

        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 mb-4">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Secure Payment</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Identity Verification</h2>
            <p className="text-sm text-muted-foreground">
              Position your face within the frame for biometric authentication
            </p>
          </div>

          <div className="mb-8">
            <FaceScanner isScanning={isScanning} onComplete={handleScanComplete} />
          </div>

          <div className="mt-10 space-y-3">
            {status === "idle" && (
              <button
                onClick={handleAuthorize}
                className="w-full gradient-primary text-white font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Authorize Payment
              </button>
            )}
            {status === "scanning" && (
              <div className="w-full bg-primary/10 border border-primary/30 text-primary font-semibold py-4 rounded-2xl flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Scanning Face...
              </div>
            )}
            {status === "done" && (
              <div className="w-full bg-green-500/10 border border-green-500/30 text-green-600 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 animate-bounce-in">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Face Verified!
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            {[{ icon: Shield, label: "256-bit SSL" }, { icon: Eye, label: "Biometric" }, { icon: Fingerprint, label: "Encrypted" }].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-blue-200/60 text-xs mt-6">
          Powered by Smartmonie · Processed by Metrix
        </p>
      </div>
    </div>
  );
}
