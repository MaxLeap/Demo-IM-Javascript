import React, {Component} from 'react'
import {Button, Form, Input, Modal, message, Tabs} from 'antd'
if(process.env.BROWSER){
    require('./styles.scss')
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            loginMode:'1'
        }
    }

    handleChangeLoginMode = (key)=> {
        this.state.loginMode = key;
    }

    handleOk = ()=> {
        let data = {
            region: 'cn',
            appId: '5722fe2360b23771c2eee2b5',
            clientId: 'Z1NwNUhuT1pEMW0yZGN5RTVkMzZEdw'
        };

        this.props.form.validateFields((errors, values)=> {
            if (!!errors) {
                return;
            }

            switch (this.state.loginMode){
                case '1':
                    data.userId = values.userId;
                    break;
                case '2':
                    data.username = values.username;
                    data.password = values.password;
                    break;
                case '3':
                    data.passenger = {
                        name: values.passengerName
                    };
                    break;
            }

            this.props.login(data);
        })
    }

    render() {
        const FormItem = Form.Item;
        const TabPane = Tabs.TabPane;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        };
        const {getFieldProps, getFieldError} = this.props.form;
        const {authState} = this.props;

        const userIdProps = getFieldProps('userId', {
            rules: [
                // {required: true, message: '不能为空'}
            ],
            initialValue: 'henry'
        });

        const userNameProps = getFieldProps('username', {
            rules: [],
            initialValue: 'foobar'
        });

        const passwordProps = getFieldProps('password', {
            rules: [],
            initialValue: '123456'
        });

        const passengerNameProps = getFieldProps('passengerName', {
            rules: [],
            initialValue: 'passenger001'
        });

        return (
            <div>
                <Modal className="login-modal" title="登录"
                       closable={false}
                    {...authState}
                       onOk={this.handleOk}>
                    <Form horizontal form={this.props.form}>
                        <Tabs onChange={this.handleChangeLoginMode} type="card">
                            <TabPane tab="普通用户" key="1">
                                <FormItem
                                    {...formItemLayout}
                                    label="用户标示：">
                                    <Input
                                        type="text" {...userIdProps}/>
                                </FormItem>
                            </TabPane>
                            <TabPane tab="MaxLeap 用户" key="2">
                                <FormItem
                                    {...formItemLayout}
                                    label="用户名：">
                                    <Input
                                        type="text" {...userNameProps}/>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="密码：">
                                    <Input
                                        type="text" {...passwordProps}/>
                                </FormItem>
                            </TabPane>
                        </Tabs>
                    </Form>
                </Modal>
            </div>

        )
    }
}

export default Form.create()(Login);