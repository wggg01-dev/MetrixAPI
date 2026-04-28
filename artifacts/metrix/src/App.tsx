import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./context/ThemeContext";
import { ApiLogProvider, useApiEvent } from "./context/ApiLogContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { ApiLogPanel } from "./components/ApiLogPanel";
import { AuthorizeScreen } from "./pages/AuthorizeScreen";
import { AuthenticatingScreen } from "./pages/AuthenticatingScreen";
import { UserDetailsScreen } from "./pages/UserDetailsScreen";
import { SelectBankScreen } from "./pages/SelectBankScreen";
import { AmountScreen } from "./pages/AmountScreen";
import { ProcessingScreen } from "./pages/ProcessingScreen";
import { ApprovedScreen } from "./pages/ApprovedScreen";
import { ReceiptScreen } from "./pages/ReceiptScreen";
import type { Bank } from "./data/banks";

const queryClient = new QueryClient();

type Step =
  | "authorize"
  | "authenticating"
  | "user-details"
  | "select-bank"
  | "amount"
  | "processing"
  | "approved"
  | "receipt";

function AppInner() {
  const fire = useApiEvent();
  const [step, setStep] = useState<Step>("authorize");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");

  const goTo = (s: Step) => setStep(s);

  const resetAll = () => {
    setStep("authorize");
    setSelectedBank(null);
    setAmount("");
    setNarration("");
  };

  useEffect(() => {
    switch (step) {
      case "authenticating":
        fire("POST", "/v1/user/lookup", 200);
        break;
      case "user-details":
        fire("GET",  "/v1/user/profile",     120);
        fire("GET",  "/v1/accounts/linked",  420);
        break;
      case "select-bank":
        fire("GET",  "/v1/banks/list",       180);
        fire("GET",  "/v1/account/balance",  520);
        break;
      case "amount":
        fire("GET",  "/v1/limits/daily",     200);
        break;
      case "approved":
        fire("POST", "/v1/notification/whatsapp", 400);
        fire("POST", "/v1/notification/sms",       700);
        break;
    }
  }, [step]);

  return (
    <>
      <ThemeToggle />
      <ApiLogPanel />
      <div className="min-h-screen">
        {step === "authorize" && (
          <AuthorizeScreen onNext={() => goTo("authenticating")} />
        )}
        {step === "authenticating" && (
          <AuthenticatingScreen onNext={() => goTo("user-details")} />
        )}
        {step === "user-details" && (
          <UserDetailsScreen
            onNext={() => goTo("select-bank")}
            onBack={() => goTo("authenticating")}
          />
        )}
        {step === "select-bank" && (
          <SelectBankScreen
            onNext={(bank) => { setSelectedBank(bank); goTo("amount"); }}
            onBack={() => goTo("user-details")}
          />
        )}
        {step === "amount" && selectedBank && (
          <AmountScreen
            bank={selectedBank}
            onNext={(amt, nar) => { setAmount(amt); setNarration(nar); goTo("processing"); }}
            onBack={() => goTo("select-bank")}
          />
        )}
        {step === "processing" && (
          <ProcessingScreen
            amount={amount}
            onNext={() => goTo("approved")}
          />
        )}
        {step === "approved" && selectedBank && (
          <ApprovedScreen
            bank={selectedBank}
            amount={amount}
            onNext={() => goTo("receipt")}
          />
        )}
        {step === "receipt" && selectedBank && (
          <ReceiptScreen
            bank={selectedBank}
            amount={amount}
            narration={narration}
            onDone={resetAll}
          />
        )}
      </div>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ApiLogProvider>
        <QueryClientProvider client={queryClient}>
          <AppInner />
        </QueryClientProvider>
      </ApiLogProvider>
    </ThemeProvider>
  );
}

export default App;
