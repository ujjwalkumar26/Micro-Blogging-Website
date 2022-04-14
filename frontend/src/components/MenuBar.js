import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeTwoTone, UserAddOutlined, UserOutlined } from '@ant-design/icons';
function MenuBar() {
    const pathName = window.location.pathname;
    let path = '/';
    if(pathName === '/') path = 'home';
    else path = pathName.substring(1);
    const [current, setCurrent] = useState(path);

    const handleClick = (e) => {
        console.log(e.key);
        setCurrent(e.key);
    };

    return (
      <Menu onClick={handleClick} selectedKeys={ [current] } mode="horizontal">
        <Menu.Item key="home" icon={ <HomeTwoTone />} >
            <a href="/" >
                Home
            </a>
            </Menu.Item>
        <Menu.Item key="signin" icon={ <UserAddOutlined />} >
            <a href="/signin" >
                SignIn
            </a>
        </Menu.Item>
        <Menu.Item key="signup" icon={ <UserOutlined /> } >
            <a href="/signup" >
                SignUp
            </a>
        </Menu.Item>
      </Menu>
    )
}
export default MenuBar;