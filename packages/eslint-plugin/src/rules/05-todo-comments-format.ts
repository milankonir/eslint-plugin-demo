/*
 * This rule ensures that all TODO comments contain viable information
 */
import type { TSESLint } from '@typescript-eslint/utils';
import { isTodoComment } from './utils';

const rule: TSESLint.RuleModule<'invalidFormat'> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensures that all TODO comments follow format // TODO(<gh-user>)[<ticket>]: <summary>',
      recommended: 'error',
      url: 'https://github.com/milankonir/eslint-plugin-demo/blob/main/packages/eslint-plugin/src/rules/05-todo-comments-format.ts',
    },
    schema: [],
    messages: {
      invalidFormat:
        'TOOO comments must contain a GitHub user, JIRA ticket and a summary // TODO(<gh-user>)[<ticket>]: <summary>',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      Program() {
        context
          .getSourceCode()
          .getAllComments()
          .filter(isTodoComment)
          .forEach(comment => {
            if (!comment.value.match(/ TODO\([a-z,A-Z,-_]+\)\[[A-Z]{2,4}-[0-9]{1,5}\]: .+/)) {
              context.report({
                messageId: 'invalidFormat',
                node: comment,
              });
            }
          });
      },
    };
  },
};
export default rule;
