import React, { useState, useEffect } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { messages } from '@/utils/GlobalTools';
import { CurrentUser } from '@/models/user';
import { Icon, Tag, Tooltip } from 'antd';
import { connect } from 'dva';
import { BlogArticleDetails } from '@/models/blogs/blog';
import { ConnectState } from '@/models/connect';

interface LikeNumsIndexProps {
  dispatch: Dispatch<AnyAction>;
  currentUser: CurrentUser;
  articleMessages: BlogArticleDetails;
}

const LikeNumsIndex:React.FunctionComponent<LikeNumsIndexProps> = (props) => {

  const { dispatch, currentUser, articleMessages } = props

  const [likeNum, setLikeNum] = useState()

  useEffect(() => {
    setLikeNum(articleMessages.post.post_like_num)
  }, [])

  const handleSubmitLike = () => {
    if(Object.keys(currentUser).length < 1){
      return messages('error', '登陆后才可以点赞喔', 3, 'thunderbolt')
    }
    dispatch({
      type: 'blog/fetchSubmitLike',
      payload: articleMessages.post.id,
      callback: ({code, msg}:{code: number, msg: string}) => {
        if (code === 200){
          messages('success', `${msg}`, 3, 'check')
          setLikeNum(likeNum + 1)
        }else {
          messages('error', `${msg}`, 3, 'thunderbolt')
        }
      }
    })
  }

  return (
    <div>
        <p style={{ textAlign: 'center', marginBottom: 20 , marginTop: 10}}>
          <Tooltip title={'Give me a thumbs up'}>
            <Tag onClick={handleSubmitLike} style={{cursor:"pointer", width:50, height:25}}>
              <Icon type="like" />{` ${likeNum}`}
            </Tag>
          </Tooltip>
        </p>
    </div>
  )
}

export default connect(({user}: ConnectState) => ({
  currentUser: user.currentUser
}))(LikeNumsIndex)
