import { TConcludeProjectSchema } from "./conclude-project-schema";
import { TRegisterProjectSchema } from "./register-project-schema";

export type TUpdateConcludedProjectSchema = TConcludeProjectSchema &
  TRegisterProjectSchema;
