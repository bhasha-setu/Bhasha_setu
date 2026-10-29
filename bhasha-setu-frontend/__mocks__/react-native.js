// __mocks__/react-native.js
module.exports = {
  Platform: {
    OS: 'android',
    select: (objs) => objs.android || objs.default,
  },
  StyleSheet: {
    create: (styles) => styles,
  },
  View: 'View',
  Text: 'Text',
  Image: 'Image',
  TouchableOpacity: 'TouchableOpacity',
  ScrollView: 'ScrollView',
  Dimensions: {
    get: () => ({ width: 390, height: 844 }),
  },
};
