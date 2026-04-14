import { useState } from "react";
import { ArrowLeft, ChevronRight, DollarSign, FileText, Info } from "lucide-react";
import { type Bank } from "../data/banks";

interface AmountScreenProps {
  bank: Bank;
  onNext: (amount: string, narration: string) => void;
  onBack: () => void;
}

export function AmountScreen({ bank, onNext, onBack }: AmountScreenProps) {
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [error, setError] = useState("");

  const formatAmount = (val: string) => {
    const digits = val.replace(/\D/g, "");
    setAmount(digits);
    if (error) setError("");
  };

  const displayAmount = amount
    ? Number(amount).toLocaleString("en-NG")
    : "";

  const handleSubmit = () => {
    if (!amount || Number(amount) < 100) {
      setError("Minimum amount is ₦100");
      return;
    }
    if (Number(amount) > 5000000) {
      setError("Maximum single transaction is ₦5,000,000");
      return;
    }
    setError("");
    onNext(amount, narration);
  };

  const quickAmounts = [5000, 10000, 20000, 50000];

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

        <div className="glass-card rounded-3xl p-6 shadow-2xl">
          <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-5 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-foreground mb-1">Enter Amount</h2>
            <p className="text-sm text-muted-foreground">Payment from your {bank.name} account</p>
          </div>

          <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: bank.color }}>
              {bank.logo}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{bank.name}</p>
              <p className="text-xs text-muted-foreground">Sort code: {bank.code}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Amount (₦)</label>
              <div className={`flex items-center gap-3 border-2 rounded-2xl px-4 py-3.5 transition-all ${error ? "border-destructive bg-destructive/5" : amount ? "border-primary bg-primary/5" : "border-border bg-secondary/30"}`}>
                <span className="text-xl font-bold text-muted-foreground">₦</span>
                <input
                  type="tel"
                  value={displayAmount}
                  onChange={(e) => formatAmount(e.target.value.replace(/,/g, ""))}
                  placeholder="0.00"
                  className="flex-1 bg-transparent text-2xl font-bold outline-none placeholder:text-muted-foreground/30 placeholder:font-normal placeholder:text-xl"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  {error}
                </p>
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              {quickAmounts.map((qa) => (
                <button
                  key={qa}
                  onClick={() => { setAmount(String(qa)); setError(""); }}
                  className={`flex-1 min-w-0 py-2 px-3 rounded-xl text-sm font-semibold border-2 transition-all ${amount === String(qa) ? "border-primary bg-primary text-white" : "border-border bg-white hover:border-primary/50 text-foreground"}`}
                >
                  ₦{(qa / 1000).toFixed(0)}k
                </button>
              ))}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                Narration <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
                placeholder="e.g. Payment for goods and services"
                rows={2}
                maxLength={100}
                className="w-full border-2 border-border bg-secondary/30 rounded-2xl px-4 py-3 text-sm outline-none resize-none focus:border-primary focus:bg-primary/5 transition-all placeholder:text-muted-foreground/50"
              />
              <p className="text-xs text-muted-foreground text-right">{narration.length}/100</p>
            </div>

            {amount && Number(amount) >= 100 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 animate-fade-up">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Amount</span>
                  <span className="font-semibold text-blue-900">₦{Number(amount).toLocaleString("en-NG")}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-blue-700">Transaction fee</span>
                  <span className="font-semibold text-blue-900">₦0.00</span>
                </div>
                <div className="border-t border-blue-200 mt-2 pt-2 flex justify-between">
                  <span className="text-sm font-bold text-blue-900">Total Debit</span>
                  <span className="font-bold text-blue-900">₦{Number(amount).toLocaleString("en-NG")}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!amount || Number(amount) < 100}
              className="w-full gradient-primary text-white font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              Confirm with Biometric
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
