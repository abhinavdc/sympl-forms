import { create } from "zustand";
import { items, NavItem } from "./nav";
import { QUESTION_TYPE } from "./constants";
import { IconType } from "react-icons";
import { mockApi } from "./api";

interface TabStore {
  tabs: NavItem[];
  selectedTab: string;
  setSelectedTab: (value: string) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  tabs: [...items],
  selectedTab: items[0]?.value,
  setSelectedTab: (value: string) => set(() => ({ selectedTab: value })),
}));

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

interface FormBuilderStore {
  questions: Question[];
  addingQuestion: boolean;
  fetchingQuestions: boolean;
  removingQuestionId: string | null;
  getQuestions: () => void;
  addQuestion: (value: QUESTION_TYPE) => void;
  removeQuestion: (id: string) => void;
  updateQuestion: (id: string, data: Question) => void;
}

export const useFormBuilderStore = create<FormBuilderStore>((set) => ({
  questions: [],
  addingQuestion: false,
  fetchingQuestions: false,
  removingQuestionId: null,
  getQuestions: async () => {
    set({ fetchingQuestions: true });
    const data = await mockApi.getQuestions();
    set({ questions: data, fetchingQuestions: false });
  },
  addQuestion: async (value: QUESTION_TYPE) => {
    set(() => ({
      addingQuestion: true,
    }));
    const newQuestion = await mockApi.addQuestion(value);
    set((state) => ({
      addingQuestion: false,
      questions: [...state.questions, newQuestion],
    }));
  },
  removeQuestion: async (id: string) => {
    set(() => ({
      removingQuestionId: id,
    }));
    const removed = await mockApi.removeQuestion(id);
    if (removed) {
      set((state) => ({
        questions: state.questions.filter((x) => x.id !== id),
        removingQuestionId: null
      }));
    } else {
      set(() => ({
        removingQuestionId: null,
      }));
    }
  },
  updateQuestion: (id: string, data: Question) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === id ? { ...question, ...data } : question
      ),
    })),
}));
