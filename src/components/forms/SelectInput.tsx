import { Field, Input } from "@chakra-ui/react";
import QuestionContainer from "./QuestionContainer";

export default function SelectInput({ onRemove, ...rest }: { onRemove: VoidFunction} & InputProps) {
  return (
        <QuestionContainer onRemove={onRemove}>
          <Field.Root>
            <Field.Label>
              <Input type="text" placeholder="Enter Question Here" {...rest} />
            </Field.Label>
            <Input />
          </Field.Root>
        </QuestionContainer>
  )
}
