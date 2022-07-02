import Route from './Route';

describe('Route class', () => {
  describe('create', () => {
    it('returns an instance of Route', () => {
      expect(Route.create({} as any)).toBeInstanceOf(Route);
    });
  });
});
