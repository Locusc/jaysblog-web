import React from 'react';
import { Descriptions, Tag } from 'antd';
import { BlogArticleDetails } from '@/models/blogs/blog';
import moment from 'moment';

interface HeadingIndexProps {
    articleMessages: BlogArticleDetails;
}

const DescriptionsIndex:React.FunctionComponent<HeadingIndexProps> = props => {
    const { articleMessages } = props

    return (
        <Descriptions size="default">
            <Descriptions.Item label="所属分类">
                <Tag color="orange" >{articleMessages.post.post_category.cg_name}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="发布时间">
                <Tag color="geekblue" >{moment(articleMessages.post.post_create_time).format('YYYY-MM-DD HH:mm:ss')}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
                <Tag color="purple" >{moment(articleMessages.post.post_update_time).format('YYYY-MM-DD HH:mm:ss')}</Tag>
            </Descriptions.Item>
        </Descriptions>
    )
}

export default DescriptionsIndex
