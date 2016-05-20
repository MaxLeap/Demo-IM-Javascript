import React, {Component} from 'react';
import {Icon, Tabs, Menu, Dropdown, Badge} from 'antd';
import AddMenu from './addMenus';
import MessageBadges from './MessageBadges';
import Friends from './Friends';
import Groups from './Groups';
import Settings from './Settings';

export default class SideMenu extends Component {

    handleChangeActiveTab = (key)=> {
        this.props.changeActiveTab(key);
    }

    render() {
        const TabPane = Tabs.TabPane;
        return (
            <section>
                <Tabs tabPosition="left" activeKey={this.props.tabActiveKey} onTabClick={this.handleChangeActiveTab}>
                    <TabPane tab={<span><Icon type="message" />
                    <Badge dot={this.props.hasUnread}>
                            消息
                        </Badge>
                    </span>} key="1">
                        <MessageBadges {...this.props}></MessageBadges>
                    </TabPane>
                    <TabPane tab={<span><Icon type="user" />好友</span>} key="2">
                        <Friends {...this.props}></Friends>
                    </TabPane>
                    <TabPane tab={<span><Icon type="team" />群组</span>} key="3">
                        <Groups {...this.props}></Groups>
                    </TabPane>
                    <TabPane tab={<span><Icon type="plus-circle-o" />添加</span>} key="4">
                        <AddMenu {...this.props}></AddMenu>
                    </TabPane>
                    <TabPane tab={<span><Icon type="setting" />设置</span>} key="5">
                        <Settings {...this.props}></Settings>
                    </TabPane>
                </Tabs>
            </section>

        )
    }
}
