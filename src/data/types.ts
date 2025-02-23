import { IconType } from "react-icons";
import { QUESTION_TYPE } from "./constants";

export type ValidationType = "regex" | "length";

export interface ValidationRule {
  type: ValidationType;
  pattern: string;
}

export interface Question {
  id: string;
  type: QUESTION_TYPE;
  editable: boolean;
  icon?: IconType;

  meta: {
    label: string;
    options: string[];
    required: boolean;
    validation: {
      rules: ValidationRule[];
    };
  };
}