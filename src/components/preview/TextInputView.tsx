import { Field, Input } from "@chakra-ui/react";
import QuestionViewContainer from "./QuestionViewContainer";
import { Question } from "@/data/types";

export default function TextInputView({
  data,
  onChange,
}: {
  data: Question;
  onChange: (value: number) => void;
}) {
  return (
    <QuestionViewContainer>
      <Field.Root required={data.meta.required}>
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
          w="400px"
          type="text"
          placeholder="Enter your answer here"
          value={data.value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </Field.Root>
    </QuestionViewContainer>
  );
}
