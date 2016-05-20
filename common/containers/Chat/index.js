import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col, message, Spin} from 'antd';
import store from 'store2';
import {IM_AUTH_DATA} from '../../constants/authTypes';
import AlertInfo from '../../components/AlertInfo';
import SideBar from '../../components/SideBar';
import Messages from '../../components/Messages';
import FriendInfo from '../../components/FriendInfo';
import GroupInfo from '../../components/GroupInfo';
import SelfInfo from '../../components/SelfInfo';
import * as AuthActions from '../../actions/auth';
import * as MessageActions from '../../actions/chat';
import * as groupActions from '../../actions/group';
import * as groupsActions from '../../actions/groups';
import * as friendActions from '../../actions/friend';
import * as friendsActions from '../../actions/friends';
import * as attachmentsActions from '../../actions/attachments';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleCompontent: '', //同一时间内最多显示 message, friendInfo, groupInfo, selfInfo, roomInfo 其中之一
            currentMessageList: [],
            userId: '',
            messageId: '',
            messageType: '',
            tabActiveKey: '1',
            hasUnread: false
        }
    }

    componentWillMount = ()=> {
        const cachedAuthData = store.get(IM_AUTH_DATA);
        if (!cachedAuthData && !this.props.im) {
            return;
        }
        let im = this.props.im;
        if(!im){
            im = this.props.login(cachedAuthData);
        }

        this.state.userId = this.props.userId || cachedAuthData.userId;
        im.onMessage(data=> {
            data.userId = this.state.userId;
            this.props.receiveMessage(data);

            if (data.to.type === 0) {//friend message
                if (this.state.messageId === data.from.id) {
                    this.props.openMessage({
                        messageId: this.state.messageId
                    });
                }
            } else if (data.to.type === 1) {//group message
                if (this.state.messageId === data.from.gid) {
                    this.props.openMessage({
                        messageId: this.state.messageId
                    });
                }
            }

        });
        setInterval(()=>{
            this.autoFetch(im);
        }, 5000);
        this.autoFetch(im);
    }

    autoFetch =(im)=>{
        this.fetchFriends(im);
        this.fetchGroups(im);
    }

    fetchFriends =(im)=>{
        this.props.listFriends({im: im, userId: this.state.userId});
    }

    fetchGroups =(im)=>{
        this.props.listGroups({im: im, userId: this.state.userId});
    }

    openMessage = (data)=> {
        this.state.messageId = data.messageId;
        this.state.messageType = data.messageType;
        this.setState({
            visibleCompontent: 'message',
            tabActiveKey: '1'
        });
        this.props.openMessage({
            messageId: data.messageId
        });

    }

    openFriendInfo = (data)=> {
        this.props.getFriendInfo(data);
        this.setState({'visibleCompontent': 'friendInfo'});
    }

    openGroupInfo = (data)=> {
        this.props.getGroupInfo(data);
        this.setState({'visibleCompontent': 'groupInfo'});
    }

    openSelfInfo = (data)=> {
        this.props.getSelfInfo(data);
        this.setState({'visibleCompontent': 'selfInfo'});
    }

    addFriend = (data)=> {
        data.im = this.props.im;
        data.userId = this.state.userId;
        this.props.addFriend(data);
    }

    changeActiveTab = (key)=> {
        this.setState({
            tabActiveKey: key,
            visibleCompontent: '',
            messageId: ''
        })
    }

    componentWillReceiveProps = (nextProps)=> {
        let hasUnread = false;
        Object.keys(nextProps.messages).map((item, i)=>{
            if(nextProps.messages[item].unreadCount > 0){
                hasUnread = true;
            }
        });
        this.setState({
            hasUnread: hasUnread,
            currentMessageList: nextProps.messages[this.state.messageId] ? nextProps.messages[this.state.messageId].messageList : []
        })
    }

    render() {
        const {...chatContainerMethods} = {
            addFriend: this.addFriend,
            openFriendInfo: this.openFriendInfo,
            openGroupInfo: this.openGroupInfo,
            openSelfInfo: this.openSelfInfo,
            openMessage: this.openMessage,
            changeActiveTab: this.changeActiveTab
        };
        return (
            <section>
                <Spin spining={this.props.spin.visible}>
                    <AlertInfo {...this.props} />
                    <Row type="flex" justify="center" align="top">
                        <Col span="5">
                            <SideBar
                                {...this.props}
                                {...this.state}
                                {...chatContainerMethods}></SideBar>
                        </Col>
                        <Col span="8" offset="1">

                            {this.state.visibleCompontent === 'message' &&
                            <Messages
                                {...this.props}
                                {...this.state}
                                {...chatContainerMethods}></Messages>}

                            {this.state.visibleCompontent === 'friendInfo' &&
                            <FriendInfo
                                {...this.props}
                                {...chatContainerMethods}></FriendInfo>}

                            {this.state.visibleCompontent === 'groupInfo' &&
                            <GroupInfo
                                {...this.props}
                                {...chatContainerMethods}></GroupInfo>}

                            {this.state.visibleCompontent === 'selfInfo' &&
                            <SelfInfo
                                {...this.props}></SelfInfo>}

                        </Col>
                    </Row>
                </Spin>

            </section>
        );
    }
}

const mapStateToProps = (state)=> {
    const alertInfo = state.alertInfo.toJSON();
    const spin = state.spin.toJSON();
    const im = state.user.get('im');
    const userId = state.user.get('userId'); //当前登录用户的userId
    const friends = state.friends.get('friends');
    const groups = state.groups.toArray();
    const addFriendSuccess = state.friend.get('addFriendSuccess');
    const addFriendFail = state.friend.get('addFriendFail');
    const messages = state.chat.toJSON();
    const friendInfo = state.friendInfo.toJSON().data; //指定用户的friendInfo
    const groupInfo = state.groupInfo.toJSON().data;
    const selfInfo = state.selfInfo.toJSON().data;
    return {
        alertInfo,
        spin,
        im,
        userId,
        friendInfo,
        groupInfo,
        selfInfo,
        friends,
        groups,
        addFriendSuccess,
        addFriendFail,
        messages
    }
};

const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({...AuthActions, ...MessageActions, ...friendActions, ...friendsActions, ...groupActions, ...groupsActions, ...attachmentsActions}, dispatch)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);