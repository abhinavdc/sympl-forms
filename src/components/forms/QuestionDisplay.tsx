import { InputProps } from "@chakra-ui/react";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import { QUESTION_TYPE } from "@/data/constants";
import FormHeader from "./FormHeader";
import { Question } from "@/data/store";

export default function QuestionDisplay({
  ...rest
}: {
  onRemove: VoidFunction;
  data: Question;
  onChange: (data: Question) => void;
} & InputProps) {
  function getQuestion(data: Question) {
    switch (data.type) {
      case QUESTION_TYPE.FORM_HEADER:
        return <FormHeader {...rest} />;
      case QUESTION_TYPE.NUMBER:
        return <NumberInput {...rest} />;
      case QUESTION_TYPE.TEXT:
        return <TextInput {...rest} />;
      case QUESTION_TYPE.SELECT:
        return (
          <SelectInput
            
            {...rest}
          />
        );
    }
  }

  return getQuestion(rest.data);
}
