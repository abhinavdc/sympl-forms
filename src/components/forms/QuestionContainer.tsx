import { Box, Center, Flex, Icon, IconButton, VStack } from "@chakra-ui/react";
import { LuTrash } from "react-icons/lu";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";
import { QUESTION_TYPE, QUESTION_TYPE_ICON } from "@/data/constants";

export default function QuestionContainer({
  onRemove,
  removing,
  onChangeRequired,
  required,
  type,
  hideFooter,
  children,
}: {
  onRemove?: VoidFunction;
  removing?: boolean;
  onChangeRequired?: (checked: boolean) => void;
  required?: boolean;
  type?: QUESTION_TYPE;
  hideFooter?: boolean;
  children: React.ReactNode;
}) {
  return (
    <VStack
      bg="gray.50"
      w="100%"
      divideY="2px"
      border="1px solid"
      borderColor="gray.300"
      rounded="md"
      position="relative"
    >
      <Box w="100%">{children}</Box>
      {!hideFooter && (
        <Flex w="100%" h="50px" justifyContent="space-between" px="5px">
          {type && (
            <Tooltip content={type}>
              <Icon as={QUESTION_TYPE_ICON[type]} position="absolute" right="15px" top="15px" />
            </Tooltip>
          )}

          <Center px="10px">
            <Checkbox
              checked={required}
              onCheckedChange={(e) => onChangeRequired?.(!!e.checked)}
              size="sm"
            >
              Required
            </Checkbox>
          </Center>
          <Center>
            <IconButton
              size="xs"
              aria-label="Remove Question"
              variant="ghost"
              onClick={onRemove}
              loading={removing}
            >
              <LuTrash />
            </IconButton>
          </Center>
        </Flex>
      )}
    </VStack>
  );
}
