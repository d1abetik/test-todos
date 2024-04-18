import {createContext, FC, ReactNode, useContext, useState} from "react";
import {ITodo} from "./TodosComponent.tsx";

interface StoreContextType {
	status: boolean;
	filter: string;
	allTodos: ITodo[];
	setAllTodos: (filter: ITodo[]) => void;
	setFilter: (filter:string) => void;
	setStatus: (status: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [status, setStatus] = useState<boolean>(false);
	const [filter, setFilter] = useState<string>('all');
	const [allTodos, setAllTodos] = useState<ITodo[]>([]);

	return (
			<StoreContext.Provider value={{ status, setStatus, filter, setFilter, allTodos, setAllTodos }}>
				{children}
			</StoreContext.Provider>
	);
};

export const useStore = () => {
	const context = useContext(StoreContext);
	if (!context) {
		throw new Error('useStore must be used within a StoreProvider');
	}
	return context;
};
