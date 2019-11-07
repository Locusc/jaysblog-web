import { Button, Col, Form, Input, Row } from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { GetFieldDecoratorOptions } from 'antd/es/form/Form';

import omit from 'omit.js';
import ItemMap from './map';
import LoginContext, { LoginContextProps } from './LoginContext';
import styles from './index.less';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type WrappedLoginItemProps = Omit<LoginItemProps, 'form' | 'type' | 'updateActive'>;
export type LoginItemKeyType = keyof typeof ItemMap;
export interface LoginItemType {
  UserName: React.FC<WrappedLoginItemProps>;
  Password: React.FC<WrappedLoginItemProps>;
  Mobile: React.FC<WrappedLoginItemProps>;
  Captcha: React.FC<WrappedLoginItemProps>;
  VerificationCode: React.FC<WrappedLoginItemProps>;
}

export interface LoginItemProps extends GetFieldDecoratorOptions {
  name?: string;
  style?: React.CSSProperties;
  onGetCaptcha?: (event?: MouseEvent) => void | Promise<boolean> | false;
  placeholder?: string;
  buttonText?: React.ReactNode;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  countDown?: number;
  getCaptchaButtonText?: string;
  getCaptchaSecondText?: string;
  updateActive?: LoginContextProps['updateActive'];
  type?: string;
  defaultValue?: string;
  form?: FormComponentProps['form'];
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tabUtil?: LoginContextProps['tabUtil'];
  imageCodeId?: string;
  handleChangeImgCode?: (imageCodeId: number) => void | undefined;
}

interface LoginItemState {
  count: number;
  imgCodeUrl: string;
}

const FormItem = Form.Item;

class WrapFormItem extends Component<LoginItemProps, LoginItemState> {
  static defaultProps = {
    getCaptchaButtonText: 'captcha',
    getCaptchaSecondText: 'second',
  };

  interval: number | undefined = undefined;

  constructor(props: LoginItemProps) {
    super(props);
    this.state = {
      count: 0,
      imgCodeUrl: '',
    };
  }

  componentDidMount() {
    const { updateActive, imageCodeId, name = '' } = this.props;
    this.setState({
      imgCodeUrl: `/api/auth/image_code?code_id=${imageCodeId}`,
    });
    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { onGetCaptcha } = this.props;
    const result = onGetCaptcha ? onGetCaptcha() : null;
    if (result === false) {
      return;
    }
    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  getFormItemOptions = ({ onChange, defaultValue, customProps = {}, rules }: LoginItemProps) => {
    const options: {
      rules?: LoginItemProps['rules'];
      onChange?: LoginItemProps['onChange'];
      initialValue?: LoginItemProps['defaultValue'];
    } = {
      rules: rules || (customProps.rules as LoginItemProps['rules']),
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({ count });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  handleChangeImgCode = () => {
    const { handleChangeImgCode } = this.props;
    const newImageCodeId = new Date().getTime();
    this.setState({
      imgCodeUrl: `/api/auth/image_code?code_id=${newImageCodeId}`,
    });
    if (handleChangeImgCode) handleChangeImgCode(newImageCodeId);
  };

  render() {
    const { count, imgCodeUrl } = this.state;

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
    const {
      onChange,
      customProps,
      defaultValue,
      rules,
      name,
      getCaptchaButtonText,
      getCaptchaSecondText,
      updateActive,
      type,
      form,
      tabUtil,
      imageCodeId,
      handleChangeImgCode,
      ...restProps
    } = this.props;
    if (!name) {
      return null;
    }
    if (!form) {
      return null;
    }
    const { getFieldDecorator } = form;
    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);
    const otherProps = restProps || {};
    if (type === 'Captcha') {
      const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);

      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator(name, options)(<Input {...customProps} {...inputProps} />)}
            </Col>
            <Col span={8}>
              <Button
                disabled={!!count}
                className={styles.getCaptcha}
                size="large"
                onClick={this.onGetCaptcha}
              >
                {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
              </Button>
            </Col>
          </Row>
        </FormItem>
      );
    }
    if (type === 'VerificationCode') {
      const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);

      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator(name, options)(<Input {...customProps} {...inputProps} />)}
            </Col>
            <Col span={8}>
              <img
                className={styles.getCaptcha}
                alt="图形验证码"
                src={imgCodeUrl}
                onClick={this.handleChangeImgCode}
              />
            </Col>
          </Row>
        </FormItem>
      );
    }
    return (
      <FormItem>
        {getFieldDecorator(name, options)(<Input {...customProps} {...otherProps} />)}
      </FormItem>
    );
  }
}

const LoginItem: Partial<LoginItemType> = {};

Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = (props: LoginItemProps) => (
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
          updateActive={context.updateActive}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItem as LoginItemType;
