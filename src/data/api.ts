import { capitalizeFirstLetter } from "@/helper/textHelper";
import { QUESTION_TYPE, QUESTION_TYPE_ICON } from "./constants";
import { Question } from "./store";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
} from "unique-names-generator";

const STORAGE_KEY = "mock_questions";

function initQuestionFromType(type: QUESTION_TYPE): Question {
  return {
    id: String(Math.random()),
    type,
    editable: true,
    icon: QUESTION_TYPE_ICON[type],
    meta: {
      label: capitalizeFirstLetter(type as string) + " Question Goes Here",
      options: [],
      required: false,
      validation: {
        rules: [],
      },
    },
  };
}

const randomName = uniqueNamesGenerator({
  dictionaries: [adjectives, colors],
  separator: " ",
  style: "capital",
});

const FORM_HEADER_QUESTION = {
  id: String(Math.random()),
  type: QUESTION_TYPE.FORM_HEADER,
  editable: true,

  meta: {
    label: randomName + " Form",
    options: [],
    required: false,
    validation: {
      rules: [],
    },
  },
};

export const mockApi = {
  getQuestions: () =>
    new Promise<Question[]>((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(STORAGE_KEY);
        const parseData = data ? JSON.parse(data) : [];
        resolve(parseData.length ? parseData: [FORM_HEADER_QUESTION]);
      }, 2000); // Simulate network latency
    }),

  addQuestion: (value: QUESTION_TYPE) =>
    new Promise<Question>((resolve) => {
      setTimeout(() => {
        const newQuestion = initQuestionFromType(value);
        const data = localStorage.getItem(STORAGE_KEY);
        const questions = data ? JSON.parse(data) : [FORM_HEADER_QUESTION];
        questions.push(newQuestion);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
        resolve(newQuestion);
      }, 2000);
    }),
  removeQuestion: (id: string) =>
    new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        const data = localStorage.getItem(STORAGE_KEY);
        const questions = data ? JSON.parse(data) : [];

        const index = questions.findIndex((q: Question) => q.id === id);

        if (index !== -1) {
          questions.splice(index, 1); // Remove the question by ID
          localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
          resolve(true);
        } else {
          reject(new Error("Question not found")); // Reject if ID is not found
        }
      }, 2000);
    })
};
