import React, {Component} from 'react';
import { Button } from 'antd';
if(process.env.BROWSER){
    require('./styles.scss')
}

export default class FriendInfo extends Component {
    constructor(props) {
        super(props);
    }

    handleOpenMessage=(messageId)=>{
        this.props.openMessage({
            messageId: messageId,
            messageType: 'friend'
        })
    }

    handleRmFriend=(id)=>{
        this.props.rmFriend({
            im: this.props.im,
            data: {
                userId: this.props.userId,
                friendId: id
            }
        })
    }

    render(){
        const friendInfo = this.props.friendInfo;
        return (
            <section>
                {friendInfo &&
                <div>
                    <div>
                        ID:{friendInfo.id}
                    </div>
                    <div>
                        昵称:{friendInfo.attributes && friendInfo.attributes.name}
                    </div>
                    <div>
                        签名:{friendInfo.attributes && friendInfo.attributes.description}
                    </div>
                    <div className="friend-info-buttons">
                        <Button size="small" type="primary" onClick={this.handleOpenMessage.bind(this, friendInfo.id)}>发起会话</Button>
                        <Button size="small" className="friend-info-delete" onClick={this.handleRmFriend.bind(this, friendInfo.id)}>删除好友</Button>
                    </div>
                </div>}
            </section>
        );
    }
}