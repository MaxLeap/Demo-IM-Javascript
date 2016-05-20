import React, {Component} from 'react';
import { Tabs, Button, Modal, Form, Input, Icon, message } from 'antd';
if(process.env.BROWSER){
    require('./styles.scss')
}

class GroupInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            groupId: undefined,
            editName: false
        }
    }

    showModal=(id)=>{
        this.setState({
            visible: true,
            groupId: id
        })
    }

    hideModal=()=>{
        this.setState({
            visible:false
        })
    }

    handleOpenMessage=(messageId)=>{
        this.props.openMessage({
            messageId: messageId,
            messageType: 'group'
        })
    }

    handleRmGroup=(id)=>{
        this.props.rmGroup({
            im: this.props.im,
            groupId: id,
            userId: this.props.userId
        })
    }

    handleAddMembers=()=>{
        this.props.form.validateFields((errors, values)=> {
            if (!!errors) {
                return;
            }
            this.props.addGroupMembers({
                im: this.props.im,
                groupId: this.state.groupId,
                members: [values.memberId]
            });
            this.hideModal();
        })
    }

    handleRmMembers=(groupId, memberId)=>{
        this.props.rmGroupMembers({
            im: this.props.im,
            groupId: groupId,
            members: [memberId]
        })
    }

    handleEditStart=()=>{
        this.setState({
            editName: true
        })
    }

    handleUpdateName=(groupId, e)=>{
        if(e.key !== 'Enter'){
            return;
        }
        let inputValue = e.target.value.trim();
        if(inputValue === ''){
            return;
        }
        this.setState({
            editName: false
        });

        this.props.setGroupAttributes({
            im: this.props.im,
            groupId: groupId,
            userId: this.props.userId,
            data: {
                name: inputValue
            }
        });

    }

    componentWillReceiveProps=(nextProps)=>{
    }

    render(){
        const {getFieldProps, getFieldError} = this.props.form;
        const memberIdProps = getFieldProps('memberId', {
            rules: [
                {required: true, message: '不能为空'}
            ]
        });
        const TabPane = Tabs.TabPane;
        const groupInfo = this.props.groupInfo;
        return (
            <section className="group-info">
                {groupInfo &&
                    <div>
                        <Tabs>
                            <TabPane tab="首页" key="1">
                                <div>ID: {groupInfo.id}</div>
                                <div>名称: {!this.state.editName && this.props.groupInfo.attributes.name}
                                    {this.state.editName && <div className="edit-group-field-input"><Input type="text" size="small" defaultValue={this.props.groupInfo.attributes.name} onKeyPress={this.handleUpdateName.bind(this, groupInfo.id)}/></div>}
                                    {!this.state.editName && <Icon type="edit" className="edit-group-field" onClick={this.handleEditStart}/>}
                                </div>
                                <div>群主: {groupInfo.owner}</div>
                            </TabPane>
                            <TabPane tab="成员" key="2">
                                {groupInfo.members.map((item, i)=>
                                    <div className="group-member-item" key={i}>
                                        <span>{item}</span>
                                        <Button className="group-member-delete" size="small"
                                                onClick={this.handleRmMembers.bind(this, groupInfo.id, item)}>删除</Button>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane tab="设置" key="3">
                                <div>
                                    <a href="javascript:void(0);"
                                       onClick={this.showModal.bind(this, groupInfo.id)}>增加成员</a>
                                </div>
                                <div>
                                    <a href="javascript:void(0);"
                                       onClick={this.handleRmGroup.bind(this, groupInfo.id)}>解散群组</a>
                                </div>
                            </TabPane>
                        </Tabs>
                        <Button size="small" type="primary" className="send-message" onClick={this.handleOpenMessage.bind(this, groupInfo.id)}>发起会话</Button>
                    </div>}
                <Modal title="增加成员" visible={this.state.visible} onOk={this.handleAddMembers} onCancel={this.hideModal}>
                    <Form form={this.props.form}>
                        <Form.Item>
                            <Input type="text" {...memberIdProps} />
                        </Form.Item>
                    </Form>
                </Modal>
            </section>
        );
    }
}

export default Form.create()(GroupInfo);