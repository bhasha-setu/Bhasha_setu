import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="quest-map" />
      <Stack.Screen name="bollywood-studio" />
      <Stack.Screen name="cricket-commentary" />
      <Stack.Screen name="street-food" />
      <Stack.Screen name="diwali-nani-boss" />
    </Stack>
  );
}

