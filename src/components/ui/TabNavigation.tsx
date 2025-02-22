import { Tabs, type TabsRootProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { NavItem } from "../../data/nav";

interface Props extends TabsRootProps {
  items?: NavItem[];
}

export const TabNavigation = (props: Props) => {
  const { items = [], ...rest } = props;
  const [activeTab, setActiveTab] = useState(items[0]?.value);
  useEffect(() => {
    setActiveTab(items[0]?.value);
  }, [items]);

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={(e) => setActiveTab(e.value)}
      variant="plain"
      size="sm"
      colorPalette="gray"
      {...rest}
    >
      <Tabs.List
        alignItems="center"
        borderWidth="1px"
        p="1"
        h="10"
        borderRadius="l3"
        bg={{ base: "bg.muted", _dark: "transparent" }}
      >
        {items.map(({ value, label }) => (
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
