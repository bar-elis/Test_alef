import type {Child} from "@/pages/UserForm/types.ts";

export type UserData = {
  name: string,
  age: string | number
  children: Child[]
}
