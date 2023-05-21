import { TSESTree } from '@typescript-eslint/utils';

export function isTodoComment(comment: TSESTree.Comment): boolean {
  return !!comment.value.match(/^(TODO|FIXME)/);
}
