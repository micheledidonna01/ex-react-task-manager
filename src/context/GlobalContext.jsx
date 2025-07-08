import { createContext} from "react";
import useTasks from "../customhooks/useTasks";

export const GlobalContext = createContext();


export function GlobalProvider ({ children }) {
    const { tasks, 
            getTasks,
            error, 
            loading, 
            addTask, 
            removeTask, 
            updateTask,
            removeMultipleTasks,
            } = useTasks();

    return (
        <GlobalContext.Provider value={{ tasks, loading, error, getTasks, addTask, removeTask, updateTask, removeMultipleTasks }}>
            {children}
        </GlobalContext.Provider>
    );
}