import { createContext, useContext, useEffect, useState } from "react";

type theme = 'dark' | 'light';
type ThemeContext = {
    theme: theme,
    // setTheme:React.Dispatch<React.SetStateAction<theme>>
    toggleTheme: () => void,
    showSearchInput: boolean,
    setShowSearchInput: React.Dispatch<React.SetStateAction<boolean>>
}
export const ThemeContext = createContext<ThemeContext | null>(null);

type ThemeContextProviderProps = {
    children: React.ReactNode
}
export default function ThemeContextProvider({ children }: ThemeContextProviderProps) {

    const [theme, setTheme] = useState<theme>('light');
    const [showSearchInput, setShowSearchInput] = useState<boolean>(true)

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };


    // useEffect(()=>{
    //     setShowSearchInput(true)
    //     // alert()
    // },[showSearchInput])
    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                showSearchInput,
                setShowSearchInput
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider');
    }

    return context;
} 