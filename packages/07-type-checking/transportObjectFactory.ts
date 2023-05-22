interface TransportObject {}

interface TransportObjectA extends TransportObject {
  a: string;
}

interface TransportObjectB extends TransportObject {
  b: string;
}

export function createObjectA(value: string): TransportObjectA {
  return { a: value };
}

export function createObjectB(value: string): TransportObjectB {
  return { b: value };
}
