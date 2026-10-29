/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          rootDir: '.',
          jsx: 'react-jsx',
          esModuleInterop: true,
          allowJs: true,
          isolatedModules: true,
          types: ['jest', 'node'],
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
    '^expo-haptics$': '<rootDir>/__mocks__/expo-haptics.js',
  },
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx',
  ],
};
