import React from "react";

type LozengeProps = "rule" | "lemma" | "note" | "law" | "tip";

type LozengeDetails = {
  text: string;
  bgColor: string;
  color?: string;
};

// color choices from https://tailwindcss.com/docs/customizing-colors
const LozengeChoices: Record<LozengeProps, LozengeDetails> = {
  rule: { bgColor: "#ef4444", text: "Rule", color: "#fafafa" }, // bg-red-500
  lemma: { bgColor: "#34d399", text: "Lemma" }, // bg-emerald-400
  note: { bgColor: "#7dd3fc", text: "Note" }, // bg-sky-300
  law: { bgColor: "#6b21a8", text: "Law", color: "#fafafa" }, // bg-purple-800
  tip: { bgColor: "#fbbf24", text: "Tips", }, // bg-amber-400
  
};

const Lozenge = ({ t }: { t: LozengeProps }) => {
  const details = LozengeChoices[t];
  return (
    <span
      className="rounded-s-full rounded-e-full py-[2.5px] px-[5px] text-xs"
      style={{
        backgroundColor: details.bgColor,
        color: details.color ? details.color : "inherit",
      }}
    >
      {details.text}
    </span>
  );
};
export default Lozenge;
