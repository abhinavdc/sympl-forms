import QuestionViewSwitch from "@/components/preview/QuestionViewSwitch";
import PageLoader from "@/components/ui/PageLoader";
import { useFormBuilderStore, useResponsesStore } from "@/data/store";
import { FormErrors, Question } from "@/data/types";
import { validateForm } from "@/helper/validations";
import { useTemporaryFlag } from "@/hooks/useTemporaryHook";
import { Button, VStack, Alert } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const isEmpty = (obj: object) => Object.keys(obj).length === 0;

function FormValidationAlert() {
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Description>
          Your form has some errors. Please fix them and try again.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}

function FormResetAlert() {
  return (
    <Alert.Root status="success">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Description>
          Your form has some submitted. All Fields have been reset.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}

export default function Preview() {
  const { questions, getQuestions, fetchingQuestions, updateQuestion } =
    useFormBuilderStore();
    
  const { submitResponse, submittingResponse } =
    useResponsesStore();

  const [errors, setErrors] = useState<FormErrors>({});

  const { flag: showAlertFlag, activate: showSuccessAlert } =
    useTemporaryFlag(10000);

  useEffect(() => {
    if (!questions.length) {
      getQuestions();
    }
  }, [getQuestions, questions.length]);

  function handleDataChange(id: string, data: Question) {
    updateQuestion(id, data, false);
  }

  async function onSubmit() {
    const errors = validateForm(questions);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const status = await submitResponse(questions)
      if (status.success) {
        showSuccessAlert();
      }
    }

  }

  return (
    <VStack gap="5">
      {fetchingQuestions ? (
        <PageLoader />
      ) : (
        <>
          {questions.map((data) => (
            <QuestionViewSwitch
              errors={errors}
              key={data.id}
              onChange={(newData) =>
                handleDataChange(data.id, newData as Question)
              }
              data={data}
            />
          ))}

          <Button
            w="100%"
            colorPalette="cyan"
            variant="solid"
            my="2"
            onClick={onSubmit}
            loading={submittingResponse}
          >
            Submit
          </Button>

          {showAlertFlag && isEmpty(errors) && <FormResetAlert />}

          {!isEmpty(errors) && <FormValidationAlert />}
        </>
      )}
    </VStack>
  );
}
