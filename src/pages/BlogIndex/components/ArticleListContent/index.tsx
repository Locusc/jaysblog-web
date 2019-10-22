import { Tag } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';
import { ListItemDataType } from '@/models/blogs/blog';

export interface ApplicationsProps {
  data: ListItemDataType
}
const ArticleListContent: React.FC<ApplicationsProps> = ({
  data: { post_digest, post_create_time, post_user_id },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{post_digest}</div>
    <div className={styles.extra}>
      <a>{post_user_id === 1 ? 'Jay Chen ' : 'Jay Chen '}</a>
      <span>发布在</span>
      <em>{moment(post_create_time).format('YYYY-MM-DD HH:mm:ss')}</em>
    </div>
  </div>
);

export default ArticleListContent;
