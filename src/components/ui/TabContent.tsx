import { items } from "@/data/nav";
import { useTabStore } from "@/data/store";

export default function TabContent() {
  const { selectedTab } = useTabStore();
  const selectedItem = items.find((x) => x.value === selectedTab)

  if (!selectedItem) return null;

  const Component = selectedItem.component;

  return <Component />
}
