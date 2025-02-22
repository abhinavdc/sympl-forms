import { Box, Center, Flex, IconButton, VStack } from "@chakra-ui/react";
import { LuTrash } from "react-icons/lu";
import { Checkbox } from "../ui/checkbox";

export default function QuestionContainer({
  onRemove,
  hideFooter,
  children,
}: {
  onRemove: VoidFunction;
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
    >
      <Box w="100%">{children}</Box>
      {!hideFooter && (
        <Flex w="100%" h="50px" justifyContent="space-between" px="5px">
          <Center px="10px">
            <Checkbox size="sm">Required</Checkbox>
          </Center>
          <Center>
            <IconButton
              size="xs"
              aria-label="Remove Question"
              variant="ghost"
              onClick={onRemove}
            >
              <LuTrash />
            </IconButton>
          </Center>
        </Flex>
      )}
    </VStack>
  );
}
