import chalk from "chalk";
import { toJsonString } from ".";

const getTimeText = () => {
  const date = new Date();
  const timeString = date.toLocaleTimeString();
  const time = ` ${timeString} `;
  return time;
};

const transform = (val:unknown)=>{
  if(typeof val === "string")return val
  const v = toJsonString(val)
  if(v)return v
  return val
}

const log = (info: unknown) => {
  const { white,green } = chalk;
  console.log(green(getTimeText()), white(transform(info)));
};
const info = (info: unknown) => {
  const { gray,white } = chalk;
  console.log(gray(getTimeText()), white(transform(info)));
};
const error = (info: unknown) => {
  const { red,white } = chalk;
  console.log(red(getTimeText()), white(transform(info)));
};
const warn = (info: unknown) => {
  const { yellow,white } = chalk;
  console.log(yellow(getTimeText()), white(transform(info)));
};

const debug = (info: unknown) => {
  const { blue,white } = chalk;
  console.log(blue(getTimeText()), white(transform(info)));
};
export class Logger {
  static log = log;
  static info = info;
  static error = error;
  static warn = warn;
  static debug = debug
}
