class EventBus {
    events: Record<string, Function[]> = {}
    oncePool: WeakSet<Function> = new WeakSet()

    once = (event: string, callback: Function) => {
        this.on(event, callback)
        this.oncePool.add(callback)
    }

    on = (event: string, callback: Function) => {
        const pool = this.events[event]
        if (pool) pool.push(callback)
        else this.events[event] = [callback]
    }

    off = (event: string, callback: Function) => {
        const pool = this.events[event]
        if (pool) {
            this.events[event] = pool.filter(f => callback !== f)
            if(this.events[event].length === 0) delete this.events[event]
        }
    }

    emit = (event: string, data: any) => {
        const callbacks = this.events[event]
        if (callbacks) {
            callbacks.forEach(cb => {
                cb(data)
                if (this.oncePool.has(cb))
                    this.off(event, cb)
            })
        }
    }
}

export const eventBus = new EventBus()