import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { data } from '../../data/data';
import type { Board, List, Task } from '../types/data';

interface StoreState {
    boards: Board[];
    lists: List[];
    tasks: Task[];
    initializeStore: () => void;
    resetStore: () => void;

    addBoard: (board: Board) => void;
    updateBoard: (updatedBoard: Board) => void;
    deleteBoard: (id: number) => void;

    updateTask: (updatedTask: Task) => void;
    moveTask: (taskId: number, toListId: number) => void;
    addList: (list: List) => void;
    deleteList: (id: number) => void;
    updateList: (updatedList: List) => void;
}

const useStoreBase = create<StoreState>((set, get) => ({
    boards: [],
    lists: [],
    tasks: [],

    initializeStore: () => {
        set({
            boards: data.boards,
            lists: data.lists,
            tasks: data.tasks,
        });
    },

    resetStore: () => {
        set({
            boards: data.boards,
            lists: data.lists,
            tasks: data.tasks,
        });
    },

    addBoard: (board: Board) => {
        set({ boards: [...get().boards, board] });
    },

    updateBoard: (updatedBoard: Board) => {
        set({
            boards: get().boards.map(board =>
                board.id === updatedBoard.id ? updatedBoard : board
            ),
        });
    },

    deleteBoard: (id: number) => {
        set({ boards: get().boards.filter(board => board.id !== id) });
    },

    addList: (list: List) => {
        set({ lists: [...get().lists, list] });
    },

    deleteList: (id: number) => {
        set({ lists: get().lists.filter(list => list.id !== id) });
    },

    updateList: (updatedList: List) => {
        set({
            lists: get().lists.map(list => (list.id === updatedList.id ? updatedList : list)),
        });
    },
    updateTask: (updatedTask: Task) => {
        set({
            tasks: get().tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)),
        });
    },
    moveTask: (taskId: number, toListId: number) => {
        set({
            tasks: get().tasks.map(t => (t.id === taskId ? { ...t, listId: toListId } : t)),
        });
    },
}));

export const useStore = useStoreBase;

export function useShallowStore<T>(selector: (state: StoreState) => T): T {
    return useStoreBase(useShallow(selector));
}
