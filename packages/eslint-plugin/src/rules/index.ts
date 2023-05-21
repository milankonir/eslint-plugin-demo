import { TSESLint } from '@typescript-eslint/utils';
import noRestrictedFunctionNames from './01-no-test-prefix-function-names';
import mandatoryComments from './02-mandatory-comments';
import themeColorsOnly from './03-theme-colors-only';
import noDisabledTestsWithoutTodos from './04-no-disabled-tests-without-todos';

const rules: TSESLint.SharedConfigurationSettings = {
  '01-no-test-prefixed-function-names': noRestrictedFunctionNames,
  '02-mandatory-comments': mandatoryComments,
  '03-theme-colors-only': themeColorsOnly,
  '04-no-disabled-tests-without-todos': noDisabledTestsWithoutTodos,
};

export default rules;
