import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/src/components/button';
import { TextInput } from '@/src/components/input';
import { SafeAreaScreen } from '@/src/components/SafeAreaScreen';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { Text } from '@/src/components/Themed';
import { useTheme } from '@/src/hooks/useTheme';
import { useStore } from '@/src/store/useStore';

export default function EditListScreen() {
    const theme = useTheme();
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const lists = useStore(state => state.lists);
    const updateList = useStore(state => state.updateList);

    const list = useMemo(() => lists.find(l => l.id === Number(id)), [lists, id]);

    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [nameError, setNameError] = useState('');
    const [colorError, setColorError] = useState('');

    useEffect(() => {
        if (list) {
            setName(list.name);
            setColor(list.color || '');
        }
    }, [list]);

    const colorPattern = useMemo(() => /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, []);
    const normalizedColor = useMemo(() => {
        if (!color) return '';
        return color.startsWith('#') ? color : `#${color}`;
    }, [color]);

    const isColorValid = useMemo(() => {
        if (!color) return true;
        return colorPattern.test(color) || colorPattern.test(normalizedColor);
    }, [color, normalizedColor, colorPattern]);

    const handleSave = useCallback(() => {
        if (!list) return;

        if (!name.trim()) {
            setNameError('List name is required');
            return;
        }

        if (color && !isColorValid) {
            setColorError('Invalid hex color');
            return;
        }

        updateList({
            ...list,
            name: name.trim(),
            color: normalizedColor || '#dddddd',
        });

        router.back();
    }, [name, color, list, updateList, router, isColorValid, normalizedColor]);

    if (!list) {
        return <Redirect href="/+not-found" />;
    }

    return (
        <SafeAreaScreen edges={['bottom']} paddingTop={24}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScreenHeader title="Edit List" />

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollContent}
                >
                    <TextInput
                        label="List Name"
                        placeholder="Enter list name"
                        value={name}
                        onChangeText={text => {
                            setName(text);
                            if (text.trim()) setNameError('');
                        }}
                        error={nameError}
                        returnKeyType="next"
                    />

                    <TextInput
                        label="Color (hex, optional)"
                        placeholder="#ff0000"
                        value={color}
                        onChangeText={text => {
                            setColor(text);
                            if (!text) {
                                setColorError('');
                                return;
                            }
                            const norm = text.startsWith('#') ? text : `#${text}`;
                            if (colorPattern.test(text) || colorPattern.test(norm)) {
                                setColorError('');
                            } else {
                                setColorError('Invalid hex color');
                            }
                        }}
                        returnKeyType="done"
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 12,
                            marginTop: 8,
                        }}
                    >
                        <View
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 8,
                                backgroundColor:
                                    isColorValid && normalizedColor
                                        ? normalizedColor
                                        : theme.surface,
                                borderWidth: 1,
                                borderColor: isColorValid ? theme.border : theme.error,
                            }}
                        />
                        {colorError ? (
                            <Text style={{ color: theme.error }}>{colorError}</Text>
                        ) : null}
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button title="Save Changes" onPress={handleSave} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 16,
    },
    buttonContainer: {
        marginTop: 8,
        marginBottom: 24,
    },
});
