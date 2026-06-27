import { describe, expect, test } from 'vitest';
import { removeLastCandyMarkup } from './stepFourUtils';

describe('removeLastCandyMarkup', () => {
  test('removes the last inserted candy image from a recipe field', () => {
    const firstTag = '<img src="img1" alt="Candy 1" style="width: 30px; height: 30px;" /> ';
    const secondTag = '<img src="img2" alt="Candy 2" style="width: 30px; height: 30px;" /> ';

    expect(removeLastCandyMarkup(`${firstTag}${secondTag}`)).toBe(firstTag);
  });

  test('falls back to removing a single character when no image markup is present', () => {
    expect(removeLastCandyMarkup('ABC')).toBe('AB');
  });
});
