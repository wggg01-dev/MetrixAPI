import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Fingerprint, 
  ScanFace, 
  Zap, 
  ShieldCheck, 
  Code2, 
  ArrowRight,
  Server,
  Terminal,
  Activity,
  Lock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

import heroBg from "../assets/hero-bg.png";
import fpScan from "../assets/fingerprint-scan.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const codeSnippet = `// Initiate Biometric Payment
const response = await vaultx.payment.initiate({
  amount: 450.00,
  currency: 'NGN',
  merchant_id: 'mer_8f92a4b1',
  biometric_mode: 'face'
});

// Verify & Confirm
const confirm = await vaultx.payment.confirm({
  transaction_id: response.id,
  biometric_token: 'tok_abc123...',
});

console.log(confirm.status); // 'SUCCESS' (0.3s latency)`;

export default function LandingPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity1 = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">
      
      {/* 1. Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
            <ShieldCheck className="w-6 h-6" />
            <span>VaultX</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#api" className="hover:text-foreground transition-colors">API</a>
            <a href="#performance" className="hover:text-foreground transition-colors">Performance</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://docs.vaultx.api" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block">Documentation</a>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              <a href="https://metrix-4Olscgyxy-wggg01-devs-projects.vercel.app" data-testid="button-bottom-demo">Live Demo</a>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
        >
          <img src={heroBg} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              v2.4.0 API Live
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              The biometric layer <br className="hidden md:block"/>
              for <span className="text-primary">stealth payments</span>.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl font-light">
              Replace PINs and passwords with sub-second facial recognition and fingerprint scanning. Built for fintechs. Trusted by banks.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground group">
                <a href="https://metrix-4Olscgyxy-wggg01-devs-projects.vercel.app" data-testid="button-bottom-demo">
                  Start Integration 
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg border-white/10 hover:bg-white/5">
                <a href="#api" data-testid="button-hero-api">View Endpoints</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Metrics/Performance Section */}
      <section id="performance" className="py-24 bg-card border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/5"
          >
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center md:px-8 pt-8 md:pt-0">
              <div className="text-5xl font-mono font-bold text-primary mb-2">~0.3s</div>
              <div className="text-lg font-medium text-foreground mb-2">Face Verification</div>
              <p className="text-muted-foreground text-sm">Ultra-low latency facial mapping and liveness detection.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center md:px-8 pt-8 md:pt-0">
              <div className="text-5xl font-mono font-bold text-primary mb-2">~0.2s</div>
              <div className="text-lg font-medium text-foreground mb-2">Fingerprint Scan</div>
              <p className="text-muted-foreground text-sm">Hardware-accelerated local secure enclave processing.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center md:px-8 pt-8 md:pt-0">
              <div className="text-5xl font-mono font-bold text-primary mb-2">~1.4s</div>
              <div className="text-lg font-medium text-foreground mb-2">End-to-End Payment</div>
              <p className="text-muted-foreground text-sm">From initiation to confirmed ledger settlement.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Core Features */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Military-grade security.<br/>Consumer-grade UX.</h2>
            <p className="text-xl text-muted-foreground font-light">VaultX operates entirely in the background, leveraging hardware secure enclaves and zero-knowledge proofs to authenticate users instantly.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ScanFace, title: "Liveness Detection", desc: "Defeats 3D masks, deepfakes, and high-res photos instantly." },
              { icon: Fingerprint, title: "FIDO2 Certified", desc: "WebAuthn compatible cryptographic key pairs." },
              { icon: Zap, title: "Edge Processing", desc: "No biometric data leaves the device. Only cryptographic proofs." },
              { icon: Server, title: "99.999% Uptime", desc: "Distributed global edge network for zero downtime." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. API Section */}
      <section id="api" className="py-32 bg-card border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-4">
                <Terminal className="w-4 h-4" /> DEVELOPER EXPERIENCE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Integrate in minutes, not months.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                A clean, predictable REST API that handles the complex cryptography and hardware abstraction for you.
              </p>

              <div className="space-y-6">
                {[
                  { method: "POST", endpoint: "/v1/biometric/face/verify" },
                  { method: "POST", endpoint: "/v1/biometric/fingerprint/verify" },
                  { method: "POST", endpoint: "/v1/payment/initiate" },
                  { method: "POST", endpoint: "/v1/payment/confirm" },
                  { method: "GET", endpoint: "/v1/payment/status/{id}" }
                ].map((api, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-background rounded-lg border border-white/5 font-mono text-sm group hover:border-primary/40 transition-colors">
                    <span className={`font-bold ${api.method === 'POST' ? 'text-primary' : 'text-emerald-400'}`}>
                      {api.method}
                    </span>
                    <span className="text-foreground/80">{api.endpoint}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-background shadow-2xl"
            >
              <div className="absolute top-0 w-full h-12 bg-card border-b border-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="ml-4 font-mono text-xs text-muted-foreground">payment-flow.ts</div>
              </div>
              <div className="p-6 pt-16 font-mono text-sm leading-relaxed overflow-x-auto">
                <pre className="text-muted-foreground">
                  <code dangerouslySetInnerHTML={{ __html: codeSnippet.replace(/await vaultx/g, '<span class="text-primary">await vaultx</span>').replace(/'(.*?)'/g, '<span class="text-emerald-400">$&</span>').replace(/\/\/.*/g, '<span class="text-slate-500">$&</span>') }} />
                </pre>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* 6. Visual Tech Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10"
            >
              <img src={fpScan} alt="Fingerprint Matrix" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:pl-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Hardware-backed.<br/>Zero Knowledge.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                VaultX never sees the actual biometric data. We generate a zero-knowledge proof on the secure enclave of the user's device, which our API verifies instantly.
              </p>
              <ul className="space-y-4">
                {["Secure Enclave Processing", "Zero-Knowledge Proofs", "Symmetric Cryptography"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <Lock className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to upgrade your payment flow?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              See VaultX in action through our partner app demo. Experience sub-second biometric payments firsthand.
            </p>
            <Button asChild size="lg" className="h-16 px-10 text-xl bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="/" data-testid="button-bottom-demo
                Launch Live Demo
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="py-12 bg-background border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-foreground font-bold">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span>VaultX</span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VaultX Infrastructure. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="text-muted-foreground hover:text-foreground">API Status</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Security</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
