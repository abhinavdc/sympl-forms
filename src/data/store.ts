import { create } from "zustand";
import { items, NavItem } from "./nav";
import { QUESTION_TYPE, QUESTION_TYPE_ICON } from "./constants";
import { adjectives, colors, uniqueNamesGenerator } from "unique-names-generator";
import { IconType } from "react-icons";
import { capitalizeFirstLetter } from "@/helper/textHelper";

const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors], separator: " ", style: "capital"}); 

const FORM_HEADER_QUESTION =   {
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

interface FormBuilderStore {
  questions: Question[];
  addQuestion: (value: QUESTION_TYPE) => void;
  removeQuestion: (id: string) => void;
  updateQuestion: (id: string, data: Question) => void;
}

export const useFormBuilderStore = create<FormBuilderStore>((set) => ({
  questions: [FORM_HEADER_QUESTION],
  addQuestion: (value: QUESTION_TYPE) =>
    set((state) => ({
      questions: [...state.questions, initQuestionFromType(value)],
    })),
  removeQuestion: (id: string) =>
    set((state) => ({ questions: state.questions.filter((x) => x.id !== id) })),
  updateQuestion: (id: string, data: Question) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === id ? { ...question, ...data } : question
      ),
    })),
}));
