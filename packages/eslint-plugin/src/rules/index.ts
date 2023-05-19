import { TSESLint } from '@typescript-eslint/utils';
import noRestrictedFunctionNames from './01-no-restricted-function-names';

const rules: TSESLint.SharedConfigurationSettings = {
  'no-restricted-function-names': noRestrictedFunctionNames,
};

export default rules;
