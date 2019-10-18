import { Tag } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

export interface ApplicationsProps {
  data: {
    post_title: string;
    post_user_id: number;
    post_digest: string;
    post_index_image_url: string;
    post_category: string;
    post_create_time: string;
    post_update_time: string;
  };
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
