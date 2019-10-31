import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Tag, Icon, Tooltip, List, Avatar, Button } from 'antd';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { Dispatch, AnyAction } from 'redux';
import { ConnectState } from '@/models/connect';
import { MessageBoardState } from '@/models/blogs/board';
import styles from './index.less';
import BackTopComponent from '../GlobalComponents/BackTop';
import { CurrentUser } from '@/models/user';
import AddMessageBoard from './modal'
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { messages } from '@/utils/GlobalTools';
import { IAddBoardMessage } from '@/services/blogs/board';

export interface MessageBoardProps {
  dispatch: Dispatch<AnyAction>;
  boardMessages: MessageBoardState;
  loading: boolean;
  currentUser: CurrentUser;
}

const MessageBoard: React.FunctionComponent<MessageBoardProps> = (props) => {
  const [reverse, setReverse] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)

  const { dispatch, boardMessages, loading } = props

  useEffect(() => {
    dispatch({
      type:'board/fetchMessageBoardList',
      payload: {}
    })
  }, [])

  const handleChangeReverse = () => {
    if (!reverse) {
      setReverse(true);
    } else {
      setReverse(false);
    }
  }

  const handleVisibleModal = (visible: boolean) => {
    setVisible(visible)
  }

  const handleSubmitFrom = (fieldsValue: IAddBoardMessage) => {
    setSubmitting(true)
    dispatch({
      type:'board/fetchAddMessageBoardInfo',
      payload:{
        ...fieldsValue
      },
      callback: ({code, msg}: { code:number, msg:string }) => {
        if (code === 200){
          messages('success', `${msg}`, 3, 'check')
          handleVisibleModal(false)
          dispatch({ type:'board/fetchMessageBoardList', payload: {} })
        }else {
          messages('error', `${msg}`, 3, 'thunderbolt')
        }
        setSubmitting(false)
      }
    })
  }

  return (
    <PageHeaderWrapper title={' '}>
      <GridContent>
        <Card
          loading={loading}
        >
          {!loading && boardMessages ?
           (
            <Fragment>
              <div>
                <p style={{ textAlign: 'center' }}>
                  <Tag color="geekblue">Message Board</Tag>
                </p>
                <ul style={{paddingLeft:0}}>
                  <li>
                    <Tag color="red">留言板公告:</Tag>
                  </li>
                  <li>
                    <Icon type="arrow-right" />
                    讲文明 树新风 遵纪守法 请勿重拳出击
                  </li>
                  {/* <li>
                    <Icon type="arrow-right" />
                    留言通过后台审核后会显示在留言板中
                  </li> */}
                  <li>
                    <Icon type="arrow-right" />
                    作者回复后会以邮件的方式通知您
                  </li>
                </ul>
              </div>
              <div>
                <div>
                  <AddMessageBoard
                    visible={visible}
                    handleCancleModal={handleVisibleModal}
                    handleSubmitFrom={handleSubmitFrom}
                    submitting={submitting}
                  />
                  <p style={{textAlign:'center'}}>
                    <Button
                      type="dashed"
                      style={{ width: '100%', marginBottom: 8 }}
                      icon="plus"
                      onClick={() => handleVisibleModal(true)}
                      ref={component => {
                        /* eslint-disable */
                        findDOMNode(component);
                        /* eslint-enable */
                      }}
                    >
                      添加留言
                    </Button>
                  </p>
                </div>
                {/* <div style={{ textAlign: 'right' }}>
                  <Tooltip title={`${!reverse ? '倒序查看' : '正序查看'}`}>
                    <Icon
                      type={`${!reverse ? 'arrow-up' : 'arrow-down'}`}
                      onClick={handleChangeReverse}
                    />
                  </Tooltip>
                </div> */}
                <div>
                    <List
                      dataSource={boardMessages.list}
                      itemLayout="horizontal"
                      renderItem={item => (
                        <List.Item key={item.id} >
                          <List.Item.Meta
                            avatar={
                              <Avatar src="" icon="user" style={{ color: '#000000' }}/>
                            }
                            title={(
                              <div>
                                <span>{item.board_user}</span>
                                <Tooltip
                                  title={moment(item.board_create_time)
                                    .format('YYYY-MM-DD HH:mm:ss')}
                                >
                                  <span style={{color:'#ccc', marginLeft:10, whiteSpace:"nowrap", cursor:'auto', fontSize:12}}>
                                    {moment(item.board_create_time)
                                      .fromNow()}
                                  </span>
                                </Tooltip>
                              </div>
                            )}
                            description={item.board_desc}
                          />
                        </List.Item>
                      )}
                    >
                    </List>
                </div>
              </div>
            </Fragment>
           ) : null}
        </Card>
        <BackTopComponent />
      </GridContent>
    </PageHeaderWrapper>
  );
};

export default connect(({loading, board, user}: ConnectState) => ({
  loading: loading.effects['board/fetchMessageBoardList'],
  boardMessages: board,
}))(MessageBoard);
