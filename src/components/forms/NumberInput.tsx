import { Field, Input, InputProps } from "@chakra-ui/react";
import QuestionContainer from "./QuestionContainer";

export default function NumberInput({ onRemove, ...rest }: { onRemove: VoidFunction} & InputProps) {
  return (
    <QuestionContainer  onRemove={onRemove}>
      <Field.Root>
        <Field.Label px="10px">
          <Input variant="flushed" type="text" width="400px" placeholder="Enter Question Here" {...rest} />
        </Field.Label>
        <Input disabled value="short answer text" />
      </Field.Root>
    </QuestionContainer>
  );
}
