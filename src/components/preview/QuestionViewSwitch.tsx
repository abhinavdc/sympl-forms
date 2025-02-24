import { QUESTION_TYPE } from "@/data/constants";
import { FormErrors, Question } from "@/data/types";
import FormHeaderView from "./FormHeaderView";
import NumberInputView from "./NumberInputView";
import TextInputView from "./TextInputView";
import SelectInputView from "./SelectInputView";

const QuestionViewSwitch = ({
  errors,
  data,
  onChange,
}: {
  errors: FormErrors,
  data: Question;
  onChange: (data: Question) => void;
}) => {
  function getInputView(data: Question) {
    switch (data.type) {
      case QUESTION_TYPE.FORM_HEADER:
        return <FormHeaderView data={data} />;
      case QUESTION_TYPE.NUMBER:
        return (
          <NumberInputView
            errors={errors[data.id]}
            data={data}
            onChange={(value) => onChange({ ...data, value })}
          />
        );
      case QUESTION_TYPE.TEXT:
        return (
          <TextInputView
          errors={errors[data.id]}
          data={data}
            onChange={(value) => onChange({ ...data, value })}
          />
        );
      case QUESTION_TYPE.SELECT:
        return (
          <SelectInputView
          errors={errors[data.id]}
          data={data}
            onChange={(value) =>
              onChange({ ...data, value: value[0] as string })
            }
          />
        );
    }
  }

  return getInputView(data);
};

export default QuestionViewSwitch;
