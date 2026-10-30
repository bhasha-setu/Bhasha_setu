// __mocks__/react-native.js
const React = require('react');

const makeComponent = (htmlTag, displayName) => {
  const Comp = React.forwardRef(({ activeOpacity, hitSlop, numberOfLines, collapsable, resizeMode, accessibilityLabel, ...props }, ref) => {
    return React.createElement(htmlTag, { 'data-component': displayName, ...props, ref }, props.children);
  });
  Comp.displayName = displayName;
  return Comp;
};

module.exports = {
  Platform: {
    OS: 'android',
    select: (objs) => objs.android || objs.default,
  },
  StyleSheet: {
    create: (styles) => styles,
    flatten: (styles) => (Array.isArray(styles) ? Object.assign({}, ...styles.filter(Boolean)) : styles || {}),
  },
  View: makeComponent('div', 'View'),
  Text: makeComponent('span', 'Text'),
  Image: makeComponent('img', 'Image'),
  TouchableOpacity: makeComponent('button', 'TouchableOpacity'),
  TouchableWithoutFeedback: makeComponent('div', 'TouchableWithoutFeedback'),
  Pressable: makeComponent('button', 'Pressable'),
  ScrollView: makeComponent('div', 'ScrollView'),
  ActivityIndicator: makeComponent('div', 'ActivityIndicator'),
  TextInput: makeComponent('input', 'TextInput'),
  Modal: makeComponent('div', 'Modal'),
  StatusBar: makeComponent('div', 'StatusBar'),
  Animated: {
    View: makeComponent('div', 'Animated.View'),
    Text: makeComponent('span', 'Animated.Text'),
    Value: class {
      constructor(val) { this._val = val; }
      setValue(v) { this._val = v; }
      interpolate() { return this; }
    },
    timing: () => ({
      start: (cb) => cb && cb({ finished: true }),
    }),
    spring: () => ({
      start: (cb) => cb && cb({ finished: true }),
    }),
    loop: () => ({
      start: () => {},
      stop: () => {},
    }),
    parallel: () => ({
      start: (cb) => cb && cb({ finished: true }),
    }),
    sequence: () => ({
      start: (cb) => cb && cb({ finished: true }),
    }),
  },
  Dimensions: {
    get: () => ({ width: 390, height: 844 }),
  },
  useWindowDimensions: () => ({ width: 390, height: 844 }),
};
