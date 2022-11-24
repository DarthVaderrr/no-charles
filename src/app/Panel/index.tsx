import React from "react";
import { Drawer } from 'antd'
import { useApp } from '../store'
import { observer } from 'mobx-react-lite'
import ReqeustList from '../RequestList'
import { CloseCircleOutlined } from '@ant-design/icons'
export default observer(() => {
    const { isShowPanel, hidePanel } = useApp()
    return <Drawer width={1000}
        destroyOnClose={false}
        headerStyle={{ display:'none' }}
        bodyStyle={{ padding: 2 }}
        placement='right'
        open={isShowPanel}
        onClose={hidePanel}
        closeIcon={<CloseCircleOutlined />}
        mask={false}
        footer={null} >
        <ReqeustList onClose={hidePanel} />
    </Drawer>
})