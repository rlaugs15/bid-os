import { useState } from "react";

export default function useTabMap<TTab extends string, TValue extends string>(
  tabMap: Record<TTab, TValue>,
) {
  const tabs = Object.keys(tabMap) as TTab[];

  const [currentTab, setCurrentTab] = useState<TTab>(tabs[0]);

  const currentValue = tabMap[currentTab];

  return {
    tabs,
    currentTab,
    setCurrentTab,
    currentValue,
  };
}
