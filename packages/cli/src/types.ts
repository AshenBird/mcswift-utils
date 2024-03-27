import { z, ZodString, ZodBoolean, ZodNull, ZodNumber } from "zod";
import { Cli } from "./Cli";

/*-----------------------------------*/
const _OptionsSchema = z.object(
  {} as { [k: string]: ZodString | ZodBoolean | ZodNull | ZodNumber }
);
type _CommonOptionsSchema =typeof _OptionsSchema
export interface CommonOptionsSchema extends _CommonOptionsSchema{} ;
export type COS = CommonOptionsSchema;

/*-----------------------------------*/
export type CommandOption<T extends COS = COS> = z.infer<T>;
export type CO<T extends COS = COS> = CommandOption<T>;

/*-----------------------------------*/
export interface CommandHandle<T extends COS = COS> {
  (options: CO<T>, cli:Cli): unknown;
}
export type CH<T extends COS = COS> = CommandHandle<T>;

/*-----------------------------------*/
export interface CommandInitial<T extends COS = COS>{
  name: string | symbol;
  handle: CommandHandle<T>;
  schema?: T;
};
export type CI<T extends COS = COS> = CommandInitial<T>;
