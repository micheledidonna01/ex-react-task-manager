import { createContext} from "react";
import useTasks from "../customhooks/useTasks";

export const GlobalContext = createContext();


export function GlobalProvider ({ children }) {
    const { tasks, 
            getTasks,
            setTasks, 
            error, 
            loading, 
            addTask, 
            removeTask, 
            updateTask 
            } = useTasks();
    // const [tasks, setTasks] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);

    // const getTasks = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch(import.meta.env.VITE_API_URL_TASK);
    //         const data = await response.json();
    //         setTasks(data);
    //     } catch (error) {
    //         setError(true);
    //         console.error('Error fetching tasks:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     getTasks();
    // }, []);

    return (
        <GlobalContext.Provider value={{ tasks, loading, error, getTasks, setTasks, addTask, removeTask, updateTask }}>
            {children}
        </GlobalContext.Provider>
    );
}

// // ThemeContext.js
// import { createContext, useState } from 'react';

// export const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//     const [theme, setTheme] = useState('light');

//     const toggleTheme = () => {
//         setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// }