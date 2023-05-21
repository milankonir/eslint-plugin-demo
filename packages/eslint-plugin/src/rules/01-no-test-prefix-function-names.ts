import type { TSESLint } from '@typescript-eslint/utils';

const rule: TSESLint.RuleModule<'noRestrictedFunctionNames'> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Bans test prefix on function names',
      recommended: 'error',
      url: 'https://github.com/milankonir/eslint-plugin-demo/blob/main/packages/eslint-plugin/src/rules/01-no-test-prefixed-function-names.ts',
    },
    schema: [],
    messages: {
      noRestrictedFunctionNames: 'Function {{ name }} cannot be prefixed with `test`, use `is` prefix instead.',
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    const ret: TSESLint.RuleListener = {
      FunctionDeclaration: node => {
        if (node.id !== null && node.id.name.startsWith('test')) {
          context.report({
            loc: node.loc,
            messageId: 'noRestrictedFunctionNames',
            data: {
              name: node.id.name,
            },
            fix: fixer => fixer.replaceText(node.id, node.id.name.replace(/^test(.*)/, 'is$1')),
          });
        }
      },
    };

    return ret;
  },
};

export default rule;
