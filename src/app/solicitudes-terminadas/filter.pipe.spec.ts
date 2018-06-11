import { CustomerEmailFilter } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomerEmailFilter();
    expect(pipe).toBeTruthy();
  });
});
