import { LuHash, LuList, LuText } from "react-icons/lu";

export enum QUESTION_TYPE {
    TEXT = "text",
    NUMBER = "number",
    SELECT = "select",
    FORM_HEADER = "form_header",
}

export const QUESTION_TYPE_ICON = {
    [QUESTION_TYPE.FORM_HEADER]: LuList,
    [QUESTION_TYPE.NUMBER]: LuHash,
    [QUESTION_TYPE.TEXT]: LuText,
    [QUESTION_TYPE.SELECT]: LuList,
  }