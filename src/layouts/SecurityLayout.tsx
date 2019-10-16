import React from 'react';
import { Redirect } from 'umi';
import { connect } from 'dva';
import { stringify } from 'querystring';
import PageLoading from '@/components/PageLoading';
import { ConnectState, ConnectProps } from '@/models/connect';
import { CurrentUser } from '@/models/user';

interface SecurityLayoutProps extends ConnectProps {
  loading: boolean;
  currentUser: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
  isCompleted: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
    isCompleted: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
        callback: ({ code, msg }: { code: number; msg: string }) => {
          if (code === 200) this.setState({ isCompleted: true });
        },
      });
    }
  }

  render() {
    const { isReady, isCompleted } = this.state;
    const { children, loading, currentUser } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    // currentUser && currentUser.userid
    const isLogin = currentUser && currentUser.id;
    const queryString = stringify({
      redirect: window.location.href,
    });
    if (isCompleted) {
      if ((!isLogin && loading) || !isReady) {
        return <PageLoading />;
      }
      if (!isLogin) {
        return <Redirect to={`/user/login?${queryString}`}></Redirect>;
      }
    }

    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
