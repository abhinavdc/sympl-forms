import { Field, Input } from "@chakra-ui/react";
import QuestionContainer from "./QuestionContainer";
import { Question } from "@/data/store";

export default function FormHeader({
  data,
  onRemove,
}: {
  data: Question;
  onRemove: VoidFunction;
}) {
  return (
    <QuestionContainer hideFooter onRemove={onRemove}>
      <Field.Root h="60px" p="10px">
        <Field.Label>
          <Input
            w="400px"
            fontSize="xl"
            variant="flushed"
            type="text"
            placeholder="Enter Form Name"
            value={data.meta.label}
          />
        </Field.Label>
      </Field.Root>
    </QuestionContainer>
  );
}
