import React, { Fragment } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { List, Avatar, Divider, Comment, Tooltip, Tag } from 'antd';
import moment from 'moment';

interface RepliesIndexProps {
  dispatch: Dispatch<AnyAction>
  replies: {
    id: number;
    reply_from_user: string;
    reply_to_user: string;
    reply_content: string;
    reply_comment_id: number;
    reply_create_time: string;
    reply_update_time: string;
    reply_user_is_admin: boolean;
    reply_user_avatar_url: string;
  }[];
  handleChangeModal: (visible: boolean, toUserName: string, commentId: number) => void
}

const RepliesIndex:React.FunctionComponent<RepliesIndexProps> = (props) => {

  const { replies, handleChangeModal } = props


  const replyChangeModal = (visible: boolean, toUserName: string, commentId: number) => {
    if(handleChangeModal){
      handleChangeModal(visible, toUserName, commentId)
    }
  }

  return (
    <Fragment>
      {replies?
        <List
          dataSource={replies}
          itemLayout="horizontal"
          renderItem={items => (
            <Fragment>
              <Divider dashed style={{margin:0}}/>
              <Comment
                  actions={[
                    <span
                      key="comment-nested-reply-to"
                      onClick={() => replyChangeModal(true, items.reply_from_user, items.reply_comment_id)}
                    >
                      回复
                    </span>
                  ]}
                  author={
                    <Fragment>
                      <span>
                        {items.reply_from_user}&nbsp;
                        {items.reply_user_is_admin? <Tag style={{fontSize:10}} color={'gold'}>管理员</Tag> : null}
                      </span>
                    </Fragment>
                  }
                  avatar={
                      <Avatar
                          src={items.reply_user_avatar_url}
                          alt="User"
                          icon="user"
                          style={{color:'#000000'}}
                      />
                  }
                  datetime={
                      <Tooltip
                          title={moment(items.reply_create_time)
                          .format('YYYY-MM-DD HH:mm:ss')}
                      >
                          <span>
                          {moment(items.reply_create_time)
                              .fromNow()}
                          </span>
                      </Tooltip>
                  }
                  content={`@${items.reply_to_user}：${items.reply_content}`}
              />
            </ Fragment>
          )}
        />
        : null
      }
    </Fragment>
  )
}

export default RepliesIndex
