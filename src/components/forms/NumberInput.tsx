import { Field, Input, InputProps } from "@chakra-ui/react";
import QuestionContainer from "./QuestionContainer";
import { Question } from "@/data/store";
import { Ref } from "react";

export default function NumberInput({
  ref,
  onChange,
  data,
  onRemove,
  removing,
  ...rest
}: { ref: Ref<HTMLInputElement>, onRemove: VoidFunction; data: Question; onChange: (data: Question) => void, removing: boolean } & InputProps) {
  return (
    <QuestionContainer type={data.type} icon={data.icon} onRemove={onRemove} removing={removing}>
      <Field.Root px="5">
        <Field.Label justifyContent="space-between" w="100%" p="5px">
          <Input
            _focusVisible={{ boxShadow: "0 0px 0 0 black inset" }}
            variant="flushed"
            w="400px"
            type="text"
            placeholder="Enter Question Here"
            value={data.meta.label}
            onChange={(e) =>
              onChange({
                ...data,
                meta: { ...data.meta, label: e.target.value },
              })
            }
            ref={ref}
            {...rest}
          />
        </Field.Label>
        <Input value="number answer" disabled />
      </Field.Root>
    </QuestionContainer>
  );
}
