// __mocks__/expo-linear-gradient.js
const React = require('react');

const LinearGradient = React.forwardRef((props, ref) => {
  return React.createElement('div', { 'data-component': 'LinearGradient', ...props, ref }, props.children);
});
LinearGradient.displayName = 'LinearGradient';

module.exports = {
  LinearGradient,
};
