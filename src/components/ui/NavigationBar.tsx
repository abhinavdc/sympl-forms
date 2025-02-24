import { Container, Flex, Grid, HStack } from "@chakra-ui/react";
import { TabNavigation } from "./TabNavigation";
import { Logo } from "./Logo";
import { Avatar } from "./avatar";
import { useFormBuilderStore } from "@/data/store";
import SavingIndicator from "./SavingIndicator";

export default function NavigationBar() {
  const { addingQuestion, removingQuestionId, updatingQuestionId } =
    useFormBuilderStore();

  return (
    <Container py="2" w="100%" top="0" position="absolute" bg="gray.50">
      <Grid templateColumns="auto 1fr auto" gap="3" alignItems="center">
        <HStack>
          <Logo />
        </HStack>
        <Flex justify="center">
          <TabNavigation />
        </Flex>
        <HStack
          display={{ smDown: "none", base: "flex" }}
          w={{ md: "140px", smDown: "unset" }}
          justifyContent="flex-end"
          gap="5"
        >
          <SavingIndicator
            isSaving={
              !!removingQuestionId || addingQuestion || !!updatingQuestionId
            }
          />

          <Avatar display={{ lg: "block", mdDown: "none"}} src="https://i.pravatar.cc/300" name="Abhinav" />
        </HStack>
      </Grid>
    </Container>
  );
}
