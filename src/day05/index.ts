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

function buildGraph(sequence: number[], rules: Rule[]): Map<number, number[]> {
  const graph = new Map<number, number[]>()
  sequence.forEach(n => graph.set(n, []))

  rules.forEach((rule) => {
    if (sequence.includes(rule.before) && sequence.includes(rule.after)) {
      const adjacentNodes = graph.get(rule.before) || []
      adjacentNodes.push(rule.after)
      graph.set(rule.before, adjacentNodes)
    }
  })

  return graph
}

function topologicalSort(sequence: number[], rules: Rule[]): number[] {
  const graph = buildGraph(sequence, rules)
  const visited = new Set<number>()
  const sorted: number[] = []

  function visit(node: number) {
    if (visited.has(node))
      return
    visited.add(node)

    const neighbors = graph.get(node) || []
    for (const neighbor of neighbors)
      visit(neighbor)

    sorted.unshift(node)
  }

  sequence.forEach((node) => {
    if (!visited.has(node))
      visit(node)
  })

  return sorted
}

export function part2(input: string) {
  const [rulesSection, updatesSection] = groups(input)
  const rules = parseRules(rulesSection)
  const updates = updatesSection.map(line => line.split(',').map(Number))

  return updates
    .filter(update => !isValidSequence(update, rules))
    .map(update => topologicalSort(update, rules))
    .map(getMiddleNumber)
    .reduce((sum, num) => sum + num, 0)
}
