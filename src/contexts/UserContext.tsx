import { createContext, useContext, useState } from 'react'
import type { User } from '../types/user'

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}
})

export const UserProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [ user, setUser ] = useState<User | null>(null)

    return (<UserContext.Provider value={{ user, setUser }}>
        { children }
    </UserContext.Provider>)
}

export const useUser = () => useContext(UserContext)