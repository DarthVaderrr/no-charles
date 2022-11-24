import { store } from './store'
import { RequestItem, RequestType } from './interfaces'
import { eventBus } from './eventBus'
import {
    getRequestModifiedEventName,
    getResponseModifiedEventName,
    commitRequestModify,
    commitResponseModify
} from './common-actions'

export {
    commitRequestModify,
    commitResponseModify
}

const createRequestItem: (req: Request, type: RequestType, requestId: string) => RequestItem = (req, type, id) => {
    const { method, url } = req
    const [path, query] = url.split('?')
    return {
        id,
        url,
        query,
        path,
        type,
        status: -1,
        method,
        request: req,
        originRequest: req,
    }
}



export const isHooked = (url) => {
    const [hostnameAndPath] = url.split('?')
    return store.hookedPathSet.has(hostnameAndPath)
}

export const getModifiedRequest = (request: Request, type: RequestType, requestId: string) => {
    return new Promise<Request>((resolve) => {
        const requestCopy = request.clone()
        const requestItem = createRequestItem(request, type, requestId)
        store.addRequestToList(requestItem)
        if (isHooked(requestCopy.url)) {
            eventBus.once(getRequestModifiedEventName(requestItem.id), (modifiedRequest: RequestItem) => {
                resolve(modifiedRequest.request)
                store.updateRequestItem(modifiedRequest)
            })
        } else {
            resolve(request)
            store.updateRequestItem({
                ...requestItem,
                requestHandled: true
            })
        }
    })
}

export const getModifiedResponse = (response: Response, originRequest: Request, requestId: string) => {
    return new Promise<Response>((resolve) => {
        const requestItem = store.requestList.find(r => r.id === requestId)
        if (requestItem) {
            // 有可能在请求响应时，请求已经被清除了
            requestItem.originResponse = response
            requestItem.response = response.clone()
            store.updateRequestItem(requestItem)
            if (isHooked(originRequest.url)) {
                eventBus.once(getResponseModifiedEventName(requestItem.id), (modifiedRequest: RequestItem) => {
                    resolve(modifiedRequest.response)
                    store.updateRequestItem(modifiedRequest)
                })
            } else {
                resolve(response)
                store.updateRequestItem({
                    ...requestItem,
                    responseHandled: true
                })
            }
        } else {
            resolve(response)
        }
    })
}

export const getReponseElements = async (response: Response) => {
    const responseCopy = response.clone()
    const text = await responseCopy.text()
    return {
        body: tryToGetJSON(text),
        headersJSON: convertHeaderToObj(responseCopy.headers)
    }
}

export const getReqeustElements = async (request: Request) => {
    const requestCopy = request.clone()
    const text = await requestCopy.text()
    return {
        body: tryToGetJSON(text),
        headersJSON: convertHeaderToObj(requestCopy.headers)
    }
}

export const tryToGetJSON = (text: string) => {
    let json = text
    try {
        json = JSON.stringify(JSON.parse(text), null, 2)
    } catch (err) {
    }
    return json
}

const convertHeaderToObj = (headers: Headers) => {
    const obj = {}
    headers.forEach((value, key) => {
        obj[key] = value
    })
    return JSON.stringify(obj, null, 2)
}