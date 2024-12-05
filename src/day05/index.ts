interface Rule {
  before: number
  after: number
}

function parseRules(rulesSection: string[]): Rule[] {
  return rulesSection.map((line) => {
    const [before, after] = line.split('|').map(Number)
    return { before, after }
  })
}

function isValidSequence(sequence: number[], rules: Rule[]): boolean {
  const applicableRules = rules.filter(
    rule => sequence.includes(rule.before) && sequence.includes(rule.after),
  )

  return applicableRules.every((rule) => {
    const beforeIndex = sequence.indexOf(rule.before)
    const afterIndex = sequence.indexOf(rule.after)
    return beforeIndex < afterIndex
  })
}

function getMiddleNumber(sequence: number[]): number {
  return sequence[Math.floor(sequence.length / 2)]
}

export function part1(input: string) {
  const [rulesSection, updatesSection] = groups(input)
  const rules = parseRules(rulesSection)
  const updates = updatesSection.map(line => line.split(',').map(Number))

  return updates
    .filter(update => isValidSequence(update, rules))
    .map(getMiddleNumber)
    .reduce((sum, num) => sum + num, 0)
}

export function part2(input: string) {

}
