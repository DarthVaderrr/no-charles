import React, { useState, useEffect, useMemo } from "react";
import { observer } from 'mobx-react-lite'
import { useApp } from '../store'
import JSONEditor from "../JSONEditor";
import UrlEditor from '../UrlEditor'
import { Drawer, Button, Spin, Divider } from 'antd'
import { commitRequestModify, commitResponseModify, getReponseElements, getReqeustElements } from '../utils'
import { ForwardOutlined, LoadingOutlined } from '@ant-design/icons'
import style from './index.less'
import { colors, simpleRequestMethods } from '../const'

const getStatusText = (status?: boolean) => {
    return status ? <span style={{ color: colors.ok }}>finished</span> : <span style={{ color: colors.notice }}>in hand...</span>
}

export default observer(() => {
    const { edittingRequestId, setEdittingRequestId, updateRequestItem, requestList } = useApp()
    const edittingRequestItem = useMemo(() =>
        requestList.find(r => r.id === edittingRequestId)
        , [requestList, edittingRequestId])
    const { request, response } = edittingRequestItem
    const [requestBody, setRequestBody] = useState('')
    const [requestHeadersJSON, setRequestHeadersJSON] = useState('')
    const [url, setUrl] = useState(edittingRequestItem.url)
    const [responseBody, setResponseBody] = useState('')
    const [responseHeadersJSON, setResponseHeadersJSON] = useState('')
    useEffect(() => {
        if (response && response.bodyUsed === false) {
            getReponseElements(response)
                .then(({
                    body, headersJSON
                }) => {
                    setResponseBody(body)
                    setResponseHeadersJSON(headersJSON)
                    updateRequestItem({ ...edittingRequestItem, responseBody: body })
                })
        } else if (edittingRequestItem.responseBody) {
            setResponseBody(edittingRequestItem.responseBody)
        }
    }, [response])

    useEffect(() => {
        if (request) {
            getReqeustElements(request)
                .then(({ body, headersJSON }) => {
                    setRequestBody(body)
                    setRequestHeadersJSON(headersJSON)
                })
        }
    }, [request])

    return <Drawer
        headerStyle={{
            padding: 2,
            borderBottom: 'none'
        }}
        bodyStyle={{
            padding: '0 4px'
        }}
        className={style.container}
        placement="right"
        height={'100%'}
        width={700}
        open={!!edittingRequestItem}
        footer={null}
        onClose={() => setEdittingRequestId(undefined)}>
        <section>
            <Divider type='horizontal' orientation='left' orientationMargin={0}>
                <span>Request {getStatusText(edittingRequestItem.requestHandled)}</span>
                {
                    edittingRequestItem.requestHandled ? null :
                        <Button
                            type="text"
                            icon={<ForwardOutlined style={{
                                color: colors.ok
                            }} />}
                            size='small'
                            disabled={edittingRequestItem.requestHandled}
                            onClick={() => {
                                const body = simpleRequestMethods.includes(request.method.toUpperCase()) ? undefined : requestBody
                                commitRequestModify({
                                    ...edittingRequestItem,
                                    requestHandled: true,
                                    request: new Request(url, { ...request, body })
                                })
                            }}>Go ahead</Button>
                }
            </Divider>
            <UrlEditor value={url} onChange={setUrl} />
            <JSONEditor header={'Headers'} value={requestHeadersJSON} onChange={setRequestHeadersJSON} />
            {
                simpleRequestMethods.includes(request.method.toUpperCase()) ? null : <JSONEditor header={'Body'} value={requestBody} onChange={setRequestBody} />
            }
        </section>

        <Spin spinning={!edittingRequestItem.response}> { /* body可能是空字符串，所以这里不用body判断 */}
            <Divider type='horizontal' orientation='left' orientationMargin={0}>
                <span>Responese {getStatusText(edittingRequestItem.responseHandled)}</span>
                {
                    edittingRequestItem.responseHandled ? null :
                        <Button
                            type="text"
                            size='small'
                            icon={<ForwardOutlined style={{
                                color: colors.ok
                            }} />}
                            disabled={edittingRequestItem.responseHandled}
                            onClick={() => {
                                commitResponseModify({
                                    ...edittingRequestItem,
                                    responseHandled: true,
                                    response: new Response(responseBody, response)
                                })
                            }}>Go ahead</Button>
                }
            </Divider>
            <JSONEditor header={'Headers'} value={responseHeadersJSON} onChange={setResponseHeadersJSON} />
            <JSONEditor header='Body' value={responseBody} onChange={setResponseBody} />
        </Spin>
    </Drawer>
})