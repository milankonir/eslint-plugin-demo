import type { TSESLint } from '@typescript-eslint/utils';

import recommended from './configs/recommended';
import rules from './rules';

const rulesObject: TSESLint.SharedConfigurationSettings = {
  rules,
  configs: {
    recommended,
  },
};

export = rulesObject;
