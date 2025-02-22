import Builder from "@/pages/Builder";
import Preview from "@/pages/Preview";
import Responses from "@/pages/Responses";
import { JSX } from "react";

export const items: NavItem[] = [
  {
    value: "builder",
    label: "Builder",
    component: Builder
  },
  { value: "responses", label: "Responses", component: Responses },
  { value: "preview", label: "Preview", component: Preview },
];

export interface NavItem {
  value: string;
  label: string;
  component: () => JSX.Element;
}
