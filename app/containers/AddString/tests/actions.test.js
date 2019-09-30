import { CHANGE_NEW_STRING } from '../constants';

import { changeNewString } from '../actions';

describe('Add string Actions', () => {
  describe('changeNewString', () => {
    it('should return the correct type and the passed string', () => {
      const fixture = 'test';
      const expectedResult = {
        type: CHANGE_NEW_STRING,
        newString: 'test',
      };

      expect(changeNewString(fixture)).toEqual(expectedResult);
    });
  });
});
