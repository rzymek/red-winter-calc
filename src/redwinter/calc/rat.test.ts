import {describe, expect, test} from 'vitest';
import {isIndirectFirer} from './rat';
import {state} from '../state';


describe('isIndirectFirer', () => {
  test.each([
    { firer: 'mortar', isIndirect: true } as const,
    { firer: 'IG', isIndirect: true } as const,
    { firer: 'arty', isIndirect: true } as const,
      
    { firer: 'MG', isIndirect: false } as const,
    { firer: 'infantry', isIndirect: false } as const,
    { firer: 'armored', isIndirect: false } as const,
  ])('should return $expected when firer is $firer', ({ firer, isIndirect }) => {
    // given
    state.rat.firer = firer;
    
    // when
    const result = isIndirectFirer();
    
    // then
    expect(result).toBe(isIndirect);
  });
});