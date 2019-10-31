import { Avatar, Icon, Menu, Tag, Tooltip, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { CurrentUser } from '@/models/user';
import { ConnectProps, ConnectState } from '@/models/connect';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { messages } from '@/utils/GlobalTools';
import { Link } from 'umi';

export interface GlobalHeaderRightProps extends ConnectProps {
  currentUser?: CurrentUser;
  menu?: boolean;
  currentUserLoading?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
          callback: ({ code, msg }: { code: number; msg: string }) => {
            if (code !== 200) messages('error', `${msg}`, 3, 'thunderbolt');
            messages('success', `${msg}`, 3, 'check');
          },
        });
      }

      return;
    }
    router.push(`/account/${key}`);
  };

  render(): React.ReactNode {
    const { currentUser = { avatar_url: '', nick_name: '' }, menu, currentUserLoading } = this.props;

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <Icon type="user" />
            <FormattedMessage id="menu.account.center" defaultMessage="account center" />
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <Icon type="setting" />
            <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    return !currentUserLoading? (
      currentUser && currentUser.nick_name ?  (
        <HeaderDropdown overlay={menuHeaderDropdown}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar
              size="small"
              className={styles.avatar}
              src={currentUser.avatar_url}
              alt="avatar"
              icon="user"
            />
            <span className={styles.name}>{currentUser.nick_name}</span>
          </span>
        </HeaderDropdown>
      ) : (
        <span>
          <Tooltip placement="bottomLeft" title={'支持Github授权登陆'}>
            <Link to={'user/login'}>
              <Tag style={{cursor:"pointer"}} color={'#108ee9'}>登陆</Tag>
            </Link>
          </Tooltip>
          <Link to={'user/register'}>
            <Tag style={{cursor:"pointer"}}>注册</Tag>
          </Link>
        </span>
      )
    ) : (
      <span>
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </span>
    )
  }
}
export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  currentUserLoading: loading.models.user
}))(AvatarDropdown);
