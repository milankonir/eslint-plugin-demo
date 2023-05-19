import allRules from '../rules';

const ruleNames = Object.keys(allRules);
const rules: { [ruleName: string]: 'error' } = {};

for (const ruleName of ruleNames) {
  rules[`@eslint-plugin-demo/${ruleName}`] = 'error';
}

export default {
  rules,
};
