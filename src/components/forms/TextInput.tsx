import { Field, Input, InputProps } from "@chakra-ui/react";
import QuestionContainer from "./QuestionContainer";
import { Ref } from "react";
import { Question } from "@/data/types";

export default function TextInput({
  ref,
  onChange,
  data,
  onRemove,
  removing,
  ...rest
}: {
  ref: Ref<HTMLInputElement>;
  onRemove: VoidFunction;
  data: Question;
  onChange: (data: Question) => void;
  removing: boolean;
} & InputProps) {
  function onChangeRequiredHandler(checked: boolean) {
    onChange({
      ...data,
      meta: { ...data.meta, required: checked },
    });
  }

  return (
    <QuestionContainer
      required={data.meta.required}
      onChangeRequired={onChangeRequiredHandler}
      type={data.type}
      icon={data.icon}
      onRemove={onRemove}
      removing={removing}
    >
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

        <Input value="short text answer" disabled />
      </Field.Root>
    </QuestionContainer>
  );
}
