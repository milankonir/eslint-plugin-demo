import { TSESLint } from '@typescript-eslint/utils';
import noRestrictedFunctionNames from './01-no-test-prefix-function-names';
import mandatoryComments from './02-mandatory-comments';

const rules: TSESLint.SharedConfigurationSettings = {
  '01-no-test-prefixed-function-names': noRestrictedFunctionNames,
  '02-mandatory-comments': mandatoryComments,
};

export default rules;
