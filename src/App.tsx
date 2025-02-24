import { Container, Flex } from "@chakra-ui/react";
import NavigationBar from "./components/ui/NavigationBar";
import "./App.css";
import TabContent from "./components/ui/TabContent";

function App() {
  return (
    <>
    <Flex w="100vw" h="100vh" flexDir="column"  bg="cyan.100">
      <NavigationBar />
      <Container h="calc(100vh - 56px)" top="56px" maxW="4xl" overflow="auto" py="20px">
        <TabContent />
      </Container>
    </Flex>
    </>
  );
}

export default App;
