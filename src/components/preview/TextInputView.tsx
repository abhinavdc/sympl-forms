import { Field, Input } from "@chakra-ui/react";
import QuestionViewContainer from "./QuestionViewContainer";
import { Question } from "@/data/types";

export default function TextInputView({
  errors,
  data,
  onChange,
}: {
  errors: string[],
  data: Question;
  onChange: (value: string) => void;
}) {
  return (
    <QuestionViewContainer>
      <Field.Root required={data.meta.required} invalid={!!errors?.length}>
        <Field.Label>
          {data.meta.label}
          <Field.RequiredIndicator />
        </Field.Label>
        <Input
          _hover={{ bg: "blackAlpha.50" }}
          _focusVisible={{
            bg: "gray.100",
            boxShadow: "0 0px 0 0 black inset",
          }}
          variant="flushed"
          w="100%"
          maxW="400px"
          type="text"
          placeholder="Enter your answer here"
          value={data.value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Field.ErrorText>
          {errors?.[0]}
        </Field.ErrorText>
      </Field.Root>

    </QuestionViewContainer>
  );
}
