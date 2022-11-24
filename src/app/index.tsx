import React from 'react'
import { createRoot } from 'react-dom/client'
import Intercepter from './FixedPoper'
import { ContextProvider as MobxContextProvider } from './store'
import { ConfigProvider as AntdConfigProvider } from 'antd'
import './bootstrap'

const appContainer = document.createElement('div')
appContainer.setAttribute('id', 'fetch_interception_app')
document.body.appendChild(appContainer)
const root = createRoot(appContainer)
root.render(
    <AntdConfigProvider prefixCls='fetch_interception_app'>
        <MobxContextProvider>
            <Intercepter />
        </MobxContextProvider>
    </AntdConfigProvider>
)

