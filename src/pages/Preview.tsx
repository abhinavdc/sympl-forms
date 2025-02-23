import QuestionViewSwitch from "@/components/preview/QuestionViewSwitch";
import { useFormBuilderStore } from "@/data/store";
import { Question } from "@/data/types";
import { Button, Center, Spinner, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Preview() {
  const { questions, getQuestions, fetchingQuestions, updateQuestion } =
    useFormBuilderStore();

  useEffect(() => {
    if (!questions.length) {
      getQuestions();
    }
  }, [getQuestions, questions.length]);

  function handleDataChange(id: string, data: Question) {
    updateQuestion(id, data, false);
  }

  return (
    <VStack gap="5">
      {fetchingQuestions ? (
        <Center h="400px">
          <Spinner />
        </Center>
      ) : (
        <>
          {questions.map((data) => (
            <QuestionViewSwitch
              key={data.id}
              onChange={(newData) =>
                handleDataChange(data.id, newData as Question)
              }
              data={data}
            />
          ))}

          <Button w="100%" colorPalette="cyan" variant="solid" my="2">
            Submit
          </Button>
        </>
      )}
    </VStack>
  );
}
