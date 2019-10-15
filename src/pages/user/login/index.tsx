import { Alert, Checkbox, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';
import { StateType } from '@/models/login';
import LoginComponents from './components/Login';
import styles from './style.less';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import { messages } from '@/utils/GlobalTools';

const { Tab, UserName, Password, Mobile, Captcha, Submit, VerificationCode } = LoginComponents;

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userLogin: StateType;
  submitting: boolean;
}
interface LoginState {
  type: string;
  autoLogin: boolean;
  imageCodeId: number;
}

@connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
    autoLogin: true,
    imageCodeId: new Date().getTime(),
  };

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err: unknown, values: LoginParamsType) => {
    const { type, autoLogin, imageCodeId } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          autoLogin,
          imageCodeId,
          type,
        },
        callback: ({ code, msg }: { code: number; msg: string }) => {
          if (code !== 200) messages('error', `${msg}`, 3, 'thunderbolt');
          else messages('success', `${msg}`, 3, 'check');
        },
      });
    }
  };

  onTabChange = (type: string) => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise<boolean>((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }
      this.loginForm.validateFields(
        ['mobile'],
        {},
        async (err: unknown, values: LoginParamsType) => {
          if (err) {
            reject(err);
          } else {
            const { dispatch } = this.props;
            try {
              const success = await ((dispatch({
                type: 'login/getCaptcha',
                payload: values.mobile,
              }) as unknown) as Promise<unknown>);
              resolve(!!success);
            } catch (error) {
              reject(error);
            }
          }
        },
      );
    });

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  handleChangeImgCode = (imageCodeIdNew: number) => {
    this.setState({
      imageCodeId: imageCodeIdNew,
    });
  };

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin, imageCodeId } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={(form?: FormComponentProps['form']) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'user-login.login.tab-login-credentials' })}>
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'user-login.login.message-invalid-credentials' }),
              )}
            <UserName
              name="userName"
              placeholder={`${formatMessage({ id: 'user-login.login.userName' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'user-login.login.password' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
            <VerificationCode
              name="verificationCode"
              placeholder={`${formatMessage({ id: 'user-login.login.verificationCode' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.verificationCode.required' }),
                },
                {
                  pattern: /^[A-Za-z0-9]{4}$/,
                  message: formatMessage({ id: 'user-login.verificationCode.wrong-format' }),
                },
              ]}
              imageCodeId={String(imageCodeId)}
              handleChangeImgCode={this.handleChangeImgCode}
            />
          </Tab>
          <Tab key="mobile" tab={formatMessage({ id: 'user-login.login.tab-login-mobile' })}>
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'user-login.login.message-invalid-verification-code' }),
              )}
            <Mobile
              name="mobile"
              placeholder={formatMessage({ id: 'user-login.phone-number.placeholder' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.phone-number.required' }),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({ id: 'user-login.phone-number.wrong-format' }),
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder={formatMessage({ id: 'user-login.verification-code.placeholder' })}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({ id: 'user-login.form.get-captcha' })}
              getCaptchaSecondText={formatMessage({ id: 'user-login.captcha.second' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.verification-code.required' }),
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="user-login.login.remember-me" />
            </Checkbox>
            <a
              style={{ float: 'right' }}
              href="#"
              onClick={() =>
                messages('error', '暂不提供找回密码功能,请联系管理员重置密码', 3, 'thunderbolt')
              }
            >
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
          <div className={styles.other}>
            <FormattedMessage id="user-login.login.sign-in-with" />
            <Icon type="github" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="user-login.login.signup" />
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
