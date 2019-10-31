import { Button, Form, Input, Popover, Progress } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';

import { StateType } from './model';
import styles from './style.less';
import { messages } from '@/utils/GlobalTools';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="useranduserregister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="useranduserregister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="useranduserregister.strength.short" />
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

interface UserRegisterProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  userAndUserRegister: StateType;
  submitting: boolean;
}
interface UserRegisterState {
  confirmDirty: boolean;
  visible: boolean;
  help: string;
}

export interface UserRegisterParams {
  mail: string;
  password: string;
  confirm: string;
}

@connect(
  ({
    userAndUserRegister,
    loading,
  }: {
    userAndUserRegister: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    userAndUserRegister,
    submitting: loading.effects['userAndUserRegister/submit'],
  }),
)
class UserRegister extends Component<
  UserRegisterProps,
  UserRegisterState
> {
  state: UserRegisterState = {
    confirmDirty: false,
    visible: false,
    help: '',
  };

  interval: number | undefined = undefined;

  // componentDidUpdate() {
  //   const { userAndUserRegister, form } = this.props;
  //   const account = form.getFieldValue('mail');
  //   if (userAndUserRegister.status === 'ok') {
  //     message.success('注册成功！');
  //     router.push({
  //       pathname: '/user/register-result',
  //       state: {
  //         account,
  //       },
  //     });
  //   }
  // }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: {
            ...values,
            type: 'register',
          },
          callback: ({code, msg}:{code:number, msg: string}) => {
            if (code !== 200) messages('error', `${msg}`, 3, 'thunderbolt');
            else messages('success', `${msg}`, 3, 'check');
          }
        });
      }
    });
  };

  checkConfirm = (rule: any, value: string, callback: (messgae?: string) => void) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'useranduserregister.password.twice' }));
    } else {
      callback();
    }
  };

  checkPassword = (rule: any, value: string, callback: (messgae?: string) => void) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'useranduserregister.password.required' }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="useranduserregister.register.register" />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'useranduserregister.userName.required' }),
                },
                {
                  pattern: /^[a-zA-Z0-9_-]{4,12}$/,
                  message: formatMessage({ id: 'useranduserregister.userName.wrong-format' }),
                }
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({ id: 'useranduserregister.userName.placeholder' })}
              />,
            )}
          </FormItem>
          <FormItem help={help}>
            <Popover
              getPopupContainer={node => {
                if (node && node.parentNode) {
                  return node.parentNode as HTMLElement;
                }
                return node;
              }}
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <FormattedMessage id="useranduserregister.strength.msg" />
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({ id: 'useranduserregister.password.placeholder' })}
                />,
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'useranduserregister.confirm-password.required' }),
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({ id: 'useranduserregister.confirm-password.placeholder' })}
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'useranduserregister.email.required' }),
                },
                {
                  type: 'email',
                  message: formatMessage({ id: 'useranduserregister.email.wrong-format' }),
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({ id: 'useranduserregister.email.placeholder' })}
              />,
            )}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="useranduserregister.register.register" />
            </Button>
            <Link className={styles.login} to="/user/login">
              <FormattedMessage id="useranduserregister.register.sign-in" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create<UserRegisterProps>()(UserRegister);
