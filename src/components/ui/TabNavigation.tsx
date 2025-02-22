import { Tabs } from "@chakra-ui/react";
import { useTabStore } from "@/data/store";

export const TabNavigation = () => {
  const { tabs, selectedTab, setSelectedTab } = useTabStore();

  return (
    <Tabs.Root
      value={selectedTab}
      onValueChange={(e) => setSelectedTab(e.value)}
      variant="plain"
      size="sm"
      colorPalette="gray"
    >
      <Tabs.List
        alignItems="center"
        borderWidth="1px"
        p="1"
        h="10"
        borderRadius="l3"
        bg={{ base: "bg.muted", _dark: "transparent" }}
      >
        {tabs.map(({ value, label }) => (
          <Tabs.Trigger key={value} value={value} h="8">
            {label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator
          borderRadius="l2"
          bg={{ base: "white", _dark: "bg.subtle" }}
        />
      </Tabs.List>
    </Tabs.Root>
  );
};
