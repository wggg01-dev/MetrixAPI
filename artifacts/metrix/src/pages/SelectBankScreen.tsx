import { useState, useMemo } from "react";
import { Search, ArrowLeft, ChevronRight, Building2, Check, CheckCircle } from "lucide-react";
import { NIGERIAN_BANKS, USER_BVN_DATA, type Bank } from "../data/banks";

interface SelectBankScreenProps {
  onNext: (bank: Bank) => void;
  onBack: () => void;
}

export function SelectBankScreen({ onNext, onBack }: SelectBankScreenProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Bank | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const registeredBanks = NIGERIAN_BANKS.filter(b => USER_BVN_DATA.registeredBanks.includes(b.id));
  const otherBanks = NIGERIAN_BANKS.filter(b => !USER_BVN_DATA.registeredBanks.includes(b.id));

  const filteredRegistered = useMemo(() => {
    if (!query) return registeredBanks;
    return registeredBanks.filter(b => b.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const filteredOthers = useMemo(() => {
    if (!query) return otherBanks;
    return otherBanks.filter(b => b.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const handleSelect = (bank: Bank) => {
    setSelected(bank);
    setIsOpen(false);
    setQuery("");
  };

  const handleNext = () => {
    if (selected) onNext(selected);
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl" />
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

        <div className="glass-card rounded-3xl p-6 shadow-2xl">
          <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-5 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-6">
            <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-primary/30">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">Select Bank</h2>
            <p className="text-sm text-muted-foreground">Choose the bank account to debit</p>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-foreground mb-2 block">Receiving Account</label>
            <button
              onClick={() => setIsOpen(true)}
              className={`w-full flex items-center gap-3 border-2 rounded-2xl px-4 py-3.5 text-left transition-all ${selected ? "border-primary bg-primary/5" : "border-border bg-secondary/30 hover:border-primary/50"}`}
            >
              {selected ? (
                <>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: selected.color }}>
                    {selected.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">{selected.name}</p>
                    <p className="text-xs text-muted-foreground">Code: {selected.code}</p>
                  </div>
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                </>
              ) : (
                <>
                  <Building2 className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm flex-1">Choose a bank</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={!selected}
            className="w-full gradient-primary text-white font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            Continue to Amount
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-bounce-in max-h-[80vh] flex flex-col">
            <div className="p-5 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground text-lg">Your Linked Banks</h3>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2.5">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search banks..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                  autoFocus
                />
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-3">
              {filteredRegistered.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Registered Accounts</p>
                  <div className="space-y-1">
                    {filteredRegistered.map(bank => (
                      <button
                        key={bank.id}
                        onClick={() => handleSelect(bank)}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/5 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm" style={{ backgroundColor: bank.color }}>
                          {bank.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">{bank.name}</p>
                          <p className="text-xs text-muted-foreground">Sort code: {bank.code}</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredOthers.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Other Banks</p>
                  <div className="space-y-1">
                    {filteredOthers.map(bank => (
                      <button
                        key={bank.id}
                        onClick={() => handleSelect(bank)}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors text-left group opacity-70 hover:opacity-100"
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm" style={{ backgroundColor: bank.color }}>
                          {bank.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">{bank.name}</p>
                          <p className="text-xs text-muted-foreground">Sort code: {bank.code}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredRegistered.length === 0 && filteredOthers.length === 0 && (
                <div className="text-center py-8">
                  <Building2 className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No banks found for "{query}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
