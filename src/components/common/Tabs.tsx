interface TabsProps<T extends string> {
  tabs: readonly T[];
  currentTab: T;
  onChange: (tab: T) => void;
}

export default function Tabs<T extends string>({ tabs, currentTab, onChange }: TabsProps<T>) {
  return (
    <div className="flex gap-2 border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 ${currentTab === tab ? "border-b-2 border-black font-bold" : ""}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
