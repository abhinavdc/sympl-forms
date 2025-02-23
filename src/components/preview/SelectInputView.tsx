import { Question } from "@/data/types";
import {
  createListCollection,
  Field,
  FieldRequiredIndicator,
} from "@chakra-ui/react";
import QuestionViewContainer from "./QuestionViewContainer";
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";

export default function SelectInputView({
  data,
  onChange,
}: {
  data: Question;
  onChange: (value: string[]) => void;
}) {
  const options = createListCollection({
    items: data.meta.options.map((option) => {
      return { label: option, value: option };
    }),
  });
  return (
    <QuestionViewContainer>
      <Field.Root required={data.meta.required}>
        <SelectRoot
          collection={options}
          value={data.value ? [data.value as string] : []}
          onValueChange={(e) => onChange(e.value)}
          variant="outline"
          width="400px"
        >
          <SelectLabel>
            {data.meta.label}
            <FieldRequiredIndicator ml="1" />
          </SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            {options.items.map((option) => (
              <SelectItem item={option} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Field.Root>
    </QuestionViewContainer>
  );
}
