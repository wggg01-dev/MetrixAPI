import { useState } from "react";
import { ArrowLeft, Shield, Fingerprint } from "lucide-react";
import { FingerprintScanner } from "../components/FingerprintScanner";
import { type Bank } from "../data/banks";

interface BiometricConfirmScreenProps {
  bank: Bank;
  amount: string;
  narration: string;
  onNext: () => void;
  onBack: () => void;
}

export function BiometricConfirmScreen({ bank, amount, narration, onNext, onBack }: BiometricConfirmScreenProps) {
  const [status, setStatus] = useState<"idle" | "scanning" | "done">("idle");

  const handleScan = () => {
    setStatus("scanning");
  };

  const handleComplete = () => {
    setStatus("done");
    setTimeout(onNext, 800);
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">Smartmonie</h1>
        </div>

        <div className="glass-card rounded-3xl p-6 shadow-2xl">
          <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-5 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Biometric Confirmation</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">Confirm Payment</h2>
            <p className="text-sm text-muted-foreground">Authenticate with your fingerprint to complete payment</p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Bank</span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded text-white text-xs font-bold flex items-center justify-center" style={{ backgroundColor: bank.color, fontSize: "8px" }}>
                  {bank.logo.slice(0, 2)}
                </div>
                <span className="text-sm font-semibold text-foreground">{bank.name.split(" ").slice(0, 2).join(" ")}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-xl font-bold text-foreground">₦{Number(amount).toLocaleString("en-NG")}</span>
            </div>
            {narration && (
              <div className="flex justify-between items-start gap-3">
                <span className="text-sm text-muted-foreground flex-shrink-0">Narration</span>
                <span className="text-sm font-medium text-foreground text-right">{narration}</span>
              </div>
            )}
            <div className="border-t border-primary/10 pt-2 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Transaction Fee</span>
              <span className="text-sm font-semibold text-green-600">FREE</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mb-6">
            <FingerprintScanner isScanning={status === "scanning"} onComplete={handleComplete} />

            {status === "idle" && (
              <p className="text-sm text-muted-foreground text-center">Press the button below to authenticate</p>
            )}
            {status === "scanning" && (
              <p className="text-sm text-primary font-medium animate-pulse text-center">Hold your finger on the sensor...</p>
            )}
            {status === "done" && (
              <p className="text-sm text-green-600 font-semibold text-center animate-bounce-in">Fingerprint Verified!</p>
            )}
          </div>

          {status === "idle" && (
            <button
              onClick={handleScan}
              className="w-full gradient-primary text-white font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Fingerprint className="w-5 h-5" />
              Confirm with Fingerprint
            </button>
          )}

          {status === "scanning" && (
            <div className="w-full bg-primary/10 border border-primary/30 text-primary font-semibold py-4 rounded-2xl flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Verifying Fingerprint...
            </div>
          )}

          {status === "done" && (
            <div className="w-full bg-green-500/10 border border-green-500/30 text-green-600 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 animate-bounce-in">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Processing Payment...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
