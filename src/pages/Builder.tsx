import AddQuestion from "@/components/forms/AddQuestion";
import QuestionDisplay from "@/components/forms/QuestionDisplay";
import { QUESTION_TYPE } from "@/data/constants";
import { useFormBuilderStore } from "@/data/store";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";

export default function Builder() {
  const { questions, addQuestion, removeQuestion } = useFormBuilderStore();

  function addQuestionHandler(type: QUESTION_TYPE) {
    addQuestion(type)
  }

  function removeQuestionHandler(id: string) {
    removeQuestion(id)
  }
  return (
    <Box w="100%">
      <VStack w="100%" gap="4" mb="10px">
        {questions.map((data) => (
          <QuestionDisplay  data={data} onRemove={() => removeQuestionHandler(data.id)} />
        ))}
      </VStack>
      
      <Flex justifyContent="flex-end">

        <AddQuestion onClick={addQuestionHandler} />
      </Flex>
      <Button w="100%" colorPalette="pink" variant="solid" my="2">
        Publish
      </Button>
      

    </Box>
  );
}
