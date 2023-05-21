import { pascalCaseFromKebab } from '.';

describe('pascalCaseFromKebab', () => {
  it('should return input value on falsy values', () => {
    expect(pascalCaseFromKebab('')).toEqual('');
    expect(pascalCaseFromKebab(undefined)).toEqual(undefined);
  });

  it('should capitalize first letter and low case the rest', () => {
    expect(pascalCaseFromKebab('foo')).toEqual('Foo');
    expect(pascalCaseFromKebab('Foo')).toEqual('Foo');
    expect(pascalCaseFromKebab('FooBAR')).toEqual('Foobar');
  });

  it('should split in words by dashses', () => {
    expect(pascalCaseFromKebab('feaTure-name-VerY-long')).toEqual('FeatureNameVeryLong');
  });

  it('should not treat numbers differently', () => {
    expect(pascalCaseFromKebab('use-max-50-items')).toEqual('UseMax50Items');
  });
});
