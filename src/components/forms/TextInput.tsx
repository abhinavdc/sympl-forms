import { Field, Flex, Input, InputProps } from "@chakra-ui/react";
import QuestionContainer from "./QuestionContainer";

export default function TextInput({ onRemove, ...rest }: { onRemove: VoidFunction} & InputProps) {
  return (
    <QuestionContainer onRemove={onRemove}>
      <Field.Root>
        <Flex justifyContent="space-between" w="100%">
          <Field.Label>
            <Input type="text" placeholder="Enter Question Here" {...rest} />
          </Field.Label>
         
        </Flex>
        <Input disabled />
      </Field.Root>
    </QuestionContainer>
  );
}
