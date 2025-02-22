import { Container, Flex, Grid, HStack } from "@chakra-ui/react";
import { TabNavigation } from "./TabNavigation";
import { Logo } from "./Logo";
import { Avatar } from "./avatar";

export default function NavigationBar() {

  return (
    <Container py="2" w="100%" top="0" position="absolute" bg="gray.50">
      <Grid
        templateColumns="auto 1fr auto"
        gap="3"
        alignItems="center"
      >
        <HStack>
          <Logo />
        </HStack>
        <Flex justify="center">
          <TabNavigation />
        </Flex>
        <HStack maxW="140px" justifyContent="flex-end">
          <Avatar src="https://i.pravatar.cc/300" name="Abhinav"/>
        </HStack>
      </Grid>
    </Container>
  );
}
