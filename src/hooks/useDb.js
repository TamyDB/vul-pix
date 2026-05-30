import { useContext } from "react"
import { DbContext } from "../context/DatabaseProvider"

export function useDb() {
    const { db, commit } = useContext(DbContext)
    if (!db) throw new Error("useDb must be used inside <DatabaseProvider>")

    return {
        save: (col, data) => { const id = db.save(col, data); commit(); return id },
        delete: (col, id) => { db.delete(col, id); commit() },
        update: (col, id, d) => { db.update(col, id, d); commit() },
        getAll: (col) => db.getAll(col),
        getById: (col, id) => db.getById(col, id),
    }
}