import { useState } from "react";
import { CheckCircle, ArrowDownLeft, Fingerprint, Clock, ArrowLeft, X, Zap } from "lucide-react";
import { PENDING_PAYMENTS, type PendingPayment } from "../data/payments";
import { FingerprintScanner } from "../components/FingerprintScanner";
import { USER_BVN_DATA } from "../data/banks";

interface ReceivePaymentsScreenProps {
  onBack: () => void;
  onDone: () => void;
}

export function ReceivePaymentsScreen({ onBack, onDone }: ReceivePaymentsScreenProps) {
  const [payments] = useState(PENDING_PAYMENTS);
  const [selected, setSelected] = useState<PendingPayment | null>(null);
  const [approveAllMode, setApproveAllMode] = useState(false);
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "done">("idle");
  const [receivedIds, setReceivedIds] = useState<string[]>([]);

  const pendingPayments = payments.filter(p => !receivedIds.includes(p.id));
  const pendingCount = pendingPayments.length;
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  const handleSelect = (payment: PendingPayment) => {
    setSelected(payment);
    setApproveAllMode(false);
    setScanStatus("idle");
  };

  const handleApproveAll = () => {
    setSelected(null);
    setApproveAllMode(true);
    setScanStatus("idle");
  };

  const handleScan = () => setScanStatus("scanning");

  const handleScanComplete = () => {
    setScanStatus("done");
    setTimeout(() => {
      if (approveAllMode) {
        setReceivedIds(payments.map(p => p.id));
        setApproveAllMode(false);
        setScanStatus("idle");
        setTimeout(onDone, 600);
      } else if (selected) {
        setReceivedIds(prev => [...prev, selected.id]);
        setSelected(null);
        setScanStatus("idle");
      }
    }, 1200);
  };

  const dismissModal = () => {
    setSelected(null);
    setApproveAllMode(false);
    setScanStatus("idle");
  };

  const isModalOpen = !!selected || approveAllMode;

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-start p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-60 h-60 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md animate-fade-up pt-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-md">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Smartmonie</h1>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-5 shadow-2xl mb-4">
          <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/15 rounded-2xl flex items-center justify-center">
              <ArrowDownLeft className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Receive Payments</h2>
              <p className="text-xs text-muted-foreground">{USER_BVN_DATA.firstName} {USER_BVN_DATA.lastName}</p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-green-500/8 border border-green-500/20 rounded-2xl px-4 py-3">
            <div>
              <p className="text-xs text-muted-foreground">Total Pending</p>
              <p className="text-2xl font-bold text-foreground">₦{totalPending.toLocaleString("en-NG")}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Payments</p>
              <div className="flex items-center justify-end gap-1">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{pendingCount}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">pending</span>
              </div>
            </div>
          </div>
        </div>

        {pendingCount === 0 ? (
          <div className="glass-card rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">All Payments Received!</h3>
            <p className="text-sm text-muted-foreground mb-6">You've confirmed all pending payments.</p>
            <button
              onClick={onDone}
              className="w-full gradient-primary text-white font-semibold py-3 rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Pending Payments</p>
              <button
                onClick={handleApproveAll}
                className="flex items-center gap-1.5 bg-green-500/20 hover:bg-green-500/30 active:scale-95 text-green-400 border border-green-500/30 rounded-full px-3 py-1 transition-all"
              >
                <Zap className="w-3 h-3" />
                <span className="text-xs font-semibold">Approve All</span>
              </button>
            </div>

            {payments.map((payment) => {
              const isReceived = receivedIds.includes(payment.id);
              return (
                <button
                  key={payment.id}
                  onClick={() => !isReceived && handleSelect(payment)}
                  disabled={isReceived}
                  className={`w-full glass-card rounded-2xl p-4 shadow-lg text-left transition-all duration-200 ${
                    isReceived
                      ? "opacity-50 cursor-default"
                      : "hover:scale-[1.01] active:scale-[0.99] hover:border-green-500/30 border border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: payment.senderBankColor }}
                    >
                      {payment.senderName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground truncate">{payment.senderName}</p>
                        <p className={`text-sm font-bold flex-shrink-0 ${isReceived ? "text-muted-foreground line-through" : "text-green-600"}`}>
                          +₦{payment.amount.toLocaleString("en-NG")}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <p className="text-xs text-muted-foreground truncate">{payment.narration}</p>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {isReceived ? (
                            <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Received
                            </span>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-muted-foreground/60" />
                              <span className="text-xs text-muted-foreground/60">{payment.timeAgo}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground/50 mt-0.5">{payment.senderBank} · {payment.senderPhone}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-card rounded-3xl p-6 shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-foreground">
                {approveAllMode ? "Approve All Payments" : "Confirm Receipt"}
              </h3>
              <button
                onClick={dismissModal}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {approveAllMode ? (
              <div className="bg-green-500/8 border border-green-500/20 rounded-2xl p-4 mb-5">
                <div className="space-y-2 mb-3">
                  {pendingPayments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-white flex-shrink-0 font-bold"
                          style={{ backgroundColor: p.senderBankColor, fontSize: "8px" }}
                        >
                          {p.senderName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="text-sm text-foreground truncate">{p.senderName}</span>
                      </div>
                      <span className="text-sm font-bold text-green-600 flex-shrink-0">+₦{p.amount.toLocaleString("en-NG")}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-green-500/20 pt-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-green-600">+₦{totalPending.toLocaleString("en-NG")}</span>
                </div>
              </div>
            ) : selected ? (
              <div className="bg-green-500/8 border border-green-500/20 rounded-2xl p-4 mb-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: selected.senderBankColor }}
                  >
                    {selected.senderName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{selected.senderName}</p>
                    <p className="text-xs text-muted-foreground">{selected.senderBank}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-green-500/10 pt-3">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-2xl font-bold text-green-600">+₦{selected.amount.toLocaleString("en-NG")}</span>
                </div>
                {selected.narration && (
                  <div className="flex justify-between items-center mt-1.5">
                    <span className="text-xs text-muted-foreground">Narration</span>
                    <span className="text-xs font-medium text-foreground">{selected.narration}</span>
                  </div>
                )}
              </div>
            ) : null}

            <p className="text-center text-sm text-muted-foreground mb-5">
              {approveAllMode
                ? `Scan your fingerprint to receive all ${pendingCount} payments at once`
                : "Scan your fingerprint to confirm you have received this payment"}
            </p>

            <div className="flex flex-col items-center gap-4 mb-5">
              <FingerprintScanner isScanning={scanStatus === "scanning"} onComplete={handleScanComplete} />
              {scanStatus === "idle" && (
                <p className="text-sm text-muted-foreground text-center">Place your finger on the sensor below</p>
              )}
              {scanStatus === "scanning" && (
                <p className="text-sm text-primary font-medium animate-pulse text-center">Scanning your fingerprint...</p>
              )}
              {scanStatus === "done" && (
                <p className="text-sm text-green-600 font-semibold text-center">
                  {approveAllMode ? "All Payments Confirmed!" : "Payment Confirmed!"}
                </p>
              )}
            </div>

            {scanStatus === "idle" && (
              <button
                onClick={handleScan}
                className="w-full gradient-primary text-white font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Fingerprint className="w-5 h-5" />
                {approveAllMode ? `Approve All ${pendingCount} Payments` : "Scan My Fingerprint"}
              </button>
            )}

            {scanStatus === "scanning" && (
              <div className="w-full bg-primary/10 border border-primary/30 text-primary font-semibold py-4 rounded-2xl flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Verifying Fingerprint...
              </div>
            )}

            {scanStatus === "done" && (
              <div className="w-full bg-green-500/10 border border-green-500/30 text-green-600 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {approveAllMode ? "All Payments Received!" : "Payment Received!"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
