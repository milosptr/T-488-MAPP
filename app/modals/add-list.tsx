import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/src/components/button';
import { ColorPicker, PRESET_COLORS } from '@/src/components/ColorPicker';
import { TextInput } from '@/src/components/input';
import { SafeAreaScreen } from '@/src/components/SafeAreaScreen';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { useStore } from '@/src/store/useStore';

export default function AddListScreen() {
    const router = useRouter();
    const { boardId } = useLocalSearchParams();
    const lists = useStore(state => state.lists);
    const addList = useStore(state => state.addList);

    const [name, setName] = useState('');
    const [color, setColor] = useState(PRESET_COLORS[0]);
    const [nameError, setNameError] = useState('');

    const handleAdd = useCallback(() => {
        if (!name.trim()) {
            setNameError('List name is required');
            return;
        }

        const newId = lists.length > 0 ? Math.max(...lists.map(l => l.id)) + 1 : 1;
        addList({
            id: newId,
            name: name.trim(),
            color: color || PRESET_COLORS[0],
            boardId: Number(boardId) || 0,
        });

        router.back();
    }, [name, color, lists, addList, router, boardId]);

    return (
        <SafeAreaScreen edges={['bottom']} paddingTop={24}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScreenHeader title="Add New List" />

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

                    <ColorPicker selectedColor={color} onSelectColor={setColor} />

                    <View style={styles.buttonContainer}>
                        <Button title="Add List" onPress={handleAdd} />
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
