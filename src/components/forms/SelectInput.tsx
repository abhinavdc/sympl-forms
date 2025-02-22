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
import { Question } from "@/data/store";
import { LuCircleMinus, LuPlus } from "react-icons/lu";

export default function SelectInput({
  onChange,
  data,
  onRemove,
  ...rest
}: {
  onRemove: VoidFunction;
  data: Question;
  onChange: (data: Question) => void;
} & InputProps) {
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
        options: data.meta.options.map((option, optionIndex) =>
          optionIndex === index ? value : option
        ),
      },
    });
  }

  return (
    <QuestionContainer type={data.type} icon={data.icon} onRemove={onRemove}>
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
          />
        </Field.Label>
        <VStack alignItems="flex-start">
          {data.meta.options.map((x, index) => (
            <HStack>
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
