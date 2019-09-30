import { selectAddString } from '../selectors';

describe('selectAddString', () => {
  it('should select the AddString state', () => {
    const AddStringState = {
      newString: '',
      loading: false,
      error: false,
    };
    const mockedState = {
      addString: AddStringState,
    };
    expect(selectAddString(mockedState)).toEqual(AddStringState);
  });
});
