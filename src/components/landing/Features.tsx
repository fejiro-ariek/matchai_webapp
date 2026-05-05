import { motion } from "framer-motion";
import { Brain, Target, Mail, Sliders, MessageSquare, BarChart3, Shield, Handshake } from "lucide-react";

const features = [
  { icon: Brain, title: "Creator positioning", desc: "MatchAI understands your niche, audience, and strengths so every recommendation fits you." },
  { icon: Target, title: "Brand-fit opportunities", desc: "Brands that actually match your content — with the reasoning behind every match." },
  { icon: BarChart3, title: "Pricing guidance", desc: "Realistic pricing ranges and structural recommendations — never guaranteed numbers." },
  { icon: Sliders, title: "Package suggestions", desc: "Single deliverable, bundle, UGC, affiliate hybrid, or monthly partner — fully editable." },
  { icon: Mail, title: "Personalized outreach", desc: "Brand-specific outreach based on your positioning, package, and fit. You stay in control." },
  { icon: MessageSquare, title: "AI-suggested replies", desc: "When a real brand replies, get suggested responses tailored to the conversation." },
  { icon: Handshake, title: "Negotiation support", desc: "Guidance for asks, counter-offers, and recommended next steps — calm and confident." },
  { icon: Shield, title: "Honest by default", desc: "No inflated ROI, no fake promises, no guaranteed earnings. Just steady creator-business support." },
];

const Features = () => (
  <section id="features" className="py-20 border-t border-border/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
          Your creator business OS, run by an <span className="gradient-text">AI brand deals agent</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Brand-fit opportunities, pricing guidance, package suggestions, personalized outreach, and reply support — built for creators under 100K.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border/40 bg-card/40 p-5 hover:bg-card/60 transition-colors"
          >
            <f.icon size={20} className="text-primary mb-3" />
            <h3 className="font-display font-semibold text-sm mb-1">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
