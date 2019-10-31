import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { IAddBoardMessage } from '@/services/blogs/board';

const FormItem = Form.Item

interface AddMessageBoardProps extends FormComponentProps {
  visible: boolean;
  handleCancleModal: (visible: boolean) => void;
  handleSubmitFrom: (fieldsValue: IAddBoardMessage) => void;
  submitting: boolean;
}

const AddMessageBoard:React.FunctionComponent<AddMessageBoardProps> = (props) => {

  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const { visible, handleCancleModal, form: {getFieldDecorator}, handleSubmitFrom, submitting } = props

  const cancleModal = (visible: boolean) => {
    if(handleCancleModal){
      handleCancleModal(visible)
    }
  }

  const submitForm = () => {
    const { form } = props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if(handleSubmitFrom) handleSubmitFrom(fieldsValue)
    });
  }

  return (
    <Modal
      title={'添加留言'}
      visible={visible}
      maskClosable={false}
      destroyOnClose
      onCancel={() => cancleModal(false)}
      onOk={submitForm}
      confirmLoading={submitting}
    >
      <Form {...formLayout}>
        <FormItem label="名字">
          {getFieldDecorator('nickName', {
            rules: [{ required: true,message: '请输入您的称呼！'}],
          })(<Input placeholder="请输入你的称呼" />)}
        </FormItem>
        <FormItem label="邮箱">
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: '请输入正确的邮箱格式!'},
              { required: true,message: '请输入邮箱！'}
            ],
          })(<Input placeholder="请输入邮箱" />)}
        </FormItem>
        <FormItem label="内容">
          {getFieldDecorator('desc', {
            rules: [{ required: true,message: '请输入内容！'}],
          })(<Input.TextArea autoSize={{ minRows: 7, maxRows: 10 }} placeholder="请输入内容" />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

const App = Form.create<AddMessageBoardProps>({
  // ...
})(AddMessageBoard);

export default App


