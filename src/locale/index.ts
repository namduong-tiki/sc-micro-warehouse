import en from "./en";
import vi from "./vi";

export type Message = {
  vi: Record<string, string>;
  en: Record<string, string>;
};

export const messages: Message = {
  en,
  vi,
};
