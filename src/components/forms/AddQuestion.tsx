import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@/components/ui/menu";
import { QUESTION_TYPE, QUESTION_TYPE_ICON } from "@/data/constants";
import { Icon, IconButton } from "@chakra-ui/react";
import { LuSquarePlus } from "react-icons/lu";

const horizontalMenuItems = [
  { label: "Text", value: QUESTION_TYPE.TEXT, icon: QUESTION_TYPE_ICON[QUESTION_TYPE.TEXT] },
  { label: "Number", value: QUESTION_TYPE.NUMBER, icon: QUESTION_TYPE_ICON[QUESTION_TYPE.NUMBER] },
  { label: "Select", value: QUESTION_TYPE.SELECT, icon: QUESTION_TYPE_ICON[QUESTION_TYPE.SELECT] },
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
            <Icon as={item.icon} />
            {item.label}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
}
