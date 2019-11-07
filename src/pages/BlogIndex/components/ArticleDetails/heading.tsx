import React, { } from 'react';
import { Row, Col } from 'antd'
import styles from './index.less'
import { BlogArticleDetails } from '@/models/blogs/blog';

interface HeadingIndexProps {
    articleMessages: BlogArticleDetails;
    likeNum?: number
}

const HeadingIndex:React.FunctionComponent<HeadingIndexProps> = props => {

    const { articleMessages } = props

    return (
        <Row>
            <Col xs={12} sm={12}>
                <div className={styles.textSecondary}>
                    <strong>评论数量</strong>
                </div>
                <div className={styles.heading}>{articleMessages.post.post_comments_count}</div>
            </Col>
            <Col xs={12} sm={12}>
                <div className={styles.textSecondary}>
                    <strong>阅读量</strong>
                </div>
                <div className={styles.heading}>{articleMessages.post.post_clicks}</div>
            </Col>
        </Row>
    )
}

export default HeadingIndex
