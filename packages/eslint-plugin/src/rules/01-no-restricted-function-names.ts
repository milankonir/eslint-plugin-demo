import type { TSESLint } from '@typescript-eslint/utils';

const rule: TSESLint.RuleModule<'noRestrictedFunctionNames'> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Bans restricted function names',
      recommended: 'error',
      url: 'https://github.com/milankonir/eslint-plugin-demo/blob/main/packages/eslint-plugin/src/rules/01-no-restricted-function-names.ts',
    },
    schema: [],
    messages: {
      noRestrictedFunctionNames:
        'Function name {{ name }} is restricted. Please use more descriptive name describing the function purpose.',
    },
  },
  defaultOptions: [],
  create(context) {
    const ret: TSESLint.RuleListener = {
      FunctionDeclaration: node => {
        console.log(`Visiting ${node.id.name}`);

        if (node.id !== null && node.id.name === 'test') {
          context.report({
            loc: node.loc,
            messageId: 'noRestrictedFunctionNames',
            data: {
              name: node.id.name,
            },
          });
        }
      },
    };

    return ret;
  },
};

export default rule;
