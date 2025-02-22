import { useTabStore } from "@/data/store";

export default function TabContent() {
  const { tabs, selectedTab } = useTabStore();

  const comp = tabs.find((x) => x.value === selectedTab)?.component;
  return comp?.();
}
