/*
 * This rule ensures that return value of factory methods is used
 */
import { TSESLint, ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';

const rule: TSESLint.RuleModule<'transportObjectFactoryUsed'> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensures that transport object factory method is used',
      recommended: 'error',
      url: 'https://github.com/milankonir/eslint-plugin-demo/blob/main/packages/eslint-plugin/src/rules/07-type-checking.ts',
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      transportObjectFactoryUsed: 'Transport object created by factory should be used.',
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      CallExpression: node => {
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);

        const type = checker.getTypeAtLocation(originalNode.expression);

        for (const signature of type.getCallSignatures()) {
          const returnNode = signature.getReturnType();

          if (returnNode.isClassOrInterface()) {
            for (const baseType of returnNode.getBaseTypes()) {
              if (
                baseType.getSymbol().getName() === 'TransportObject' &&
                (node.parent.type === AST_NODE_TYPES.ExpressionStatement ||
                  node.parent.type === AST_NODE_TYPES.UnaryExpression)
              ) {
                context.report({
                  node,
                  messageId: 'transportObjectFactoryUsed',
                });
              }
            }
          }
        }
      },
    };
  },
};
export default rule;
