import { Tables } from "./database.types";

export type User = Pick<Tables<"user">, "user_id" | "nickname" | "image_url" | "description">;
