import { Button, Field, Flex, Input, InputProps } from "@chakra-ui/react";
import QuestionContainer from "./QuestionContainer";
import { Ref, useState } from "react";
import { Question, QuestionErrors, ValidationRule } from "@/data/types";
import ValidationRules from "./ValidationRules";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

export default function NumberInput({
  ref,
  errors,
  onChange,
  data,
  onRemove,
  removing,
  ...rest
}: {
  ref: Ref<HTMLInputElement>;
  errors: QuestionErrors[number] | null;
  onRemove: VoidFunction;
  data: Question;
  onChange: (data: Question) => void;
  removing: boolean;
} & InputProps) {
  const [showValidationRules, setShowValidationRules] = useState(!!data.meta.validation.rules?.length);

  function onChangeRequiredHandler(checked: boolean) {
    onChange({
      ...data,
      meta: { ...data.meta, required: checked },
    });
  }

  function onRuleChangeHandler(updatedRules: ValidationRule[]) {
    onChange({
      ...data,
      meta: {
        ...data.meta,
        validation: { ...data.meta.validation, rules: updatedRules },
      },
    });
  }

  function handleCustomValidation() {
    if (showValidationRules) {
      // remove validation
      onRuleChangeHandler([]);
    }
    setShowValidationRules(!showValidationRules);
  }

  return (
    <QuestionContainer
      required={data.meta.required}
      onChangeRequired={onChangeRequiredHandler}
      type={data.type}
      onRemove={onRemove}
      removing={removing}
    >
      <Field.Root px="5" py="2" invalid={!!errors?.meta?.label?._errors}>
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
        <Field.ErrorText>{errors?.meta?.label?._errors[0]}</Field.ErrorText>
      </Field.Root>
      <Field.Root px="5" pb="2">
        <Input  value="number answer" disabled />
      </Field.Root>
      {showValidationRules && (
        <ValidationRules
          rules={data.meta.validation.rules}
          onChange={onRuleChangeHandler}
        />
      )}
      <Flex justifyContent="flex-end" px="5">
        <Button
          variant="outline"
          colorPalette="pink"
          size="xs"
          onClick={handleCustomValidation}
        >
          {showValidationRules ? <LuChevronUp /> : <LuChevronDown />}
          {`${showValidationRules ? "Remove" : "Add"} Custom Validation`}
        </Button>
      </Flex>
    </QuestionContainer>
  );
}
