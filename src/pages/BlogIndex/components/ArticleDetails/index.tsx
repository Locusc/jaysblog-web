import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'dva';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch, AnyAction } from 'redux';
import { ConnectState } from '@/models/connect';
import { Card, Row, Col, Divider, Icon, Button } from 'antd';
import { BlogArticleDetails } from '@/models/blogs/blog';
import AnchorIndex from '@/pages/GlobalComponents/Anchor';
import HeadingIndex from './heading';
import DescriptionsIndex from './descriptions';
import BackTopComponent from '@/pages/GlobalComponents/BackTop';
import CommentsIndex from './comments';


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

  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  const onResize = useCallback(() => {
    setSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    })
  }, [])

  useEffect(() => {
    dispatch({
      type: 'blog/fetchArticleDetails',
      payload: postId,
    });
    window.addEventListener('resize', onResize);
    return (() => {
      window.removeEventListener('resize', onResize);
    })
  }, []);

  return (
    articleMessages && !loading ?
      <PageHeaderWrapper
        title=" "
        extraContent={<HeadingIndex articleMessages={articleMessages}/>}
        content={<DescriptionsIndex articleMessages={articleMessages}/>}
      >
          <GridContent>
            <div id="content">
              <Card
                loading={loading}
              >
                <Row gutter={24}>
                  <Col lg={17} md={24}>
                    <div>
                      <h1 style={{ textAlign: 'center' }}>{articleMessages.post.post_title}</h1>
                      <p>{articleMessages.post.post_content}</p>
                    </div>
                    <p style={{ textAlign: 'center', marginBottom: 50 }}><Button type="primary" icon="like" >点赞</Button></p>
                    <CommentsIndex
                      articleMessages={articleMessages}
                    />
                  </Col>
                  {size.width <= 974 ? null :
                  <Col lg={7} md={24}>
                      <AnchorIndex />
                  </Col>}
                </Row>
              </Card>
            </div>
          </GridContent>
          <BackTopComponent />
      </PageHeaderWrapper>
    : null
  );
};

export default connect(({ blog, loading }: ConnectState) => ({
  articleMessages: blog.articleDetails,
  loading: loading.effects['blog/fetchArticleDetails'],
}))(ArticleDetails);
