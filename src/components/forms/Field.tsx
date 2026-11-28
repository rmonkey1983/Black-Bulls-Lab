import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export const LABEL_CLASS = "block mb-2 text-sm text-zinc-300";
export const INPUT_CLASS = "w-full bg-black-pure border border-white/30 px-4 py-3 text-base text-white placeholder:text-white/50 focus:outline-none focus:border-accent-gold focus-visible:ring-2 focus-visible:ring-accent-gold";

export function Field({ label, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className={LABEL_CLASS}>{label}</span>
      <input autoComplete="off" {...props} className={INPUT_CLASS} />
    </label>
  );
}

export function SelectField({ label, children, ...props }: { label: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className={LABEL_CLASS}>{label}</span>
      <select {...props} className={INPUT_CLASS}>{children}</select>
    </label>
  );
}
