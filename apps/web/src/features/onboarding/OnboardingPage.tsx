import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, HeartPulse, Moon, Sparkles, Wind } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { MOODS, type Mood } from '@/design/tokens';
import { fadeUp } from '@/lib/motion-presets';
import { cn } from '@/lib/cn';

type Intention = 'anxiety' | 'sleep' | 'focus' | 'breathwork' | 'curiosity';

type IntentionOption = {
  id: Intention;
  title: string;
  body: string;
  icon: typeof Wind;
};

const INTENTIONS: readonly IntentionOption[] = [
  {
    id: 'anxiety',
    title: 'Quiet anxious thoughts',
    body: 'Gentle grounding when the mind speeds up.',
    icon: HeartPulse,
  },
  {
    id: 'sleep',
    title: 'Sleep more easily',
    body: 'Wind-down rituals and soft sounds for the night.',
    icon: Moon,
  },
  {
    id: 'focus',
    title: 'Find more focus',
    body: 'Calm, distraction-free moments to do deep work.',
    icon: Brain,
  },
  {
    id: 'breathwork',
    title: 'Practice breathwork',
    body: 'Guided breathing for stress, energy, or calm.',
    icon: Wind,
  },
  {
    id: 'curiosity',
    title: 'Just exploring',
    body: 'No pressure. Look around at your own pace.',
    icon: Sparkles,
  },
];

const MOOD_LABELS: Record<Mood, string> = {
  calm: 'Calm',
  anxious: 'A bit anxious',
  sad: 'Tender / down',
  happy: 'Pretty good',
  overwhelmed: 'Overwhelmed',
};

const INTENTIONS_KEY = 'serenity:intentions';

export function OnboardingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mood, setMood } = useTheme();
  const [step, setStep] = useState(0);
  const [intentions, setIntentions] = useState<Set<Intention>>(new Set());

  const firstName = (user?.displayName ?? '').trim().split(/\s+/)[0] || 'friend';

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggleIntention = (id: Intention) => {
    setIntentions((curr) => {
      const updated = new Set(curr);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  const finish = () => {
    try {
      window.localStorage.setItem(INTENTIONS_KEY, JSON.stringify([...intentions]));
    } catch {
      /* localStorage might be unavailable; not fatal */
    }
    navigate('/me', { replace: true });
  };

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center pt-10">
      {/* progress dots */}
      <div className="mb-8 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              'h-1.5 rounded-full transition-all duration-500',
              i === step ? 'bg-primary w-8' : i < step ? 'bg-primary/60 w-4' : 'bg-border w-4',
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            className="glass w-full rounded-3xl p-8 sm:p-10"
          >
            <p className="text-primary mb-2 text-sm font-medium">A gentle hello</p>
            <h1 className="font-display text-fg text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome, {firstName}.
            </h1>
            <p className="text-fg-muted mt-3 text-base leading-relaxed">
              Serenity is yours to use however feels good. No streaks to chase, no guilt for taking
              a break. Just a few questions so the space feels like yours from the start.
            </p>
            <div className="mt-8 flex justify-end">
              <Button onClick={next} size="lg">
                Begin
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            className="glass w-full rounded-3xl p-8 sm:p-10"
          >
            <p className="text-primary mb-2 text-sm font-medium">Step 1 of 2</p>
            <h2 className="font-display text-fg text-2xl font-semibold tracking-tight sm:text-3xl">
              How are you arriving today?
            </h2>
            <p className="text-fg-muted mt-2 text-sm leading-relaxed">
              The whole space will soften to match. You can change this any time.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {MOODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  aria-pressed={mood === m}
                  className={cn(
                    'rounded-2xl border px-4 py-3 text-left text-sm transition-all',
                    mood === m
                      ? 'border-primary/40 bg-primary/10 text-fg shadow-sm'
                      : 'border-border bg-surface/60 text-fg-muted hover:border-primary/30 hover:text-fg',
                  )}
                >
                  <span className="text-fg block font-medium">{MOOD_LABELS[m]}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={back}>
                Back
              </Button>
              <Button onClick={next}>
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            className="glass w-full rounded-3xl p-8 sm:p-10"
          >
            <p className="text-primary mb-2 text-sm font-medium">Step 2 of 2</p>
            <h2 className="font-display text-fg text-2xl font-semibold tracking-tight sm:text-3xl">
              What brought you here?
            </h2>
            <p className="text-fg-muted mt-2 text-sm leading-relaxed">
              Pick anything that feels true — or none, if you’d rather not say.
            </p>
            <ul className="mt-6 space-y-2">
              {INTENTIONS.map(({ id, title, body, icon: Icon }) => {
                const active = intentions.has(id);
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => toggleIntention(id)}
                      aria-pressed={active}
                      className={cn(
                        'flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all',
                        active
                          ? 'border-primary/40 bg-primary/10 shadow-sm'
                          : 'border-border bg-surface/60 hover:border-primary/30',
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                          active ? 'bg-primary text-primary-fg' : 'bg-surface-2 text-fg-muted',
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="text-fg block text-sm font-medium">{title}</span>
                        <span className="text-fg-muted block text-xs leading-relaxed">{body}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={back}>
                Back
              </Button>
              <Button onClick={finish}>
                Enter your space
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
