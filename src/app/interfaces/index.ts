export type RequestType = 'xhr' | 'fetch'
export type RequestItem = {
    url: string
    path: string
    query?: string
    type: RequestType
    status: number
    method: string
    id: string
    originRequest: Request
    originResponse?: Response
    request: Request
    response?: Response,
    requestHandled?: boolean
    responseHandled?: boolean
    responseBody?: any
}