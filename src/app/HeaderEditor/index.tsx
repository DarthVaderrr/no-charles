import React, { useState } from "react";
import Field from './field'
export default function ({ headers }) {
    const [fields, setFields] = useState(Object.entries(headers).map(([key, value], index) => {
        return {
            key, value, index
        }
    }))
    return <div>
        {
            fields
                .map((field) => {
                    return <Field key={field.index} field={field}
                        onChange={f => {

                        }}
                        onDelete={f => {

                        }}
                    />
                })
        }
    </div>
}