import { describe, expect, test } from '@jest/globals';

describe('test demo', () => {
  test('success test demo', () => {
    expect({ foo: 'bar' }).toMatchObject({ foo: 'bar' });
  });
});
