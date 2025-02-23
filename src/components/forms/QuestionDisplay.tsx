import { InputProps } from "@chakra-ui/react";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import { QUESTION_TYPE } from "@/data/constants";
import FormHeader from "./FormHeader";
import { Question } from "@/data/store";
import { forwardRef } from "react";

const QuestionDisplay = forwardRef(
  ({
    ...rest
  }: {
    removing: boolean;
    onRemove: VoidFunction;
    data: Question;
    onChange: (data: Question) => void;
  } & InputProps, ref: React.Ref<HTMLInputElement>) => {
    function getQuestion(data: Question) {
      switch (data.type) {
        case QUESTION_TYPE.FORM_HEADER:
          return <FormHeader ref={ref} {...rest} />;
        case QUESTION_TYPE.NUMBER:
          return <NumberInput ref={ref}  {...rest} />;
        case QUESTION_TYPE.TEXT:
          return <TextInput ref={ref}  {...rest} />;
        case QUESTION_TYPE.SELECT:
          return <SelectInput ref={ref}  {...rest} />;
      }
    }

    return getQuestion(rest.data);
  }
);

export default QuestionDisplay;
