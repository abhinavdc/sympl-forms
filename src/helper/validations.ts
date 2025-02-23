import { QUESTION_TYPE } from "@/data/constants";

import { z } from "zod";

// Base schema for every question
const BaseQuestionSchema = z.object({
    id: z.string().min(1, "ID is required"),
    editable: z.boolean(),
    meta: z.object({
      label: z.string().min(1, "Label is required"),
      options: z.array(z.string()),
      required: z.boolean(),
      validation: z.object({
        rules: z.array(
          z.object({
            type: z.union([z.literal("regex"), z.literal("length")]),
            pattern: z.string(),
          })
        ),
      }),
    }),
  });

/// For TEXT and NUMBER types, no extra options are needed
const TextQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QUESTION_TYPE.TEXT),
});

const NumberQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QUESTION_TYPE.NUMBER),
});

// For SELECT, options must have at least one value
const SelectQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QUESTION_TYPE.SELECT),
  meta: BaseQuestionSchema.shape.meta.extend({
    options: z.array(z.string()).min(1, "At least one option is required"),
  }),
});

// For FORM_HEADER, only label is required
const FormHeaderSchema = BaseQuestionSchema.extend({
  type: z.literal(QUESTION_TYPE.FORM_HEADER),
  meta: BaseQuestionSchema.shape.meta.pick({
    label: true,
  }),
});

// Combine into a union type for dynamic form
export const QuestionSchema = z.union([
  TextQuestionSchema,
  NumberQuestionSchema,
  SelectQuestionSchema,
  FormHeaderSchema
]);

// For an array of questions
export const QuestionsArraySchema = z.array(QuestionSchema);

