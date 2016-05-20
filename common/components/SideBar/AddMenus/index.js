import React, {Component} from 'react';
import { Modal, Input, Form } from 'antd';
if(process.env.BROWSER){
    require('./styles.scss')
}
class AddMenus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 'friend',
            onOK: undefined,
            title: ''
        }
    }
    showModal=(type)=>{
        switch (type){
            case 'friend':
                this.setState({
                    title: '添加好友',
                    onOK: this.addFriend
                });
                break;
            case 'group':
                this.setState({
                    title: '创建群组',
                    onOK: this.createGroupSubmit
                });
                break;
            case 'room':
                this.setState({
                    title: '创建聊天室',
                    onOK: this.createRoomSubmit
                });
                break;
        }
        this.setState({
            visible:true
        })
    }
    hideModal=()=>{
        this.setState({
            visible:false
        })
    }
    addFriend=()=>{
        this.props.form.validateFields((errors, values)=> {
            if (!!errors) {
                return;
            }
            this.props.addFriend({
                type: 'friend',
                id: values.id
            });
            this.hideModal();
        })
    }
    createGroupSubmit=()=>{
        this.props.form.validateFields((errors, values)=> {
            if (!!errors) {
                return;
            }
            this.props.addGroup({
                data: {
                    owner: this.props.userId,
                    name: values.id
                },
                im: this.props.im
            });
            this.hideModal();
        })
    }
    createRoomSubmit=()=>{

    }
    handleCancel=()=>{
        this.hideModal();
    }
    render() {
        const {getFieldProps, getFieldError} = this.props.form;
        const idProps = getFieldProps('id', {
            rules: [
                {required: true, message: '不能为空'}
            ]
        });
        return (
            <section className="sidebar-add-menu">
                <div>
                    <a className="add-menu-item" href="javascript:void(0);" onClick={this.showModal.bind(this, 'friend')}>添加好友</a>
                    <a className="add-menu-item" href="javascript:void(0);" onClick={this.showModal.bind(this, 'group')}>创建群组</a>
                </div>

                <Modal title={this.state.title} visible={this.state.visible} onOk={this.state.onOK} onCancel={this.handleCancel}>
                    <Form form={this.props.form}>
                        <Form.Item>
                            <Input type="text" {...idProps} />
                        </Form.Item>
                    </Form>
                </Modal>
            </section>
        )
    }
}

export default Form.create()(AddMenus)

