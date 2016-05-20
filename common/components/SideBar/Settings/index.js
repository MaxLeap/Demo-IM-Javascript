import React, {Component} from 'react';
import { Button} from 'antd';
if(process.env.BROWSER){
    require('./styles.scss')
}

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            onOK: undefined,
            title: ''
        }
    }
    handleOpenSelfInfo=()=>{
        this.props.openSelfInfo({
            im: this.props.im,
            id: this.props.userId
        })
    }
    handleLogout=()=>{
        this.props.logout();
    }
    render() {
        return (
            <section className="sidebar-settings">
                <div>
                    <a className="setting-item" href="javascript:void(0);" onClick={this.handleOpenSelfInfo}>我的名片</a>
                    <a className="setting-item" href="javascript:void(0);" onClick={this.handleLogout}>退出登录</a>
                </div>
            </section>
        )
    }
}


