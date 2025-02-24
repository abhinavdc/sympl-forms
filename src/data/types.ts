import { IconType } from "react-icons";
import { QUESTION_TYPE } from "./constants";

type RegexRule = {
  type: "regex";
  pattern: string;
  message?: string;
};

type LengthRule = {
  type: "length";
  min?: number;
  max?: number;
  message?: string;
};

type GreaterThanRule = {
  type: "greater_than";
  value: number;
  message?: string;
};

type LessThanRule = {
  type: "less_than";
  value: number;
  message?: string;
};

type EqualsRule = {
  type: "equals";
  value: string | number;
  message?: string;
};

export type ValidationRule = RegexRule | LengthRule | GreaterThanRule | LessThanRule | EqualsRule;

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

  value?: string | number;
}

export type FormErrors = Record<string, string[]>;

export class Response {
  submissionId: string;
  question: Question[];
  submittedDate: string;

  constructor(question: Question[]) {
    this.submissionId = this.generateId();
    this.question = question;
    this.submittedDate = new Date().toISOString();
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 10); // Random 8-character ID
  }
}