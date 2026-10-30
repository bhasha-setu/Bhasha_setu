// __mocks__/expo-router.js
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
};

module.exports = {
  useRouter: () => mockRouter,
  mockRouter,
};
