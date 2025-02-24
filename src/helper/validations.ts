import { QUESTION_TYPE } from "@/data/constants";
import { Question, ValidationRule } from "@/data/types";

import { z } from "zod";

// Rule schemas
const RegexRuleSchema = z.object({
  type: z.literal("regex"),
  pattern: z.string(),
  message: z.string().optional(),
});

const LengthRuleSchema = z.object({
  type: z.literal("length"),
  min: z.number().optional(),
  max: z.number().optional(),
  message: z.string().optional(),
});

const GreaterThanRuleSchema = z.object({
  type: z.literal("greater_than"),
  value: z.number(),
  message: z.string().optional(),
});

const LessThanRuleSchema = z.object({
  type: z.literal("less_than"),
  value: z.number(),
  message: z.string().optional(),
});

const ValidationRuleSchema = z.union([
  RegexRuleSchema,
  LengthRuleSchema,
  GreaterThanRuleSchema,
  LessThanRuleSchema,
]);

const BaseQuestionSchema = z.object({
  id: z.string().min(1, "ID is required"),
  editable: z.boolean(),
  meta: z.object({
    label: z.string().min(1, "Label is required"),
    options: z.array(z.string()),
    required: z.boolean(),
    validation: z.object({
      rules: z.array(ValidationRuleSchema),
    }),
  }),
  value: z.union([z.string(), z.number()]).optional(),
});


const TextQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QUESTION_TYPE.TEXT),
});

const NumberQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QUESTION_TYPE.NUMBER),
});

const SelectQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QUESTION_TYPE.SELECT),
  meta: BaseQuestionSchema.shape.meta.extend({
    options: z.array(z.string()).min(1, "At least one option is required"),
  }),
});

const FormHeaderSchema = BaseQuestionSchema.extend({
  type: z.literal(QUESTION_TYPE.FORM_HEADER),
  meta: BaseQuestionSchema.shape.meta.pick({
    label: true,
  }),
});

export const QuestionSchema = z.union([
  TextQuestionSchema,
  NumberQuestionSchema,
  SelectQuestionSchema,
  FormHeaderSchema,
]);

export const QuestionsArraySchema = z.array(QuestionSchema);

export const validateRules = (
  value: string | number | undefined,
  rules: ValidationRule[]
): string[] => {
  const errors: string[] = [];

  for (const rule of rules) {
    switch (rule.type) {
      case "regex":
        if (typeof value !== "string" || !new RegExp(rule.pattern).test(value)) {
          errors.push(rule.message || "Invalid format.");
        }
        break;

      case "length":
        if (typeof value === "string" || typeof value === "number") {
          if (rule.min !== undefined && String(value).length < rule.min) {
            errors.push(rule.message || `Must be at least ${rule.min} characters.`);
          }
          if (rule.max !== undefined && String(value).length > rule.max) {
            errors.push(rule.message || `Must be at most ${rule.max} characters.`);
          }
        }
        break;

      case "greater_than":
        if (typeof value === "number" && value <= rule.value) {
          errors.push(rule.message || `Must be greater than ${rule.value}.`);
        }
        break;

      case "less_than":
        if (typeof value === "number" && value >= rule.value) {
          errors.push(rule.message || `Must be less than ${rule.value}.`);
        }
        break;

    }
  }

  return errors;
};

export function validateForm(data: Question[]) {
  const errors: Record<string, string[]> = {};

  data.forEach((q) => {
    const fieldErrors: string[] = [];

    const parsed = QuestionSchema.safeParse(q);
    if (!parsed.success) {
      fieldErrors.push("Invalid question data.");
    }

    // Required check
    if (q.meta.required && (q.value === undefined || q.value === "")) {
      fieldErrors.push("This field is required.");
    }

    // Custom rules check
    const ruleErrors = validateRules(q.value, q.meta.validation.rules);
    fieldErrors.push(...ruleErrors);

    if (fieldErrors.length > 0) {
      errors[q.id] = fieldErrors;
    }
  });

  return errors;
}
