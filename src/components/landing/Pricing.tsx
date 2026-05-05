import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TIERS = {
  creator: {
    price_id: "price_1TLapPBh0cRtL75D91dEVTT9",
    product_id: "prod_UKFKb7lULjm351",
  },
  growth: {
    price_id: "price_1TLaphBh0cRtL75DcPALyEdk",
    product_id: "prod_UKFKEqY65ZrSUy",
  },
  partner: {
    price_id: "price_1TLapuBh0cRtL75DAhl8mFg0",
    product_id: "prod_UKFKXhSpkdZpms",
  },
} as const;

type TierKey = keyof typeof TIERS;

const tiers = [
  {
    key: "creator" as TierKey,
    name: "Creator",
    price: "$19",
    period: "/mo",
    desc: "Unlock AI-suggested replies and reply support after your first real brand reply.",
    highlight: false,
    features: [
      "Brand-fit opportunities",
      "Pricing guidance and ranges",
      "Package suggestions you can edit",
      "Personalized outreach workspace",
      "AI-suggested replies",
      "Pipeline & conversation tracking",
    ],
  },
  {
    key: "growth" as TierKey,
    name: "Growth",
    price: "$39",
    period: "/mo",
    desc: "More depth in matching, pricing guidance, and negotiation support.",
    highlight: true,
    features: [
      "Everything in Creator",
      "Deeper brand-fit reasoning",
      "Negotiation support",
      "Multi-deal pipeline view",
      "Follow-up workflow",
    ],
  },
  {
    key: "partner" as TierKey,
    name: "Partner",
    price: "$79",
    period: "/mo",
    desc: "Full creator business OS for active deal flow.",
    highlight: false,
    features: [
      "Everything in Growth",
      "Priority brand-fit matching",
      "Advanced negotiation support",
      "Package & rate refinement",
      "Priority support",
    ],
  },
];

const Pricing = () => {
  const [loadingTier, setLoadingTier] = useState<TierKey | null>(null);
  const navigate = useNavigate();

  const handleCheckout = async (tierKey: TierKey) => {
    setLoadingTier(tierKey);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId: TIERS[tierKey].price_id },
      });
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (err: any) {
      toast.error(err.message || "Failed to start checkout");
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <section id="pricing" className="py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <h2 className="font-display text-h2 mb-4">
            Free until a <span className="gradient-text">real brand replies</span>
          </h2>
          <p className="text-body text-foreground-secondary">
            Start free. You only unlock a paid plan once a real human brand replies — auto-replies don&rsquo;t count.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`rounded-2xl p-7 flex flex-col border ${
                t.highlight
                  ? "border-primary/50 surface-2 relative lavender-glow"
                  : "border-border surface-1"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-micro bg-primary text-primary-foreground px-3 py-1 rounded-pill font-medium">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-h3">{t.name}</h3>
              <div className="mt-3 mb-1 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{t.price}</span>
                <span className="text-supporting text-foreground-secondary">{t.period}</span>
              </div>
              <p className="text-supporting text-foreground-secondary mb-6">{t.desc}</p>

              <ul className="space-y-2.5 mb-7 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-supporting">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground-secondary">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={t.highlight ? "default" : "outline"}
                size="lg"
                className={`w-full rounded-lg ${t.highlight ? "gradient-primary text-primary-foreground" : "border-border-strong"}`}
                disabled={loadingTier !== null}
                onClick={() => handleCheckout(t.key)}
              >
                {loadingTier === t.key ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get started"}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-micro text-foreground-secondary mt-8 max-w-xl mx-auto"
        >
          Pricing guidance uses ranges and structural recommendations, not guarantees. Package recommendations are fully editable.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
