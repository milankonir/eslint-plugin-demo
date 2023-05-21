import { AST_NODE_TYPES, AST_TOKEN_TYPES, TSESLint } from '@typescript-eslint/utils';

const rule: TSESLint.RuleModule<'mandatoryComments'> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Requires mandatory comments on specific types',
      recommended: 'error',
      url: 'https://github.com/milankonir/eslint-plugin-demo/blob/main/packages/eslint-plugin/src/rules/02-mandatory-comments.ts',
    },
    schema: [],
    messages: {
      mandatoryComments: 'Comments on telemetry event {{ name }} is mandatory.',
    },
  },
  defaultOptions: [],
  create(context) {
    const ret: TSESLint.RuleListener = {
      ClassDeclaration: node => {
        if (
          node.superClass !== null &&
          node.superClass.type === AST_NODE_TYPES.Identifier &&
          node.superClass.name === 'TelemetryEvent' &&
          context.getSourceCode().getCommentsBefore(node).length === 0
        ) {
          context.report({
            loc: node.loc,
            messageId: 'mandatoryComments',
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
