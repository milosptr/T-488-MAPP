import { HeaderBackground } from '@/src/components/layout';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export const unstable_settings = {
    initialRouteName: 'index',
};

export default function AppLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen
                name="boards/[id]"
                options={
                    Platform.OS === 'ios'
                        ? {
                              headerShown: true,
                              headerBackTitle: 'Back',
                              title: '',
                              headerBackground: () => <HeaderBackground />,
                          }
                        : undefined
                }
            />
        </Stack>
    );
}
