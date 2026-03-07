type OptionGroupProps = {
  label: string;
  children: React.ReactNode;
};

export function OptionGroup({ label, children }: OptionGroupProps) {
  return (
    <div className="space-x-4">
      <label className="text-text-2xl font-bold">{label}</label>
      <div className="space-x-4">{children}</div>
    </div>
  );
}
