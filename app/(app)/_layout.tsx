import { Stack } from 'expo-router';

export const unstable_settings = {
    initialRouteName: 'index',
};

export default function AppLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="boards/[id]" options={{ headerShown: true }} />
            <Stack.Screen name="lists/[id]" options={{ headerShown: true }} />
        </Stack>
    );
}
