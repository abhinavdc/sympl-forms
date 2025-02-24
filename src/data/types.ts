import { IconType } from "react-icons";
import { QUESTION_TYPE } from "./constants";
import { QuestionsArraySchema } from "@/helper/validations";
import { z } from "zod";

export type RegexRule = {
  type: "regex";
  pattern: string;
  message?: string;
};

export type LengthRule = {
  type: "length";
  min?: number;
  max?: number;
  message?: string;
};

export type GreaterThanRule = {
  type: "greater_than";
  value: number;
  message?: string;
};

export type LessThanRule = {
  type: "less_than";
  value: number;
  message?: string;
};

export type ValidationRule =
  | RegexRule
  | LengthRule
  | GreaterThanRule
  | LessThanRule;

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

export interface ValidationOnChange {
  ruleType: ValidationRule["type"];
  value: number | string;
  extraProp?:
    | keyof LengthRule
    | keyof RegexRule
    | keyof GreaterThanRule
    | keyof LessThanRule;
}

export type QuestionErrors = z.inferFormattedError<typeof QuestionsArraySchema>;