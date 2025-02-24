import { create } from "zustand";
import { items, NavItem } from "./nav";
import { QUESTION_TYPE } from "./constants";
import { mockApi } from "./api";
import { Question, Response } from "./types";

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
interface ResponsesStore {
  responses: Response[] | null;
  fetchingResponses: boolean;
  fetchResponses: () => void;
  submittingResponse: boolean;
  submitResponse: (question: Question[]) => Promise<{ success: boolean }>;
}

export const useResponsesStore = create<ResponsesStore>((set) => ({
  responses: null,
  fetchingResponses: false,
  fetchResponses: async () => {
    set(() => ({
      fetchingResponses: true,
    }));
    const newResp = await mockApi.fetchResponses();
    set(() => ({
      fetchingResponses: false,
      responses: newResp,
    }));
  },
  submittingResponse: false,
  submitResponse: async (value: Question[]) => {
    set(() => ({
      submittingResponse: true,
    }));
    try {
      const newResp = await mockApi.submitForm(value);
      set((state) => ({
        submittingResponse: false,
        responses: [...(state.responses ?? []), newResp],
      }));
      return { success: true };
    } catch {
      set(() => ({
        submittingResponse: false,
      }));
      return { success: false };
    }
  },
}));

interface FormBuilderStore {
  questions: Question[];
  addingQuestion: boolean;
  fetchingQuestions: boolean;
  removingQuestionId: string | null;
  updatingQuestionId: string | null;
  resetFormField: () => void;
  getQuestions: () => void;
  addQuestion: (value: QUESTION_TYPE) => void;
  removeQuestion: (id: string) => void;
  updateQuestion: (id: string, data: Question, valid: boolean) => void;
}

export const useFormBuilderStore = create<FormBuilderStore>((set) => ({
  questions: [],
  addingQuestion: false,
  fetchingQuestions: false,
  removingQuestionId: null,
  updatingQuestionId: null,
  resetFormField: () => {
    set((state) => ({
      questions: state.questions.map((question) => ({
        ...question,
        value: "", // Reset value
      }))
    }))
  },
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
        removingQuestionId: null,
      }));
    } else {
      set(() => ({
        removingQuestionId: null,
      }));
    }
  },
  updateQuestion: async (id: string, data: Question, valid: boolean) => {
    if (valid) {
      // call mock API when data is valid to set in localstorage
      set(() => ({
        updatingQuestionId: id,
      }));
      mockApi.updateQuestion(id, data).then((updated) => {
        if (updated) {
          console.log("Updated Local Storage", id);
          set(() => ({
            updatingQuestionId: null,
          }));
        }
      });
    }
    // update zustand store even if invalid
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === id ? { ...question, ...data } : question
      ),
    }));
  }
}));
