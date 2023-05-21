export function pascalCaseFromKebab(kebab: string | undefined): string | undefined {
  if (!kebab) {
    return kebab;
  }
  const pieces = kebab.split('-').filter(piece => piece.length > 0);
  return pieces
    .map(piece => {
      const chars = piece.split('');
      return chars.map((ch, index) => (index === 0 ? ch.toUpperCase() : ch.toLowerCase())).join('');
    })
    .join('');
}
