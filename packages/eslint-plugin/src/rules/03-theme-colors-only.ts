import type { TSESLint, TSESTree } from '@typescript-eslint/utils';

const colorRegex =
  /(#([\da-f]{3}){1,2}$|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/gi;

const rule: TSESLint.RuleModule<'themeColorsOnly'> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Bans usage of non-theme colors.',
      recommended: 'error',
      url: 'https://github.com/milankonir/eslint-plugin-demo/blob/main/packages/eslint-plugin/src/rules/03-theme-colors-only.ts',
    },
    schema: [],
    messages: {
      themeColorsOnly: 'Please use theme colors only. HEX, RGB, RGBA HSL, and HSLA colors are not allowed.',
    },
  },
  defaultOptions: [],
  create(context): TSESLint.RuleListener {
    const ret: TSESLint.RuleListener = {
      Literal: (node: TSESTree.Literal) => {
        if (typeof node.value !== 'string') {
          return;
        }

        if (colorRegex.test(node.value)) {
          context.report({
            loc: node.loc,
            messageId: 'themeColorsOnly',
          });
        }
      },
    };

    return ret;
  },
};

export default rule;
