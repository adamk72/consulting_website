import React from "react";

type LozengeProps =
  | "rule"
  | "lemma"
  | "note"
  | "law"
  | "tip"
  | "warn"
  | "maxim"
  | "essential"
  | "tbd"
  | "todo";

type LozengeDetails = {
  text: string;
  bgColor: string;
  color?: string;
};

// color choices from https://tailwindcss.com/docs/customizing-colors
const LozengeChoices: Record<LozengeProps, LozengeDetails> = {
  essential: { bgColor: "#3730a3", text: "Essential", color: "#fafafa" }, // bg-indigo-800
  law: { bgColor: "#6b21a8", text: "Law", color: "#fafafa" }, // bg-purple-800
  lemma: { bgColor: "#059669", text: "Lemma", color: "#fafafa" }, // bg-emerald-600
  maxim: { bgColor: "#bef264", text: "Maxim" }, // bg-lime-300
  note: { bgColor: "#7dd3fc", text: "Note" }, // bg-sky-300
  rule: { bgColor: "#ef4444", text: "Rule", color: "#fafafa" }, // bg-red-500
  tbd: { bgColor: "#f9a8d4", text: "TBD" }, // bg-pink-300
  tip: { bgColor: "#2dd4bf", text: "Tip" }, // bg-teal-400
  warn: { bgColor: "#fbbf24", text: "Caution!" }, // bg-amber-400
  todo: { bgColor: "#ecfeff", text: "Todo" }, // bg-cyan-50
};

const Lozenge = ({ t, p }: { t: LozengeProps, p?: Boolean }) => {
  const details = LozengeChoices[t];
  return (
    <span
      className="font-bold rounded-s-full rounded-e-full py-[4px] px-[8px] text-xs relative -top-[3px] "
      style={{
        backgroundColor: details.bgColor,
        color: details.color ? details.color : "inherit",
        fontFamily: "Montserrat",
      }}
    >
      {details.text}{p ? 's' : null}
    </span>
  );
};
export default Lozenge;
