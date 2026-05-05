import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeLogo from "@/components/ThemeLogo";

type Status = "drafted" | "sent" | "replied" | "negotiating" | "won" | "lost";

interface Conversation {
  id: string;
  brand: string;
  category: string;
  status: Status;
  lastUpdate: string;
  nextStep: string;
}

const SAMPLE: Conversation[] = [
  { id: "1", brand: "Gymshark", category: "Activewear", status: "replied", lastUpdate: "2h ago", nextStep: "Reply to brand interest" },
  { id: "2", brand: "MyProtein", category: "Supplements", status: "sent", lastUpdate: "1d ago", nextStep: "Follow up in 2 days" },
  { id: "3", brand: "WHOOP", category: "Fitness wearables", status: "negotiating", lastUpdate: "4h ago", nextStep: "Counter rate proposal" },
  { id: "4", brand: "Athletic Greens", category: "Wellness", status: "drafted", lastUpdate: "3d ago", nextStep: "Send first outreach" },
];

const statusStyle: Record<Status, { label: string; classes: string; icon: any }> = {
  drafted:     { label: "Drafted",     classes: "bg-muted text-foreground-secondary border-border", icon: Clock },
  sent:        { label: "Sent",        classes: "bg-info/15 text-info border-info/30", icon: MessageCircle },
  replied:     { label: "Replied",     classes: "bg-primary/15 text-primary border-primary/30", icon: AlertCircle },
  negotiating: { label: "Negotiating", classes: "bg-warning/15 text-warning border-warning/30", icon: MessageCircle },
  won:         { label: "Won",         classes: "bg-success/15 text-success border-success/30", icon: CheckCircle2 },
  lost:        { label: "Lost",        classes: "bg-muted text-foreground-disabled border-border", icon: AlertCircle },
};

const Pipeline = () => {
  const [conversations] = useState<Conversation[]>(SAMPLE);

  const stats = {
    active: conversations.filter(c => ["sent","replied","negotiating"].includes(c.status)).length,
    replies: conversations.filter(c => c.status === "replied").length,
    drafts: conversations.filter(c => c.status === "drafted").length,
    won: conversations.filter(c => c.status === "won").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-supporting text-foreground-secondary hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Home
          </Link>
          <Link to="/"><ThemeLogo className="h-8 w-auto" /></Link>
          <Link to="/match">
            <Button size="sm" className="gradient-primary text-primary-foreground rounded-lg gap-1.5">
              <Plus className="h-4 w-4" /> New match
            </Button>
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-h2 mb-2">Your conversations</h1>
            <p className="text-body text-foreground-secondary">
              Track active brand conversations, follow-ups, and replies.
            </p>
          </div>

          {/* Pipeline overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Active", value: stats.active },
              { label: "Replies", value: stats.replies },
              { label: "Drafts", value: stats.drafts },
              { label: "Won", value: stats.won },
            ].map(s => (
              <div key={s.label} className="border border-border rounded-xl p-4 surface-1">
                <p className="text-micro text-foreground-secondary mb-1">{s.label}</p>
                <p className="font-display text-3xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Active conversations */}
          <div className="border border-border rounded-xl surface-1 overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-display text-h3">Active conversations</h2>
            </div>
            <div className="divide-y divide-border">
              {conversations.map(c => {
                const s = statusStyle[c.status];
                const Icon = s.icon;
                return (
                  <div key={c.id} className="px-5 py-4 flex items-center gap-4 hover:surface-2 transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                      <Building2Icon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-display font-semibold truncate">{c.brand}</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-pill border ${s.classes}`}>
                          <Icon className="h-3 w-3" /> {s.label}
                        </span>
                      </div>
                      <p className="text-micro text-foreground-secondary truncate">{c.category} · {c.nextStep}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-micro text-foreground-secondary">{c.lastUpdate}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Empty state hint */}
          <p className="text-center text-micro text-foreground-secondary mt-6">
            Pipeline preview · Mark a brand as replied to unlock reply support and negotiation.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Inline icon to avoid extra import
const Building2Icon = () => (
  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v8h4"/><path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/>
  </svg>
);

export default Pipeline;
