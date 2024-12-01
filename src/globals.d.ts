/**
 * Split input into lines, optionally filtering out empty lines
 */
declare function lines(input: string, options?: { keepEmpty?: boolean }): string[]

/**
 * Parse all numbers from a string (including negatives)
 */
declare function numbers(input: string): number[]

/**
 * Parse a grid of characters into a 2D array
 */
declare function grid(input: string): string[][]

/**
 * Parse a grid of digits into a 2D array of numbers
 */
declare function digitGrid(input: string): number[][]

/**
 * Split input into groups of lines separated by empty lines
 */
declare function groups(input: string): string[][]

/**
 * Split a line by a delimiter and map each part
 */
declare function split<T>(
  input: string,
  delimiter: string | RegExp,
  mapper?: (part: string) => T
): T[]

/**
 * Create a range of numbers from start to end (inclusive)
 */
declare function range(start: number, end: number): number[]
