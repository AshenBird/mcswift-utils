import { customAlphabet } from "nanoid"
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = '0123456789'
const alphabet = letters + letters.toLowerCase() + numbers
export const nanoid:(size?: number | undefined) => string = customAlphabet(alphabet)
export const randomString:(size?: number | undefined) => string = nanoid
