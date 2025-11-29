import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Calendar, GraduationCap, Home, Lock, QrCode, Github, Twitter, Menu, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import WhatsappMeme from "../../public/whatsapp_meme.png"
import KingBowDownMeme from "../../public/king_bowdown.png"
import BoyFriendMeme from "../../public/boyfriend_meme.png"
const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary animate-pulse-glow" />
              <span className="text-xl font-bold gradient-text">Midnight Pass</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <a href="#meme-zone" className="text-muted-foreground hover:text-foreground transition-colors">Meme Zone</a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <a href="#technology" className="text-muted-foreground hover:text-foreground transition-colors">Technology</a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            </div>

            <div className="hidden md:block">
              <Button className="gradient-bg glow-shadow font-semibold">
                Get the App
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-6 glass rounded-3xl p-6 space-y-4"
            >
              <a href="#home" className="block text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <a href="#features" className="block text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="block text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <a href="#technology" className="block text-muted-foreground hover:text-foreground transition-colors">Technology</a>
              <a href="#faq" className="block text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
              <Button className="w-full gradient-bg glow-shadow font-semibold">
                Get the App
              </Button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <Shield className="w-32 h-32 text-primary animate-pulse-glow" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Prove Anything.
              <br />
              <span className="gradient-text">Reveal Nothing.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Zero-knowledge credential wallet for events, venues, and private verification.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-bg glow-shadow text-lg font-semibold px-8 py-6">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-lg font-semibold px-8 py-6 glow-border">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">What You Can Prove</h2>
            <p className="text-xl text-muted-foreground">Verify without revealing your personal information</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Age Verification (18+)",
                description: "Prove adulthood without revealing your date of birth."
              },
              {
                icon: GraduationCap,
                title: "Student Status",
                description: "Instant eligibility verification — your ID stays private."
              },
              {
                icon: Home,
                title: "Local Residency",
                description: "Show your region without revealing your address."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="glass glow-border p-8 h-full hover:scale-105 transition-transform duration-300">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center glow-shadow">
                      <feature.icon className="w-8 h-8 text-background" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Three simple steps to private verification</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
              {
                step: "01",
                title: "Enter Credential",
                description: "Input your DOB, Student ID, or Postal Code securely on your device.",
                icon: Lock
              },
              {
                step: "02",
                title: "Generate ZK Proof Locally",
                description: "Midnight witness creates cryptographic proof without sharing raw data.",
                icon: Shield
              },
              {
                step: "03",
                title: "Show QR Code",
                description: "Present your proof at the gate. Fast, private, verifiable.",
                icon: QrCode
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-3xl glass glow-border flex items-center justify-center">
                    <step.icon className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-6xl font-bold gradient-text mb-4">{step.step}</div>
                  <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-xl text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Showcase */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Designed for Privacy.</h2>
            <p className="text-xl gradient-text font-semibold">Built for Speed.</p>
          </motion.div>

          <div className="relative h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center gap-8">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="w-64 h-[500px] glass glow-border rounded-[3rem] p-4 transform hover:scale-105 transition-transform duration-300"
                  style={{ transform: `perspective(1000px) rotateY(${(i - 1) * 10}deg)` }}
                >
                  <div className="w-full h-full rounded-[2.5rem] bg-background/50 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Shield className="w-16 h-16 text-primary mx-auto" />
                      <p className="text-sm text-muted-foreground px-4">
                        {i === 0 ? "Onboarding" : i === 1 ? "Add Credential" : "QR Proof"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Powered by Advanced Technology</h2>
            <p className="text-xl text-muted-foreground">Built on Cardano and zero-knowledge cryptography</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Zero-Knowledge Circuits", desc: "Cryptographic proofs with no data leakage" },
              { title: "Local Witness Generation", desc: "All computation happens on your device" },
              { title: "Cardano UTxO Receipts", desc: "Immutable proof of verification on-chain" },
              { title: "Ephemeral DIDs", desc: "Temporary identifiers for each session" },
              { title: "On-Device Privacy", desc: "Your data never leaves your phone" },
              { title: "Open Source", desc: "Auditable and transparent code" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="glass glow-border p-6 hover:scale-105 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2 gradient-text">{tech.title}</h3>
                  <p className="text-muted-foreground">{tech.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
            {/* Meme Zone Section */}
{/* Meme Zone Section */}
<section id="meme-zone" className="py-32 relative">
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
  {[
    {
      img: WhatsappMeme,
      caption: "WhatsApp: E2E. Midnight: E2E + ZK 🔥",
      span: "",
      height: "h-[320px]"
    },
    {
      img: KingBowDownMeme,
      caption: "Privacy apps: ‘We protect you.’ Midnight: ‘No—you bow.’",
      span: "",
      height: "h-[320px]"
    },
    {
      img: BoyFriendMeme,
      caption: "Developers when real parallelism hits different 💥",
      span: "lg:col-span-2",
      height: "h-[450px]"  // ⬅️ INCREASED HEIGHT
    }
  ].map((meme, index) => (
    <motion.div
      key={index}
      className={meme.span}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
    >
      <Card className="glass glow-border p-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
        <img
          src={meme.img}
          alt="meme"
          className={`rounded-xl w-full object-cover mb-4 shadow-lg ${meme.height}`}
        />
        <p className="text-muted-foreground text-center">{meme.caption}</p>
      </Card>
    </motion.div>
  ))}
</div>

</section>


      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="glass glow-border p-16 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
              <div className="relative z-10">
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  Own Your Identity.
                  <br />
                  <span className="gradient-text">Unlock Privacy.</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  <Button size="lg" className="gradient-bg glow-shadow text-lg font-semibold px-8 py-6">
                    Download App
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg font-semibold px-8 py-6 glow-border">
                    View Code
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg font-semibold px-8 py-6 glow-border">
                    Try Demo
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
            {/* FAQ Section */}
<section id="faq" className="py-32 relative">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-5xl font-bold mb-4">Frequently Asked Questions</h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Everything you need to know about Midnight Pass and zero-knowledge proofs.
      </p>
    </motion.div>

    <div className="max-w-4xl mx-auto space-y-8">
      {[
        {
          q: "Do you store my personal data?",
          a: "Zero. Everything stays on your device. We only store cryptographic proofs — not DOB, not ID, not address."
        },
        {
          q: "What happens when I show the QR?",
          a: "Only a zero-knowledge proof is shared. The venue verifies it without knowing the underlying details."
        },
        {
          q: "Is this built on Cardano?",
          a: "Yes — we use UTxO receipts + Midnight's ZK architecture for secure, private verification."
        },
        {
          q: "Can someone steal my QR code?",
          a: "No. Proofs are timestamped, single-use, and tied to ephemeral DIDs."
        },
        {
          q: "Does it work offline?",
          a: "Yes! Proof generation + scanning works offline. Organizers only need occasional sync."
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="glass glow-border p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold mb-3">{item.q}</h3>
          <p className="text-muted-foreground text-lg">{item.a}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="py-16 glass border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold gradient-text">Midnight Pass</span>
              </div>
              <p className="text-muted-foreground">
                Zero-knowledge credential wallet for private verification.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Age Verification</div>
                <div>Student Status</div>
                <div>Residency Proof</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Documentation</div>
                <div>Technology</div>
                <div>Contact</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-xl glass glow-border flex items-center justify-center hover:scale-110 transition-transform">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl glass glow-border flex items-center justify-center hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl glass glow-border flex items-center justify-center hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="text-center text-muted-foreground border-t border-border/50 pt-8">
            © 2025 Midnight Pass. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
