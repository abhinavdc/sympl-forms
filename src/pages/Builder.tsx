import AddQuestion from "@/components/forms/AddQuestion";
import QuestionDisplay from "@/components/forms/QuestionDisplay";
import { QUESTION_TYPE } from "@/data/constants";
import { PREVIEW_TAB } from "@/data/nav";
import { useFormBuilderStore, useTabStore } from "@/data/store";
import { Question, QuestionErrors } from "@/data/types";
import { isEmpty } from "@/helper/objectHelper";
import { QuestionsArraySchema } from "@/helper/validations";
import { useTemporaryFlag } from "@/hooks/useTemporaryHook";
import {
  Alert,
  Box,
  Button,
  Center,
  Flex,
  Link,
  Spinner,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ZodError } from "zod";


function FormValidationAlert({ valid }: { valid: boolean }) {
  const { setSelectedTab } = useTabStore()
  return (
    <Alert.Root status={valid ? "success" : "error"}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Description>
          {valid && 
          <Text>
            Your form has validated successfully,
            <Link ml="1" cursor="pointer" as="span" onClick={()=>setSelectedTab(PREVIEW_TAB)}>continue to Preview</Link>
          </Text>
          
          }
 
          {!valid && "Your form validation has failed. Please correct the errors and try again"}
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}

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
  const [errors, setErrors] = useState<QuestionErrors | null>(null);
  const { flag: showAlertFlag, activate: showValidationAlert } =
    useTemporaryFlag(10000);

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
      console.log("Validation successful:", validatedData);
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

  const validateQuestions = (questions: Question[]) => {
    const result = QuestionsArraySchema.safeParse(questions);
    return !result.success ? result.error.format() : null;
  };

  const validateForm = () => {
    const validationErrors = validateQuestions(questions);
    setErrors(validationErrors);

    showValidationAlert()
  };

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
                errors={errors?.[index] ?? null}
              />
            ))}
          </VStack>

          <Flex justifyContent="flex-end">
            <AddQuestion
              onClick={addQuestionHandler}
              loading={addingQuestion}
            />
          </Flex>
          <Button
            w="100%"
            colorPalette="pink"
            variant="solid"
            my="2"
            onClick={validateForm}
          >
            Validate
          </Button>
        </Box>
      )}

      {showAlertFlag && <FormValidationAlert valid={isEmpty(errors)} />}
    </>
  );
}
