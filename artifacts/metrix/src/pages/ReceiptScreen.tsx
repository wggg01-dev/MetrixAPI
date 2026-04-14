import { useState } from "react";
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

  const subtotal = PURCHASE_ITEMS.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const vat = Math.round(subtotal * 0.075);
  const processingFee = Math.round(subtotal * 0.03);
  const cashback = Math.round(subtotal * 0.015);
  const total = subtotal + vat + processingFee - cashback;

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

      <div className="relative z-10 w-full max-w-sm pt-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Smartmonie</h1>
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
              <p className="text-blue-200 text-xs font-medium">Processed by Metrix</p>
            </div>
            <p className="text-blue-100 text-xs font-medium uppercase tracking-widest mb-2">Payment Receipt</p>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <p className="text-white text-2xl font-bold">₦{Number(amount).toLocaleString("en-NG")}</p>
              <p className="text-blue-100 text-xs mt-0.5">Total Amount Paid</p>
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
              { label: "Payment Processor", value: "Metrix Payments Ltd" },
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

          {/* Items */}
          <div className="px-6 py-3 border-b border-dashed border-gray-300">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Items Purchased</p>
            <div>
              <div className="flex text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">
                <span className="flex-1">Item</span>
                <span className="w-8 text-center">Qty</span>
                <span className="w-20 text-right">Unit</span>
                <span className="w-24 text-right">Amount</span>
              </div>
              {PURCHASE_ITEMS.map((item, i) => (
                <div key={i} className="py-2 border-b border-gray-100">
                  <div className="flex items-start gap-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 leading-tight">{item.name}</p>
                      <p className="text-xs text-gray-400 font-mono">{item.sku}</p>
                    </div>
                    <span className="w-8 text-center text-xs text-gray-600 pt-0.5">{item.qty}</span>
                    <span className="w-20 text-right text-xs text-gray-600 pt-0.5">₦{item.unitPrice.toLocaleString()}</span>
                    <span className="w-24 text-right text-xs font-semibold text-gray-800 pt-0.5">₦{(item.qty * item.unitPrice).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="px-6 py-3 border-b border-dashed border-gray-300 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Subtotal</span>
              <span className="text-xs font-semibold text-gray-800">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">VAT (7.5%)</span>
              <span className="text-xs font-semibold text-gray-800">₦{vat.toLocaleString()}</span>
            </div>

            {/* Metrix Processing Fee — highlighted for transparency */}
            <div className="flex justify-between items-center bg-blue-50 border border-blue-100 rounded-lg px-2 py-1.5">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-blue-700 font-semibold">Metrix Processing Fee (3%)</span>
              </div>
              <span className="text-xs font-bold text-blue-700">+₦{processingFee.toLocaleString()}</span>
            </div>

            {/* Cashback */}
            <div className="flex justify-between items-center bg-amber-50 border border-amber-100 rounded-lg px-2 py-1.5">
              <div className="flex items-center gap-1">
                <Trophy className="w-3 h-3 text-amber-500" />
                <span className="text-xs text-amber-700 font-semibold">Smartmonie Cashback (1.5%)</span>
              </div>
              <span className="text-xs font-bold text-amber-700">-₦{cashback.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center border-t-2 border-gray-300 pt-2">
              <span className="text-sm font-bold text-gray-800">TOTAL PAID</span>
              <span className="text-sm font-bold text-gray-900">₦{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Cashback Banner */}
          <div className="px-6 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-dashed border-gray-300">
            <div className="flex items-start gap-2">
              <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-800">Congratulations!</p>
                <p className="text-xs text-amber-700">
                  You've received <span className="font-bold">₦{cashback.toLocaleString()}</span> (1.5%) cashback for all purchases. Credited to your Smartmonie wallet.
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
            <p className="text-xs text-gray-400 mt-0.5">Payment processed by Metrix Payments Ltd</p>
            <div className="border-t border-gray-700 mt-2 pt-2">
              <p className="text-xs text-gray-500">www.smartmonie.ng | support@smartmonie.ng</p>
              <p className="text-xs text-gray-600 mt-0.5">Licensed by CBN · NDIC Insured · Powered by Metrix</p>
            </div>
          </div>
        </div>

        <p className="text-center text-blue-200/60 text-xs mt-4 no-print">
          Receipt automatically emailed to {USER_BVN_DATA.email}
        </p>
      </div>
    </div>
  );
}
