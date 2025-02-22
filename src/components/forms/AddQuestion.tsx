import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@/components/ui/menu";
import { QUESTION_TYPE } from "@/data/constants";
import { Button, IconButton } from "@chakra-ui/react";
import { LuHash, LuList, LuSquarePlus, LuText } from "react-icons/lu";

const horizontalMenuItems = [
  { label: "Text", value: QUESTION_TYPE.TEXT, icon: <LuText /> },
  { label: "Number", value: QUESTION_TYPE.NUMBER, icon: <LuHash /> },
  { label: "Select", value: QUESTION_TYPE.SELECT, icon: <LuList /> },
];

export default function AddQuestion({ onClick } : { onClick: (type: QUESTION_TYPE) => void}) {
  return (
    <MenuRoot positioning={{ placement: "right-start"}}>
      <MenuTrigger asChild>
        <IconButton variant="subtle" colorPalette="pink" size="sm">
          <LuSquarePlus />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        {horizontalMenuItems.map((item) => (
          <MenuItem  cursor="pointer" key={item.value} value={item.value} gap="1" onClick={() => onClick(item.value)}>
            {item.icon}
            {item.label}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
}
