import { useState, useMemo } from "react";
import { Printer, CheckCircle, Home, Trophy, Zap } from "lucide-react";
import { type Bank } from "../data/banks";
import { USER_BVN_DATA, PURCHASE_ITEMS } from "../data/banks";

interface ReceiptScreenProps {
  bank: Bank;
  amount: string;
  narration: string;
  onDone: () => void;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-NG", { day: "2-digit", month: "long", year: "numeric" });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function generateRef() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return "SMN" + Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function ReceiptScreen({ bank, amount, narration, onDone }: ReceiptScreenProps) {
  const [txDate] = useState(new Date());
  const [txRef] = useState(generateRef());
  const [isPrinting, setIsPrinting] = useState(false);

  const enteredAmount = Number(amount);

  const processingFee = Math.round(enteredAmount * 0.005);
  const cashback = Math.round(enteredAmount * 0.015);
  const totalCharged = enteredAmount + processingFee - cashback;

  const baseSubtotal = PURCHASE_ITEMS.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const scaleFactor = enteredAmount / baseSubtotal;

  const scaledItems = useMemo(() => {
    return PURCHASE_ITEMS.map((item) => ({
      ...item,
      scaledUnitPrice: Math.round(item.unitPrice * scaleFactor),
      scaledLineTotal: Math.round(item.qty * item.unitPrice * scaleFactor),
    }));
  }, [enteredAmount]);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 300);
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-start p-4 pb-12 relative overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md pt-4">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-md">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Smartmonie</h1>
          </div>
        </div>

        <div className="no-print flex gap-2 mb-4">
          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex-1 gradient-primary text-white font-semibold py-3 rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            {isPrinting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Printer className="w-4 h-4" />
            )}
            Print Receipt
          </button>
          <button
            onClick={onDone}
            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-sm border border-white/30"
          >
            <Home className="w-4 h-4" />
            Done
          </button>
        </div>

        <div className="receipt-container receipt-paper rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-fade-up">

          {/* Header */}
          <div className="gradient-primary px-6 py-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">SMARTMONIE</span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-3">
              <Zap className="w-3 h-3 text-blue-200" />
              <p className="text-blue-200 text-xs font-medium">Processed by VaultX</p>
            </div>
            <p className="text-blue-100 text-xs font-medium uppercase tracking-widest mb-2">Payment Receipt</p>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <p className="text-white text-2xl font-bold">₦{enteredAmount.toLocaleString("en-NG")}</p>
              <p className="text-blue-100 text-xs mt-0.5">Amount Paid for Goods</p>
            </div>
          </div>

          {/* Status & Date */}
          <div className="px-6 py-4 border-b border-dashed border-gray-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-bold text-green-700">APPROVED</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Date & Time</p>
                <p className="text-xs font-semibold text-gray-800 mt-0.5">{formatDate(txDate)}</p>
                <p className="text-xs text-gray-600">{formatTime(txDate)}</p>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="px-6 py-3 border-b border-dashed border-gray-300 space-y-2">
            {[
              { label: "Transaction Ref", value: txRef },
              { label: "Merchant", value: "Smartmonie Merchant Store" },
              { label: "Payment Processor", value: "VaultX Payments Ltd" },
              { label: "Terminal ID", value: "SMN-TRM-00124" },
              { label: "Bank", value: bank.name },
              { label: "Account", value: "XXXX XXXX XX45" },
              { label: "Payment Method", value: "Biometric (BVN)" },
              { label: "Narration", value: narration || "Payment for goods" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-start gap-3">
                <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
                <span className="text-xs font-semibold text-gray-800 text-right break-all">{value}</span>
              </div>
            ))}
          </div>

          {/* Customer Info */}
          <div className="px-6 py-3 border-b border-dashed border-gray-300">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Customer Information</p>
            {[
              { label: "Name", value: USER_BVN_DATA.fullName },
              { label: "Phone", value: USER_BVN_DATA.phone },
              { label: "Email", value: USER_BVN_DATA.email },
              { label: "BVN Status", value: "Verified ✓" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center mb-1.5">
                <span className="text-xs text-gray-500">{label}</span>
                <span className="text-xs font-semibold text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          {/* Items — scaled to match entered amount */}
          <div className="px-6 py-3 border-b border-dashed border-gray-300">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Items Purchased</p>
            <div>
              <div className="flex text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">
                <span className="flex-1">Item</span>
                <span className="w-8 text-center">Qty</span>
                <span className="w-20 text-right">Unit</span>
                <span className="w-24 text-right">Amount</span>
              </div>
              {scaledItems.map((item, i) => (
                <div key={i} className="py-2 border-b border-gray-100">
                  <div className="flex items-start gap-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 leading-tight">{item.name}</p>
                      <p className="text-xs text-gray-400 font-mono">{item.sku}</p>
                    </div>
                    <span className="w-8 text-center text-xs text-gray-600 pt-0.5">{item.qty}</span>
                    <span className="w-20 text-right text-xs text-gray-600 pt-0.5">₦{item.scaledUnitPrice.toLocaleString()}</span>
                    <span className="w-24 text-right text-xs font-semibold text-gray-800 pt-0.5">₦{item.scaledLineTotal.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals — all derived from entered amount */}
          <div className="px-6 py-3 border-b border-dashed border-gray-300 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Amount for Goods</span>
              <span className="text-xs font-semibold text-gray-800">₦{enteredAmount.toLocaleString("en-NG")}</span>
            </div>

            {/* VaultX 0.5% Processing Fee */}
            <div className="flex justify-between items-center bg-blue-50 border border-blue-100 rounded-lg px-2 py-1.5">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-blue-700 font-semibold">VaultX Processing Fee (0.5%)</span>
              </div>
              <span className="text-xs font-bold text-blue-700">+₦{processingFee.toLocaleString("en-NG")}</span>
            </div>

            {/* Smartmonie 1.5% Cashback */}
            <div className="flex justify-between items-center bg-amber-50 border border-amber-100 rounded-lg px-2 py-1.5">
              <div className="flex items-center gap-1">
                <Trophy className="w-3 h-3 text-amber-500" />
                <span className="text-xs text-amber-700 font-semibold">Smartmonie Cashback (1.5%)</span>
              </div>
              <span className="text-xs font-bold text-amber-700">−₦{cashback.toLocaleString("en-NG")}</span>
            </div>

            <div className="flex justify-between items-center border-t-2 border-gray-300 pt-2">
              <span className="text-sm font-bold text-gray-800">TOTAL CHARGED</span>
              <span className="text-sm font-bold text-gray-900">₦{totalCharged.toLocaleString("en-NG")}</span>
            </div>
          </div>

          {/* Cashback Banner */}
          <div className="px-6 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-dashed border-gray-300">
            <div className="flex items-start gap-2">
              <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-800">Congratulations!</p>
                <p className="text-xs text-amber-700">
                  You've received <span className="font-bold">₦{cashback.toLocaleString("en-NG")}</span> (1.5% of ₦{enteredAmount.toLocaleString("en-NG")}) cashback. Credited to your Smartmonie wallet.
                </p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="px-6 py-4 text-center">
            <div className="w-24 h-24 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-5 gap-0.5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-sm"
                    style={{ backgroundColor: Math.random() > 0.5 ? "#1e3a8a" : "transparent" }}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500">Scan QR to verify receipt</p>
            <p className="text-xs font-mono text-gray-400 mt-1">{txRef}</p>
          </div>

          {/* Footer */}
          <div className="bg-gray-800 px-6 py-4 text-center">
            <p className="text-xs font-semibold text-gray-300">Smartmonie</p>
            <p className="text-xs text-gray-400 mt-0.5">Payment processed by VaultX Payments Ltd</p>
            <div className="border-t border-gray-700 mt-2 pt-2">
              <p className="text-xs text-gray-500">www.smartmonie.ng | support@smartmonie.ng</p>
              <p className="text-xs text-gray-600 mt-0.5">Licensed by CBN · NDIC Insured · Powered by VaultX</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 no-print space-y-1">
          <p className="text-blue-200/60 text-xs">Receipt automatically emailed to {USER_BVN_DATA.email}</p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 bg-green-500/20 text-green-300 rounded-full px-3 py-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span className="text-xs font-medium">WhatsApp</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-500/20 text-blue-300 rounded-full px-3 py-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .91h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.12a16 16 0 006 6l.38-.38a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              <span className="text-xs font-medium">SMS</span>
            </div>
          </div>
          <p className="text-blue-200/50 text-xs">Also sent via WhatsApp &amp; SMS to {USER_BVN_DATA.phone}</p>
        </div>
      </div>
    </div>
  );
}
