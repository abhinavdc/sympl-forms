import Builder from "@/pages/Builder";
import Preview from "@/pages/Preview";
import Responses from "@/pages/Responses";

export const PREVIEW_TAB = "preview";

export const items: NavItem[] = [
  {
    value: "builder",
    label: "Builder",
    component: Builder
  },
  { value: "responses", label: "Responses", component: Responses },
  { value: PREVIEW_TAB, label: "Preview", component: Preview },
];

export interface NavItem {
  value: string;
  label: string;
  component: React.ComponentType;
}
