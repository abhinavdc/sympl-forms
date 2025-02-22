import { Container, Flex } from "@chakra-ui/react";
import NavigationBar from "./components/ui/NavigationBar";
import "./App.css";

function App() {
  return (
    <>
    <Flex w="100vw" h="100vh" flexDir="column">
      <NavigationBar />
      <Container h="calc(100vh - 56px)" top="56px" bg="gray.100"></Container>
    </Flex>
    </>
  );
}

export default App;
