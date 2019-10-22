import React, {} from 'react';
import { Row, Col } from 'antd'
import styles from './index.less'
import { BlogArticleDetails } from '@/models/blogs/blog';

interface HeadingIndexProps {
    articleMessages: BlogArticleDetails;
}

const HeadingIndex:React.FunctionComponent<HeadingIndexProps> = props => {
    const { articleMessages } = props

    return (
        <Row>
            <Col xs={8} sm={8}>
                <div className={styles.textSecondary}>
                    <strong>评论数量</strong>
                </div>
                <div className={styles.heading}>{articleMessages.post.post_comments_count}</div>
            </Col>
            <Col xs={8} sm={8}>
                <div className={styles.textSecondary}>
                    <strong>阅读量</strong>
                </div>
                <div className={styles.heading}>{articleMessages.post.post_clicks}</div>
                </Col>
            <Col xs={8} sm={8}>
                <div className={styles.textSecondary}>
                    <strong>点赞数</strong>
                </div>
                <div className={styles.heading}>{articleMessages.post.post_like_num}</div>
            </Col>
        </Row>
    )
}

export default HeadingIndex
