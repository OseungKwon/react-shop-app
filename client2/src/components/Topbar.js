import React from 'react'
import { Menu, Icon, Badge } from 'antd'
const Topbar = () => {
    return (
        <div style={{ height: '4rem', padding: "0.3rem", borderBottom: "1px solid gray", marginBottom: "2rem" }}>
            <Menu style={{ display: "flex", justifyContent: "center" }}>
                <Menu.Item key="Main" >
                    <a href="/" style={{ color: "darkcyan", fontWeight: "bold" }}>Main</a>
                </Menu.Item>
                <Menu.Item key="Upload">
                    <a href="/product/upload">Upload</a>
                </Menu.Item>
                <Menu.Item key="Login">
                    <a href="/login">Login</a>
                </Menu.Item>
                <Menu.Item key="Register">
                    <a href="/register">Register</a>
                </Menu.Item>
                <Menu.Item key="Cart" style={{ display: 'flex', alignItems: "flex-end", overflow: "visible" }}>
                    <Badge count={1} >
                        <a href="/user/cart" style={{ marginRight: -22, color: '#667777' }}>
                            <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 4 }} />
                        </a>
                    </Badge>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Topbar
