import React, {Component} from 'react';
import {Button, Form, Input, Modal, Upload, Icon, message} from 'antd';
if (process.env.BROWSER) {
    require('./styles.scss')
}

class Message extends Component {
    onKeyPress = (e)=> {
        if (e.which === 13 && !e.shiftKey) {
            let data = {
                im: this.props.im,
                to: {
                    id: this.props.messageId,
                    type: this.props.messageType
                },
                from: {
                    id: this.props.userId
                },
                userId: this.props.userId,
                content: {
                    body: e.target.value,
                    media: 0
                },
                ts: new Date().getTime()
            };
            this.props.sendMessage(data);
            e.target.value = '';
        }
    }

    handleUploadAttachment = (file)=> {
        let fileForm = new FormData();
        fileForm.append('attachment', file);
        let data = {
            im: this.props.im,
            to: {
                id: this.props.messageId,
                type: this.props.messageType
            },
            from: {
                id: this.props.userId
            },
            userId: this.props.userId,
            data: fileForm
        };
        this.props.uploadAttachment(data);
    }

    componentDidUpdate=()=>{
        //ui更新时,把聊天记录拉到最底部
        this.refs.messageList.scrollTop = 99999999;
    }

    render() {
        let self = this;
        const FormItem = Form.Item;
        const uploadProps = {
            showUploadList: false,
            accept: 'image/*',
            beforeUpload(file){
                self.handleUploadAttachment(file);
                return false;
            }
        };
        return (
            <section>
                <div className="message-list" ref="messageList">
                    {this.props.currentMessageList.map((item, i)=>
                        item.fromId === this.props.userId ?
                            <div key={i} className={'message-item right'}>
                                <a href="#">{item.fromId}</a>
                                {item.content.media === 0 &&
                                <div>{item.content.body}</div>
                                }

                                {item.content.media === 1 &&
                                <img src={item.content.body} />
                                }
                            </div>
                            :
                            <div key={i} className={'message-item left'}>
                                <a href="#">{item.fromId}</a>
                                {item.content.media === 0 &&
                                <div>{item.content.body}</div>
                                }

                                {item.content.media === 1 &&
                                <img src={item.content.body} />
                                }
                            </div>
                    )}
                </div>
                <div className="message-input">
                    <Form>
                        <FormItem>
                            <Input type="textarea" onKeyPress={this.onKeyPress}/>
                            <Upload {...uploadProps}>
                                <Button type="ghost">
                                    <Icon type="upload"/> 上传图片
                                </Button>
                            </Upload>
                        </FormItem>
                    </Form>
                </div>
            </section>
        )
    }
}

export default Message;