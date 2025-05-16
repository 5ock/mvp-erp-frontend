import { UserProvider } from './UserContext'
import { ThemeProvider } from './ThemeContext'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (<UserProvider>
        <ThemeProvider>
            { children }
        </ThemeProvider>
    </UserProvider>)
}

