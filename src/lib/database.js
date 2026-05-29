export class Database {
    constructor() {
        this.collections = {
            users: new Map(),
            cards: new Map(),
        }
    }

    checkIfCollectionExists(collection) {
        if (!this.collections[collection]) {
            throw new Error(`Collection "${collection}" does not exist.`)
        }
    }

    save(collection, data) {
        this.checkIfCollectionExists(collection)
        const id = crypto.randomUUID()
        this.collections[collection].set(id, data)

        return id
    }

    delete(collection, id) {
        this.checkIfCollectionExists(collection)
        this.collections[collection].delete(id)
    }

    getAll(collection) {
        this.checkIfCollectionExists(collection)
        return Array.from(this.collections[collection].values())
    }

    getById(collection, id) {
        this.checkIfCollectionExists(collection)
        return this.collections[collection].get(id)
    }

    update(collection, id, data) {
        this.checkIfCollectionExists(collection)
        this.collections[collection].set(id, data)
    }

    fromLocalStorage() {
        const collections = Object.keys(this.collections)
        for (const collection of collections) {
            const data = localStorage.getItem(collection)
            if (data) {
                try {
                    const parsed = JSON.parse(data)
                    this.collections[collection] = new Map(parsed)
                } catch (e) {
                    console.error(`Failed to parse ${collection} from localStorage:`, e)
                }
            }
        }
    }

    toLocalStorage() {
        const collections = Object.keys(this.collections)
        for (const collection of collections) {
            const data = JSON.stringify(Array.from(this.collections[collection]))
            localStorage.setItem(collection, data)
        }
    }
}