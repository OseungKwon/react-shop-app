import React from 'react'
import { Menu } from 'antd'
const Topbar = () => {
    return (
        <div style={{ padding: "0.3rem", borderBottom: "1px solid gray", marginBottom: "2rem" }}>
            <Menu style={{ display: "flex", justifyContent: "center" }}>
                <Menu.Item key="Main" >
                    <a href="/" style={{ color: "darkcyan", fontWeight: "bold" }}>Main</a>
                </Menu.Item>
                <Menu.Item key="Upload">
                    <a href="/product/upload">Upload</a>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Topbar
