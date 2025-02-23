import AddQuestion from "@/components/forms/AddQuestion";
import QuestionDisplay from "@/components/forms/QuestionDisplay";
import { QUESTION_TYPE } from "@/data/constants";
import { useFormBuilderStore } from "@/data/store";
import { Question } from "@/data/types";
import { QuestionsArraySchema } from "@/helper/validations";
import { Box, Button, Center, Flex, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { ZodError } from "zod";

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
  const isInitialRender = useRef(true);

  useEffect(() => {
    return () => {
      isInitialRender.current = true;
    };
  }, []);

  function addQuestionHandler(type: QUESTION_TYPE) {
    addQuestion(type);
  }

  function removeQuestionHandler(id: string) {
    removeQuestion(id);
  }

  function handleDataChange(id: string, data: Question) {
    try {
      const validatedData = QuestionsArraySchema.parse([data]);
      console.log("✅ Validation successful:", validatedData);
      updateQuestion(id, data, true);
    } catch (err) {
      if (err instanceof ZodError) {
        console.error(err.errors);
      }
      updateQuestion(id, data, false);
    }
  }

  useEffect(() => {
    if (!questions?.length) {
      getQuestions();
    }
  }, [getQuestions, questions?.length]);

  // Scroll to last question when array changes
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (lastQuestionRef.current && !addingQuestion) {
      lastQuestionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
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
