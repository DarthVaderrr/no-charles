import { getModifiedResponse, getModifiedRequest } from './utils'
import hookFetch from './fetch-with-hook'
import { uniqueId } from 'lodash'

hookFetch({
    async onRequest({ request, handler: moveOn }) {
        const requestId = uniqueId()
        const modifiedRequest = await getModifiedRequest(request, 'fetch', requestId)
        moveOn(modifiedRequest, requestId)
    },
    async onResponse({ response, handler: moveOn, originRequest, requestId }) {
        const modifiedRes = await getModifiedResponse(response, originRequest, requestId)
        moveOn(modifiedRes)
    },
    async onError({ error, handler: moveOn }) {
        moveOn(error)
    }
})