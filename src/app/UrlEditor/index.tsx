import React from "react";
import { Input } from 'antd'

export default function ({
    value,
    onChange
}) {
    return <Input style={{
        borderRadius: 0,
        paddingTop: 0,
        paddingBottom: 0
    }} value={value} onChange={e => {
        onChange(e.target.value)
    }} />
}