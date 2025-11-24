import { borderRadius } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks/useTheme';
import { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../Themed';

type Props = {
    size?: 'small' | 'medium' | 'large';
    title: string;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    onPress?: () => void;
};

const sizes = {
    small: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 14,
    },
    medium: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        fontSize: 16,
    },
    large: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        fontSize: 18,
    },
};

export const LiquidButton = ({
    size = 'medium',
    title,
    leadingIcon,
    trailingIcon,
    onPress,
}: Props) => {
    const theme = useTheme();
    const sizeStyles = sizes[size];
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={[styles.container, { backgroundColor: theme.button, ...sizeStyles }]}>
                {leadingIcon}
                <Text
                    style={[styles.title, { color: theme.onButton, fontSize: sizeStyles.fontSize }]}
                >
                    {title}
                </Text>
                {trailingIcon}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.lg,
        gap: 6,
    },
    title: {
        fontWeight: '600',
    },
});
