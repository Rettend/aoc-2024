import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'antfu/no-top-level-await': 'off',
    'curly': ['warn', 'multi-or-nest', 'consistent'],
  },
})
