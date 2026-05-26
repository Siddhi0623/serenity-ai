import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { MOODS, type Mood } from '@/design/tokens';
import { cn } from '@/lib/cn';

const MOOD_LABELS: Record<Mood, string> = {
  calm: 'Calm',
  anxious: 'Anxious',
  sad: 'Sad',
  happy: 'Happy',
  overwhelmed: 'Overwhelmed',
};

export function ThemeMoodSwitcher() {
  const { theme, mood, toggleTheme, setMood } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <div className="border-border bg-surface/60 backdrop-blur-glass hidden items-center gap-1 rounded-full border p-1 md:flex">
        {MOODS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMood(m)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              mood === m ? 'bg-primary text-primary-fg shadow-sm' : 'text-fg-muted hover:text-fg',
            )}
            aria-pressed={mood === m}
          >
            {MOOD_LABELS[m]}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        className="border-border bg-surface/60 text-fg backdrop-blur-glass hover:bg-surface-2 grid h-10 w-10 place-items-center rounded-full border transition-colors"
      >
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>
    </div>
  );
}
