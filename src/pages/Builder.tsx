import AddQuestion from "@/components/forms/AddQuestion";
import QuestionDisplay from "@/components/forms/QuestionDisplay";
import { QUESTION_TYPE } from "@/data/constants";
import { Question, useFormBuilderStore } from "@/data/store";
import { Box, Button, Center, Flex, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function Builder() {
  const {
    questions,
    addQuestion,
    removeQuestion,
    removingQuestionId,
    updateQuestion,
    getQuestions,
    addingQuestion,
    fetchingQuestions,
  } = useFormBuilderStore();

  const lastQuestionRef = useRef<HTMLInputElement | null>(null);

  function addQuestionHandler(type: QUESTION_TYPE) {
    addQuestion(type);
  }

  function removeQuestionHandler(id: string) {
    removeQuestion(id);
  }

  function handleDataChange(id: string, data: Question) {
    updateQuestion(id, data);
  }

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  // Scroll to last question when array changes
  useEffect(() => {
    if (lastQuestionRef.current && !addingQuestion) {
      lastQuestionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [addingQuestion]);

  return (
    <>
      {fetchingQuestions ? (
        <Center w="100%" h="400px">
          <Spinner />
        </Center>
      ) : (
        <Box w="100%">
          <VStack w="100%" gap="4" mb="10px">
            {questions.map((data, index) => (
              <QuestionDisplay
                key={data.id}
                ref={index === questions.length - 1 ? lastQuestionRef : null}
                onChange={(newData) =>
                  handleDataChange(data.id, newData as Question)
                }
                data={data}
                removing={removingQuestionId === data.id}
                onRemove={() => removeQuestionHandler(data.id)}
              />
            ))}
          </VStack>

          <Flex justifyContent="flex-end">
            <AddQuestion
              onClick={addQuestionHandler}
              loading={addingQuestion}
            />
          </Flex>
          <Button w="100%" colorPalette="pink" variant="solid" my="2">
            Publish
          </Button>
        </Box>
      )}
    </>
  );
}
