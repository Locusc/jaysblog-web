import { Icon, List, Tag } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';
import { Link } from 'umi';
import ArticleListContent from '../ArticleListContent';
import styles from './index.less';
import { BlogModelState, ListItemDataType } from '@/models/blogs/blog';
import { ConnectState } from '@/models/connect';

export interface BlogModelProps {
  list: BlogModelState['list'];
  paginates: BlogModelState['paginates'];
  dispatch?: Dispatch<AnyAction>;
  loading: boolean;
  handleChangeArticleList: (page?: number, pageSize?: number) => void;
}

const Articles: React.FunctionComponent<Partial<BlogModelProps>> = props => {
  const { list, paginates, loading } = props;

  const handleChangeArticleListState = (page: number, pageSize?: number) => {
    const { handleChangeArticleList } = props;
    if (handleChangeArticleList) {
      handleChangeArticleList(page, pageSize);
    }
  };

  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  const paginationProps = {
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: () => (paginates ? `共${paginates.total}条记录` : null),
    ...paginates,
  };

  return (
    <List<ListItemDataType>
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      pagination={{
        onChange: (page, pageSize) => {
          handleChangeArticleListState(page, pageSize);
        },
        ...paginationProps,
      }}
      loading={loading}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText key="star" type="star-o" text={item.post_clicks} />,
            <IconText key="like" type="like-o" text={item.post_like_num} />,
            <IconText key="message" type="message" text={item.post_comments_count} />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            title={
              <Link className={styles.listItemMetaTitle} to={`/articleDetails/${item.id}`}>
                {item.post_title}
              </Link>
            }
            description={
              <span>
                <Tag>Python</Tag>
                <Tag>React</Tag>
                <Tag>Flask</Tag>
              </span>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    />
  );
};

export default connect(({ blog, loading }: ConnectState) => ({
  list: blog.list,
  paginates: blog.paginates,
  loading: loading.models.blog,
}))(Articles);
