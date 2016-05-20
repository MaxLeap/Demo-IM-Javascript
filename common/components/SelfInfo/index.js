import React, {Component} from 'react';
import { Button, Form, Input } from 'antd';
if(process.env.BROWSER){
    require('./styles.scss')
}

class SelfInfo extends Component {
    constructor(props) {
        super(props);
    }

    handleSetSelfInfo=()=>{
        let data = {
            im: this.props.im,
            id: this.props.userId
        };

        this.props.form.validateFields((errors, values)=>{
            data.attributes = {
                name: values.name,
                description: values.description
            };

            this.props.setSelfInfo(data);
        });

    }

    render(){
        const selfInfo = this.props.selfInfo || {};
        selfInfo.attributes = selfInfo.attributes || {};
        const FormItem = Form.Item;
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        const nameProps = getFieldProps('name', {
            initialValue: selfInfo.attributes.name
        });
        const descriptionProps = getFieldProps('description', {
            initialValue: selfInfo.attributes.description
        });

        return (
            <section>
                <Form horizontal>
                    <FormItem
                        {...formItemLayout}
                        label="ID：">
                        <p className="ant-form-text">{selfInfo.id}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="昵称：">
                        <Input
                            type="text" {...nameProps}/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="签名：">
                        <Input
                            type="text" {...descriptionProps}/>
                    </FormItem>
                    <FormItem
                        wrapperCol={{ span: 16, offset: 6 }}>
                        <Button type="primary" onClick={this.handleSetSelfInfo}>更新</Button>
                    </FormItem>
                </Form>
            </section>
        );
    }
}

export default Form.create()(SelfInfo);