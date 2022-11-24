
import { eventBus } from './eventBus'
import { RequestItem } from './interfaces'

export const getRequestModifiedEventName = (id: string) => id + 'requestmodified'

export const getResponseModifiedEventName = (id: string) => id + 'responsemodified'

export const commitRequestModify = (modifiedRequest: RequestItem) => {
    const eventName = getRequestModifiedEventName(modifiedRequest.id)
    eventBus.emit(eventName, modifiedRequest)
}

export const commitResponseModify = (modifiedRes: RequestItem) => {
    const eventName = getResponseModifiedEventName(modifiedRes.id)
    eventBus.emit(eventName, modifiedRes)
}