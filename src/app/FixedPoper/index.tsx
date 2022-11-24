import React from 'react'
import styles from './index.less'
import Panel from '../Panel'
import { useApp } from '../store'
import { observer } from 'mobx-react-lite'

export default observer(() => {
    const { showPanel } = useApp()
    return <>
        <div className={styles.poper} onClick={showPanel}>🐒</div>
        <Panel />
    </>
})