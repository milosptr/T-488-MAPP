import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

type Props = {
    title: string;
    rightAction?: () => React.ReactNode;
};

export const ScreenHeader = ({ title, rightAction }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {rightAction?.()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
