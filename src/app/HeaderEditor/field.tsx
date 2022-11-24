import React from "react";
import { Input, Button } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
export default function ({ field, onChange, onDelete }: {
    field, onChange, onDelete
}) {
    return <div style={{
        display: 'flex',
        alignItems: 'center'
    }}>
        <Input value={field.key} onChange={e => onChange({
            ...field,
            key: e.target.value
        })} />
        <span>:</span>
        <Input value={field.value} onChange={e => onChange({
            ...field,
            value: e.target.value
        })} />
        <Button icon={<DeleteFilled />} onClick={() => {
            onDelete(field)
        }} />
    </div>
}