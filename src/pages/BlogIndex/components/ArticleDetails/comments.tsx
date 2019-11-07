import React, { Fragment, useEffect, useState } from 'react';
import { Comment, Avatar, Form, Button, List, Input, Card, Divider, Tooltip, Tag, Modal } from 'antd';
import moment from 'moment';
import { BlogArticleDetails, BlogCommentsState } from '@/models/blogs/blog';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { messages } from '@/utils/GlobalTools';
import { CurrentUser } from '@/models/user';
import RepliesIndex from './replies';

const { TextArea } = Input

interface HeadingIndexProps {
  articleMessages: BlogArticleDetails;
  dispatch: Dispatch<AnyAction>;
  articleCommentList: BlogCommentsState;
  loading: boolean;
  currentUser: CurrentUser;
}

const CommentsIndex:React.FunctionComponent<HeadingIndexProps> = props => {
    const [value, setValue] = useState<string>('')
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [replySubmitting, setReplySubmitting] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(false)
    const [replyToUserName, setReplyToUserName] = useState<string>('')
    const [commentId, setCommentId] = useState<number>()
    const [replyValue, setReplyValue] = useState<string>('')
    const [cacheTime, setCacheTime] = useState()
    const [cacheTimeReply, setCacheTimeReply] = useState()

    const { articleMessages, dispatch, articleCommentList, loading, currentUser } = props

    const length = articleMessages.post.post_comments_count

    useEffect(() => {
      dispatch({
        type:'blog/fetchArticleComments',
        payload:articleMessages.post.id,
      })
    }, [])

    const handleSubmitComment = () => {
      const date = new Date()
      const nowDate = date.getTime()
      if(nowDate - cacheTime < 5000){
        return messages('error', '评论的速度太快了, 休息几秒吧', 3, 'thunderbolt')
      }
      if(Object.keys(currentUser).length < 1){
        return messages('error', '登陆后才可以评论喔', 3, 'thunderbolt')
      }
      if(!value){
        return messages('error', '请输入评论内容', 3, 'thunderbolt')
      }
      setSubmitting(true)
      dispatch({
        type:'blog/fetchSubmitComments',
        payload:{
          commentPostId: articleMessages.post.id,
          commentContent: value,
        },
        callback: ({code, msg}:{code: number, msg: string}) => {
          if (code === 200){
            messages('success', `${msg}`, 4, 'check')
            setValue('')
            setCacheTime(nowDate)
            setSubmitting(false)
            dispatch({ type:'blog/fetchArticleComments', payload: articleMessages.post.id })
          }else {
            messages('error', `${msg}`, 3, 'thunderbolt')
          }
        }
      })
    }

    const handleSubmitReply = () => {
      const date = new Date()
      const nowDate = date.getTime()
      if(nowDate - cacheTimeReply < 5000){
        return messages('error', '回复的速度太快了, 休息几秒吧', 3, 'thunderbolt')
      }
      if(Object.keys(currentUser).length < 1){
        return messages('error', '登陆后才可以回复喔', 3, 'thunderbolt')
      }
      if(!replyValue){
        return messages('error', '请输入回复内容', 3, 'thunderbolt')
      }
      setReplySubmitting(true)
      dispatch({
        type:'blog/fetchSubmitReply',
        payload:{
          toUser: replyToUserName,
          commentId: commentId,
          content: replyValue,
        },
        callback: ({code, msg}:{code: number, msg: string}) => {
          if (code === 200){
            messages('success', `${msg}`, 4, 'check')
            setReplyValue('')
            setReplySubmitting(false)
            setCacheTimeReply(nowDate)
            handleChangeModal(false)
            dispatch({ type:'blog/fetchArticleComments', payload: articleMessages.post.id })
          }else {
            messages('error', `${msg}`, 3, 'thunderbolt')
          }
        }
      })
    }

    const handleChange = (e:any) => {
      setValue(e.target.value)
    }

    const handleChangeReplyValue = (e:any) => {
      setReplyValue(e.target.value)
    }

    const handleChangeModal = (visible: boolean, toUserName?: string, commentId?: number) => {
      if(!!visible){
        setReplyValue('')
      }
      setVisible(visible)
      if(toUserName && commentId){
        setCommentId(commentId)
        setReplyToUserName(toUserName)
      }
    }

    const replyModal = (
      <Modal
        title={`向 ${replyToUserName} 回复：`}
        visible={visible}
        destroyOnClose
        onCancel={() => handleChangeModal(false)}
        onOk={handleSubmitReply}
        confirmLoading={replySubmitting}
      >
        <Form.Item>
          <TextArea rows={4} placeholder="讲文明 树新风 请勿重拳出击" onChange={handleChangeReplyValue} value={replyValue}/>
        </Form.Item>
      </Modal>
    )

    return (
      articleCommentList && !loading ?
        <Card
            bordered={false}
        >
          {replyModal}
          <Comment
              avatar={
                  <Avatar
                      src=""
                      alt="User"
                      icon="user"
                      style={{color:'#000000'}}
                  />
              }
              content={
                  <div>
                      <Form.Item>
                          <TextArea rows={4} placeholder="讲文明 树新风 请勿重拳出击" onChange={handleChange} value={value}/>
                      </Form.Item>
                      <Form.Item>
                          <Button htmlType="submit" loading={submitting} type="primary" onClick={handleSubmitComment}>
                              评论
                          </Button>
                      </Form.Item>
                  </div>
              }
          />
          <List
              dataSource={articleCommentList.comments.list}
              loading={loading}
              header={`${length} ${length && length > 0 ? 'replies' : 'reply'}`}
              itemLayout="horizontal"
              renderItem={items => (
                <Fragment>
                    <Comment
                        actions={[
                          <span
                            key="comment-nested-reply-to"
                            onClick={() => handleChangeModal(true, items.comment_user_name, items.id)}
                            >
                             回复
                          </span>
                        ]}
                        author={<a>{items.comment_user_name}&nbsp;
                        {items.comment_from_admin? <Tag style={{fontSize:10}} color={'gold'}>管理员</Tag> : null}</a>}
                        avatar={
                            <Avatar
                                src={items.comment_user_avatar_url}
                                alt="User"
                                icon="user"
                                style={{color:'#000000'}}
                            />
                        }
                        datetime={
                            <Tooltip
                                title={moment(items.comment_create_time)
                                .format('YYYY-MM-DD HH:mm:ss')}
                            >
                                <span>
                                {moment(items.comment_create_time)
                                    .fromNow()}
                                </span>
                            </Tooltip>
                        }
                        content={items.comment_content}
                    >
                      <RepliesIndex
                        dispatch={dispatch}
                        replies={items.comment_replies}
                        handleChangeModal={handleChangeModal}
                      />
                    </Comment>
                    <Divider dashed style={{margin:0}}/>
                </ Fragment>
              )}
          />
        </Card> : null
    )
}

export default connect(({loading, blog, user}: ConnectState) => ({
  articleCommentList: blog.articleComments,
  loading: loading.effects['blog/fetchArticleComments'],
  currentUser: user.currentUser
}))(CommentsIndex)
