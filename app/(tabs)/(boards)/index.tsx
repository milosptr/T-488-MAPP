import { ScrollView, StyleSheet } from 'react-native';

import { Button } from '@/src/components/button';
import { BoardCard } from '@/src/components/cards/BoardCard';
import { SafeAreaScreen } from '@/src/components/SafeAreaScreen';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { View } from '@/src/components/Themed';
import { useTheme } from '@/src/hooks/useTheme';
import { useStore } from '@/src/store/useStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BoardsScreen() {
    const theme = useTheme();
    const boards = useStore(state => state.boards);
    const router = useRouter();

    const handleAddBoard = () => {
        router.push('/add-board');
    };

    return (
        <SafeAreaScreen>
            <View style={styles.container}>
                <ScreenHeader
                    title="Boards"
                    rightAction={() => (
                        <Button
                            size="small"
                            title="Add Board"
                            leadingIcon={
                                <MaterialCommunityIcons
                                    name="plus"
                                    size={16}
                                    color={theme.onButton}
                                />
                            }
                            onPress={handleAddBoard}
                        />
                    )}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.boardsContainer}>
                        {boards.map(board => (
                            <BoardCard key={board.id} board={board} />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
    },
    boardsContainer: {
        gap: 16,
    },
});
