/*
 * This rule ensures that disabled tests have valid TODO comments associated with them
 */
import type { TSESLint, TSESTree } from '@typescript-eslint/utils';

import { isTodoComment } from './utils';

function hasTodoCommentBefore(node: TSESTree.Node, sourceCode: TSESLint.SourceCode): boolean {
  const comments = sourceCode.getCommentsBefore(node);
  for (const comment of comments) {
    if (isTodoComment(comment)) {
      return true;
    }
  }

  return false;
}

const rule: TSESLint.RuleModule<'disabledSuite' | 'disabledTest'> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'This rule ensures that disabled tests have valid TODO comments before them',
      recommended: 'error',
      url: 'https://github.com/milankonir/eslint-plugin-demo/blob/main/packages/eslint-plugin/src/rules/04-no-disabled-tests-without-todos.ts',
    },
    schema: [],
    messages: {
      disabledSuite: 'Disabling test suites is not allowed unless there is a valid TODO comment associated with it.',
      disabledTest: 'Disabling tests is not allowed unless there is a valid TODO comment associated with it.',
    },
  },
  defaultOptions: [],
  create(context) {
    const ret: TSESLint.RuleListener = {
      'CallExpression > MemberExpression[object.name="describe"][property.name="skip"]': function (
        node: TSESTree.MemberExpression
      ) {
        if (!hasTodoCommentBefore(node, context.getSourceCode())) {
          context.report({ messageId: 'disabledSuite', node });
        }
      },
      'CallExpression > MemberExpression[object.name=/^(it|test)$/][property.name="skip"]': function (
        node: TSESTree.MemberExpression
      ) {
        if (!hasTodoCommentBefore(node, context.getSourceCode())) {
          context.report({ messageId: 'disabledTest', node });
        }
      },
    };
    return ret;
  },
};
export default rule;
