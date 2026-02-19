"use client";

import { useState } from "react";
import { Heart, Upload, TrendingUp, ClipboardList, Check, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/landing/navbar";
import { PageWrapper, FadeIn, StaggerContainer, StaggerItem, ScrollFadeIn } from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";

const WAITLIST_COUNT = 150;

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setWaitlistStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setWaitlistStatus("success");
        setEmail("");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong");
        setWaitlistStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setWaitlistStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-subtle/40 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <PageWrapper>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted">
                <Shield className="h-3.5 w-3.5 text-accent" />
                Private and secure — your data stays yours
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Understand your health.
                <br />
                <span className="text-accent">Not just your diagnosis.</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
                Upload your lab results. Get plain-English explanations, track
                changes over time, and walk into your next appointment prepared.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#waitlist" className="inline-flex">
                  <Button size="lg" className="w-full sm:w-auto text-base px-8">
                    Join the waitlist
                  </Button>
                </a>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto text-base">
                  <a href="#how-it-works">See How It Works</a>
                </Button>
              </div>
            </div>
          </PageWrapper>
        </div>
      </section>

      {/* Waitlist counter */}
      <ScrollFadeIn className="border-y border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-muted uppercase tracking-wider">Join the waitlist</p>
          <p className="mt-2 text-4xl sm:text-5xl font-bold text-foreground tabular-nums">{WAITLIST_COUNT}+</p>
          <p className="mt-1 text-sm text-muted">people already waiting</p>
        </div>
      </ScrollFadeIn>

      {/* Features Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <StaggerContainer className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Upload,
              title: "Upload Results",
              description:
                "Snap a photo or upload a PDF of your lab results. Our AI extracts and organizes your data instantly.",
            },
            {
              icon: TrendingUp,
              title: "Track Over Time",
              description:
                "See how your biomarkers change across visits. Visualize trends and understand your health journey.",
            },
            {
              icon: ClipboardList,
              title: "Prepare for Visits",
              description:
                "Get personalized questions for your doctor based on your actual results. Never walk in unprepared.",
            },
          ].map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-border p-6 sm:p-8 bg-background"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-subtle">
                  <feature.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-accent-subtle/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-center text-3xl font-bold text-foreground">
              How it works
            </h2>
            <p className="mt-3 text-center text-muted max-w-lg mx-auto">
              Three simple steps to better understand your health data.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Upload",
                description:
                  "Take a photo of your lab report or upload a PDF. You can also enter values manually.",
              },
              {
                step: "02",
                title: "Understand",
                description:
                  "Get a clear, plain-English breakdown of each biomarker — what it means and why it matters.",
              },
              {
                step: "03",
                title: "Prepare",
                description:
                  "Receive personalized questions to ask your doctor, plus lifestyle tips for each result.",
              },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="text-center">
                  <span className="text-5xl font-bold text-accent/15">
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed max-w-xs mx-auto">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Waitlist / CTA */}
      <section id="waitlist" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn>
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Ready to take control?
              </h2>
              <p className="mt-3 text-muted">
                Join the waitlist and we&apos;ll let you know when we launch.
              </p>

              <form
                onSubmit={handleWaitlist}
                className="mt-8 flex flex-col gap-3 max-w-md mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                    aria-invalid={waitlistStatus === "error"}
                    aria-describedby={waitlistStatus === "error" ? "waitlist-error" : waitlistStatus === "success" ? "waitlist-success" : undefined}
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={waitlistStatus === "loading"}
                    className="sm:w-auto"
                  >
                    {waitlistStatus === "loading" ? "Joining..." : "Join Waitlist"}
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  {waitlistStatus === "success" && (
                    <motion.div
                      id="waitlist-success"
                      role="status"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-lg border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-800 flex items-center justify-center gap-2"
                    >
                      <Check className="h-4 w-4 shrink-0" />
                      You&apos;re on the list. We&apos;ll be in touch.
                    </motion.div>
                  )}
                  {waitlistStatus === "error" && (
                    <motion.div
                      id="waitlist-error"
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-lg border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-900 flex items-start justify-center gap-2"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent">
                <Heart className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold">Second Opinion</span>
            </div>
            <p className="text-xs text-muted text-center max-w-xl leading-relaxed">
              Second Opinion is not a medical device and does not provide
              diagnoses. Always consult your healthcare provider.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
