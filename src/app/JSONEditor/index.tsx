import Editor from '@monaco-editor/react'
import React from 'react'
import { Collapse } from 'antd'
import style from './index.less'

export default function ({ value, onChange, height = 200, header } : {
    value: string
    onChange:(va: string) => void
    height?: number
    header?: React.ReactNode
}) {
    return (
        <Collapse ghost className={style.container}>
            <Collapse.Panel style={{
                padding: 2
            }} key={'1'} header={header}>
                <Editor
                    language='json'
                    value={value}
                    height={height}
                    onChange={onChange}
                    theme='vs-dark'
                />
            </Collapse.Panel>
        </Collapse>
    )

}