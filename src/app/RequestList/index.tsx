import React, { useState, useEffect } from "react";
import { observer } from 'mobx-react-lite'
import { Table, Input, Button, Checkbox } from 'antd'
import { useApp } from '../store'
import { StopOutlined, DoubleRightOutlined } from '@ant-design/icons'
import RequestEditor from '../RequestEditor'
import style from './index.less'

export default observer(({ onClose }: { onClose: () => void }) => {
    const { requestList, hookedPathSet, updateHookedPathSet, setEdittingRequestId, edittingRequestId, clearRequests } = useApp()
    const [keywords, setKeywords] = useState('')
    return <div className={style.container}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button title="Hide" size="small" type="text" icon={<DoubleRightOutlined />} onClick={onClose}></Button>
            <span>
                Click checkbox to hook request
            </span>
            <StopOutlined style={{ margin: '0 10px' }} title='Clear' onClick={() => clearRequests()} />
            <Input size='small'
                style={{ width: 300, marginRight: 10, borderRadius: 0 }}
                allowClear
                placeholder="filter by path"
                onChange={e => setKeywords(e.target.value)} />
        </div>
        <Table
            dataSource={requestList.filter(r => r.url.toUpperCase().includes(keywords.toUpperCase()))}
            pagination={false}
            rowKey='id'
            size='small' columns={[
                {
                    dataIndex: 'id',
                    title: '',
                    width: 20,
                    render: (_, row) => {
                        return <Checkbox checked={hookedPathSet.has(row.path)} onChange={e => {
                            const checked = e.target.checked
                            const currentHookedList = Array.from(hookedPathSet)
                            const newHookedList = checked ?
                                [...currentHookedList, row.path] :
                                currentHookedList.filter(p => p !== row.path);
                            updateHookedPathSet(newHookedList)
                        }} />
                    }
                },
                {
                    dataIndex: 'url',
                    title: 'Url',
                    onCell: (row) => {
                        return {
                            onClick() {
                                setEdittingRequestId(row.id)
                            }
                        }
                    }
                },
                {
                    dataIndex: 'method',
                    title: 'Method',
                    onCell: (row) => {
                        return {
                            onClick() {
                                setEdittingRequestId(row.id)
                            }
                        }
                    }
                },
                {
                    dataIndex: 'type',
                    title: 'Type',
                    onCell: (row) => {
                        return {
                            onClick() {
                                setEdittingRequestId(row.id)
                            }
                        }
                    }
                }
            ]}
        />
        {
            edittingRequestId && <RequestEditor />
        }
    </div>
})