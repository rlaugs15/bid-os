import { Tables } from "./database.types";

export type KnowledgeListItem = {
  id: string;
  title: string;
  summary: string;
  hasDescription: boolean;
};

export type KnowledgeDetail = Tables<"knowledge">;

export type UpdateKnowledge = Pick<Tables<"knowledge">, "title" | "summary" | "description">;
