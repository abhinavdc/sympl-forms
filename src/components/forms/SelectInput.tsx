import {
  Button,
  Field,
  HStack,
  IconButton,
  Input,
  InputProps,
  VStack,
} from "@chakra-ui/react";
import QuestionContainer from "./QuestionContainer";
import { LuCircleMinus, LuPlus } from "react-icons/lu";
import { Ref } from "react";
import { Question } from "@/data/types";

export default function SelectInput({
  ref,
  onChange,
  data,
  onRemove,
  removing,
  ...rest
}: {
  removing: boolean,
  ref: Ref<HTMLInputElement>,
  onRemove: VoidFunction;
  data: Question;
  onChange: (data: Question) => void;
} & InputProps) {
  function onChangeRequiredHandler(checked: boolean) {
    onChange({
      ...data,
      meta: {
        ...data.meta,
        required: checked
      },
    });
  }

  function addOption() {
    onChange({
      ...data,
      meta: {
        ...data.meta,
        options: [...data.meta.options, `New Option ${data.meta.options.length}`],
      },
    });
  }

  function removeOption(index: number) {
    const options = [...data.meta.options];
    options.splice(index, 1);
    onChange({
      ...data,
      meta: {
        ...data.meta,
        options,
      },
    });
  }

  function updateOption(index: number, value: string) {
    onChange({
      ...data,
      meta: {
        ...data.meta,
        options: data.meta.options.map((option: string, optionIndex: number) =>
          optionIndex === index ? value : option
        ),
      },
    });
  }

  return (
    <QuestionContainer required={data.meta.required} onChangeRequired={onChangeRequiredHandler} type={data.type} onRemove={onRemove} removing={removing}>
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
            {...rest}
            ref={ref}
          />
        </Field.Label>
        <VStack alignItems="flex-start">
          {data.meta.options.map((x: string, index: number) => (
            <HStack key={index}>
              <Input
                value={x}
                onChange={(e) => updateOption(index, e.target.value)}
              />
              <IconButton
                onClick={() => removeOption(index)}
                size="xs"
                variant="plain"
                colorPalette="red"
              >
                <LuCircleMinus />
              </IconButton>
            </HStack>
          ))}
          <Button variant="ghost" size="xs" onClick={addOption}>
            <LuPlus /> Add Option
          </Button>
        </VStack>
      </Field.Root>
    </QuestionContainer>
  );
}
