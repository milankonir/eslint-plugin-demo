import { TSESLint } from '@typescript-eslint/utils';
import noRestrictedFunctionNames from './01-no-test-prefix-function-names';
import mandatoryComments from './02-mandatory-comments';
import themeColorsOnly from './03-theme-colors-only';
import noDisabledTestsWithoutTodos from './04-no-disabled-tests-without-todos';
import todoCommentsFormat from './05-todo-comments-format';
import packageOrganization from './06-package-organization';
import typeChecking from './07-type-checking';

const rules: TSESLint.SharedConfigurationSettings = {
  '01-no-test-prefixed-function-names': noRestrictedFunctionNames,
  '02-mandatory-comments': mandatoryComments,
  '03-theme-colors-only': themeColorsOnly,
  '04-no-disabled-tests-without-todos': noDisabledTestsWithoutTodos,
  '05-todo-comments-format': todoCommentsFormat,
  '06-package-organization': packageOrganization,
  '07-type-checking': typeChecking,
};

export default rules;
