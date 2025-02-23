import { Center, Container, Flex, Grid, HStack, Spinner, Text } from "@chakra-ui/react";
import { TabNavigation } from "./TabNavigation";
import { Logo } from "./Logo";
import { Avatar } from "./avatar";
import { useFormBuilderStore } from "@/data/store";
import { keyframes } from "@emotion/react";

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

export default function NavigationBar() {
  const { addingQuestion, removingQuestionId } = useFormBuilderStore();


  return (
    <Container py="2" w="100%" top="0" position="absolute" bg="gray.50">
      <Grid templateColumns="auto 1fr auto" gap="3" alignItems="center">
        <HStack>
          <Logo />
        </HStack>
        <Flex justify="center">
          <TabNavigation />
        </Flex>
        <HStack w={{ md: "140px", sm: "unset" }} justifyContent="flex-end" gap="5">
          {(removingQuestionId ||addingQuestion) && (
            <Center>
              <Text color="gray.500" fontSize="sm" animation={`${blink} 1s infinite ease-in-out`}>Saving...</Text>

            </Center>
           
          )}
          <Avatar src="https://i.pravatar.cc/300" name="Abhinav" />
        </HStack>
      </Grid>
    </Container>
  );
}
