import { Field, Input, InputProps } from "@chakra-ui/react";
import QuestionContainer from "./QuestionContainer";
import { Ref } from "react";
import { Question } from "@/data/types";

export default function NumberInput({
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
      onRemove={onRemove}
      removing={removing}
    >
      <Field.Root px="5" py="2">
        <Field.Label justifyContent="space-between" w="100%" p="5px">
          <Input
            _hover={{ bg: "blackAlpha.50" }}
            _focusVisible={{
              bg: "gray.100",
              boxShadow: "0 0px 0 0 black inset",
            }}
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
