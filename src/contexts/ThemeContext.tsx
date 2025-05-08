import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => {}
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [ theme, setTheme ] = useState<Theme>(
        (localStorage.getItem('erp_theme') as Theme) || 'light'
    )

    useEffect(() => {
        const root = window.document.documentElement;
        if(theme === 'dark')
            root.classList.add('dark')
        else
            root.classList.remove('dark')

        localStorage.setItem('erp_theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    return (<ThemeContext.Provider value={{ theme, toggleTheme }}>
        { children }
    </ThemeContext.Provider>)
}

export const useTheme = () => useContext(ThemeContext)