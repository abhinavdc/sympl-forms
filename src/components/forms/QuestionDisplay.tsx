import { InputProps } from "@chakra-ui/react";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import { QUESTION_TYPE } from "@/data/constants";
import FormHeader from "./FormHeader";
import { Question } from "@/data/store";

export default function QuestionDisplay({
  onRemove,
  data,
  ...rest
}: { onRemove: VoidFunction; data: Question } & InputProps) {
  
    function getQuestion(data: Question) {
    switch (data.type) {
      case QUESTION_TYPE.FORM_HEADER:
        return <FormHeader onRemove={onRemove} data={data} {...rest} />;
      case QUESTION_TYPE.NUMBER:
        return <NumberInput onRemove={onRemove} {...rest} />;
      case QUESTION_TYPE.TEXT:
        return <TextInput onRemove={onRemove} {...rest} />;
      case QUESTION_TYPE.SELECT:
        return <SelectInput onRemove={onRemove} {...rest} />;
    }
  }

  return getQuestion(data);
}
