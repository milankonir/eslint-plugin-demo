import { TSESLint } from '@typescript-eslint/utils';
import todoCommentsFormat from './05-todo-comments-format';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

const invalidComments = [
  '// TODO Some description',
  '// FIXME Some description',
  '// TODO: Some description',
  '// TODO[ED-345]: Some description',
  '// TODO[milankonir](ED-345): Some description',
  '// TODO(milankonir)[ED-345] Some description',
];

ruleTester.run('06-todo-comments-format', todoCommentsFormat, {
  valid: ['// TODO(milankonir)[ED-345]: Some description', '// This is not a TODO comment'],
  invalid: invalidComments.map(comment => ({ code: comment, errors: [{ messageId: 'invalidFormat' }] })),
});
