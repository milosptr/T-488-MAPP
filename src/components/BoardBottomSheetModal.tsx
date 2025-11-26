import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../constants/DesignTokens';
import { useStore } from '../store/useStore';
import { View } from './Themed';
import { Backdrop } from './bottom-sheet/Backdrop';
import { Button } from './button/Button';

type Props = {
    ref: React.RefObject<BottomSheetModal | null>;
    boardId: number;
};

export const BoardBottomSheetModal = ({ ref, boardId }: Props) => {
    const { bottom } = useSafeAreaInsets();
    const theme = useTheme();
    const router = useRouter();
    const deleteBoard = useStore(state => state.deleteBoard);

    const handleViewBoard = () => {
        ref.current?.close();
        router.push(`/single-board?id=${boardId}`);
    };

    const handleAddListToBoard = () => {
        ref.current?.close();
        router.push(`/add-list?boardId=${boardId}`);
    };

    const handleEditBoard = () => {
        ref.current?.close();
        router.push(`/edit-board?id=${boardId}`);
    };

    const handleDeleteBoard = () => {
        ref.current?.close();
        Alert.alert('Delete Board', 'Are you sure you want to delete this board?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    deleteBoard(boardId);
                },
            },
        ]);
    };

    const handleClose = () => {
        ref.current?.close();
    };

    return (
        <BottomSheetModal
            backdropComponent={Backdrop}
            enableDynamicSizing
            enablePanDownToClose
            ref={ref}
            onDismiss={handleClose}
        >
            <BottomSheetView style={[styles.contentContainer, { paddingBottom: bottom }]}>
                <View style={styles.actionsContainer}>
                    <Button title="View Board" onPress={handleViewBoard} />
                    <Button title="Edit Board" onPress={handleEditBoard} />
                    <Button variant="danger" title="Delete Board" onPress={handleDeleteBoard} />
                    <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
                    <Button title="Add List to Board" onPress={handleAddListToBoard} />
                    <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
                    <Button variant="outlined" title="Close" onPress={handleClose} />
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    actionsContainer: {
        gap: 8,
    },
    separator: {
        height: 1,
        marginVertical: spacing.lg,
    },
});
