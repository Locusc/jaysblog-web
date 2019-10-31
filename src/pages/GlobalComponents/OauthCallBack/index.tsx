import React, { useEffect } from 'react';
import { Spin, Icon, Layout } from 'antd';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';
import { messages, getQueryStringByName } from '@/utils/GlobalTools';

interface OauthCallBackIndexProps {
  dispatch: Dispatch<AnyAction>;
}

const OauthCallBackIndex:React.FunctionComponent<OauthCallBackIndexProps> = (props) => {

  const { dispatch } = props

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    const code = getQueryStringByName('code')
    if(code){
      handleGithubAccess(code)
    }
  }, [])

  const handleGithubAccess = (code: string) => {
    dispatch({
      type:'login/login',
      payload:code,
      callback: ({code, msg}:{code:number, msg:string}) => {
        if(code === 200){
          if (code !== 200) messages('error', `${msg}`, 3, 'thunderbolt');
          else messages('success', `${msg}`, 3, 'check');
        }
      }
    })
  }

  return (
    <Layout>
      <Layout.Content>
        <div style={{textAlign:"center", marginTop:document.documentElement.clientHeight/2.7}}>
          <img style={{height:150, width:150}} src={require('../../../assets/images/message_board_01.jpg')} alt="message_board_01"/>
        </div>
        <div style={{textAlign:"center", marginTop:10}}>
          <Spin
            tip={'正在获取授权中......'}
            style={{fontSize:20}}
            indicator={antIcon}
          />
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default connect()(OauthCallBackIndex)
