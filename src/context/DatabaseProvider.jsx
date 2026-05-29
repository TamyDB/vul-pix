import { createContext, useContext, useCallback, useState, useEffect, useRef } from "react"
import { Database } from "../lib/database"

export const DbContext = createContext(null)

export function DatabaseProvider({ children }) {
    const db = useRef(new Database())
    const [, setTick] = useState(0)

    useEffect(() => {
        db.current.fromLocalStorage()
        setTick(t => t + 1)
    }, [])

    const commit = useCallback(() => {
        db.current.toLocalStorage()
        setTick(t => t + 1)
    }, [])

    return (
        <DbContext.Provider value={{ db: db.current, commit }}>
            {children}
        </DbContext.Provider>
    )
}