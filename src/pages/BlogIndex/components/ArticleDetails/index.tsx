import React, { useEffect } from 'react';
import { connect } from 'dva';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch, AnyAction } from 'redux';
import { ConnectState } from '@/models/connect';
import { BlogArticleDetails } from '@/models/blogs/blog';

export interface ArticleDetailsProps {
  match: {
    params: {
      postId?: number;
    };
  };
  dispatch: Dispatch<AnyAction>;
  loading: boolean;
  articleMessages: BlogArticleDetails;
}

const ArticleDetails: React.FunctionComponent<ArticleDetailsProps> = props => {
  const {
    dispatch,
    match: {
      params: { postId },
    },
    articleMessages,
    loading,
  } = props;

  useEffect(() => {
    dispatch({
      type: 'blog/fetchArticleDetails',
      payload: postId,
    });
  }, []);

  return (
    <PageHeaderWrapper title=" ">
      <GridContent>
        {articleMessages ? <p>{articleMessages.post.post_content}</p> : null}
      </GridContent>
    </PageHeaderWrapper>
  );
};

export default connect(({ blog, loading }: ConnectState) => ({
  articleMessages: blog.articleDetails,
  loading: loading.effects['blog/fetchArticleDetails'],
}))(ArticleDetails);
