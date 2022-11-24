import { makeAutoObservable } from 'mobx'
import React, { createContext, useContext } from 'react'
import { RequestItem } from './interfaces'
import { commitRequestModify, commitResponseModify } from './common-actions'
class Store {
    constructor() {
        makeAutoObservable(this)
    }

    // states:
    isShowPanel = false
    hookedPathSet = new Set<string>()
    requestList = new Array<RequestItem>()
    edittingRequestId?: string

    // actions:
    showPanel = () => {
        this.isShowPanel = true
    }
    hidePanel = () => {
        this.isShowPanel = false
    }
    updateHookedPathSet = (paths: string[]) => {
        this.hookedPathSet = new Set(paths)
        this.finishRequests(this.requestList.filter(r => {
            return !this.hookedPathSet.has(r.path)
        }))
    }
    clearRequests = () => {
        this.finishRequests(this.requestList)
        this.updateHookedPathSet([])
        this.requestList = []
    }
    finishRequests = (reqs: RequestItem[]) => {
        reqs.forEach(r => {
            // 将被反选的请求处理完
            if (!r.requestHandled) {
                // 被截获后还未手动发出的
                commitRequestModify({
                    ...r,
                    requestHandled: true,
                    request: r.originRequest
                })
            } else if (!r.responseHandled) {
                // 已发出但是还未手动结束的
                commitResponseModify({
                    ...r,
                    responseHandled: true,
                    response: r.originResponse
                })
            }
        })
    }
    addRequestToList = (req: RequestItem) => {
        this.requestList.push(req)
    }
    updateRequestItem = (requestItem: RequestItem) => {
        this.requestList.splice(this.requestList.findIndex(r => r.id === requestItem.id), 1, requestItem)
        this.requestList = [...this.requestList]
    }
    setEdittingRequestId = (requestId?: string) => {
        this.edittingRequestId = requestId
    }
}

export const store = new Store()

const Context = createContext(store)

export const ContextProvider = ({ children }) => <Context.Provider value={store}>{children}</Context.Provider>

export const useApp = () => {
    return useContext(Context)
}