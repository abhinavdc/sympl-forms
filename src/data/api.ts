import { capitalizeFirstLetter } from "@/helper/textHelper";
import { QUESTION_TYPE } from "./constants";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
} from "unique-names-generator";
import { Question, Response } from "./types";

const STORAGE_KEY_QUESTIONS = "mock_questions";
const STORAGE_KEY_RESPONSES = "responses";
const NETWORK_LATENCY = 1000

function initQuestionFromType(type: QUESTION_TYPE): Question {
  return {
    id: String(Math.random()),
    type,
    editable: true,
    meta: {
      label: capitalizeFirstLetter(type as string) + " Question Goes Here",
      options: type === QUESTION_TYPE.SELECT ? ["New Option"] : [],
      required: false,
      validation: {
        rules: [],
      },
    },
    value: ""
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
        const data = localStorage.getItem(STORAGE_KEY_QUESTIONS);
        const parseData = data ? JSON.parse(data) : [];
        resolve(parseData.length ? parseData : [FORM_HEADER_QUESTION]);
      }, NETWORK_LATENCY); // Simulate network latency
    }),

  addQuestion: (value: QUESTION_TYPE) =>
    new Promise<Question>((resolve) => {
      setTimeout(() => {
        const newQuestion = initQuestionFromType(value);
        const data = localStorage.getItem(STORAGE_KEY_QUESTIONS);
        const questions = data ? JSON.parse(data) : [FORM_HEADER_QUESTION];
        questions.push(newQuestion);
        localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
        resolve(newQuestion);
      }, NETWORK_LATENCY);
    }),
  removeQuestion: (id: string) =>
    new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        const data = localStorage.getItem(STORAGE_KEY_QUESTIONS);
        const questions = data ? JSON.parse(data) : [];

        const index = questions.findIndex((q: Question) => q.id === id);

        if (index !== -1) {
          questions.splice(index, 1); // Remove the question by ID
          localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
          resolve(true);
        } else {
          reject(new Error("Question not found")); // Reject if ID is not found
        }
      }, NETWORK_LATENCY);
    }),
  updateQuestion: (id: string, newData: Question) =>
    new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        const data = localStorage.getItem(STORAGE_KEY_QUESTIONS);
        const questions = data ? JSON.parse(data) : [];

        const index = questions.findIndex((q: Question) => q.id === id);

        if (index !== -1) {
          questions.splice(index, 1, newData); // Replaces the question by ID
          localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
          resolve(true);
        } else {
          reject(new Error("Question not found")); // Reject if ID is not found
        }
      }, NETWORK_LATENCY);
    }),
  submitForm: (formData: Question[]) =>
    new Promise<Response>((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(STORAGE_KEY_RESPONSES);
        const responses = data ? JSON.parse(data) : [];
        const newResponse = new Response(formData); 
        responses.push(newResponse);
        localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify(responses));
        resolve(newResponse);
      }, NETWORK_LATENCY);
    }),
  fetchResponses: () =>
    new Promise<Response[]>((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(STORAGE_KEY_RESPONSES);
        const responses = data ? JSON.parse(data) : [];
        resolve(responses);
      }, NETWORK_LATENCY);
    }),
};
