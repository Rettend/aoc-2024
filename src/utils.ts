/**
 * Split input into lines, optionally filtering out empty lines
 */
export function lines(input: string, { keepEmpty = false } = {}): string[] {
  return input.split('\n').filter(line => keepEmpty || line.length > 0)
}

/**
 * Parse all numbers from a string (including negatives)
 */
export function numbers(input: string): number[] {
  return Array.from(input.matchAll(/-?\d+/g)).map(m => Number(m[0]))
}

/**
 * Parse a grid of characters into a 2D array
 */
export function grid(input: string): string[][] {
  return lines(input).map(line => [...line])
}

/**
 * Parse a grid of digits into a 2D array of numbers
 */
export function digitGrid(input: string): number[][] {
  return lines(input).map(line => [...line].map(Number))
}

/**
 * Split input into groups of lines separated by empty lines
 */
export function groups(input: string): string[][] {
  return input.split('\n\n').map(group => lines(group))
}

/**
 * Split a line by a delimiter and map each part
 */
export function split<T>(
  input: string,
  delimiter: string | RegExp,
  mapper: (part: string) => T = s => s as T,
): T[] {
  return input.split(delimiter).map(mapper)
}

/**
 * Create a range of numbers from start to end (inclusive)
 */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
