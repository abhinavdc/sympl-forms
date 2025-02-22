import { Field, Input } from "@chakra-ui/react";
import QuestionContainer from "./QuestionContainer";
import { Question } from "@/data/store";

export default function FormHeader({
    onChange,
  data,
  onRemove,
}: {
    onChange: (data: Question) => void;
  data: Question;
  onRemove: VoidFunction;
}) {
  return (
    <QuestionContainer hideFooter onRemove={onRemove}>
      <Field.Root h="60px" p="10px">
        <Field.Label>
          <Input
            w="400px"
            _focusVisible={{ boxShadow: "0 0px 0 0 black inset"}}
            fontSize="xl"
            variant="flushed"
            type="text"
            placeholder="Enter Form Name"
            onChange={(e) =>
                onChange({
                  ...data,
                  meta: { ...data.meta, label: e.target.value },
                })
              }
            value={data.meta.label}
          />
        </Field.Label>
      </Field.Root>
    </QuestionContainer>
  );
}
