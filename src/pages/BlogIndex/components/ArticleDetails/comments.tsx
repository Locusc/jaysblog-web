import React, { Fragment } from 'react';
import { Comment, Avatar, Form, Button, List, Input, Card, Divider, Tooltip } from 'antd';
import moment from 'moment';
import { BlogArticleDetails } from '@/models/blogs/blog';

const { TextArea } = Input

interface HeadingIndexProps {
    articleMessages: BlogArticleDetails;
}

const CommentsIndex:React.FunctionComponent<HeadingIndexProps> = props => {
    const { articleMessages } = props

    const length = articleMessages.post.post_comments_count

    const dataList = articleMessages.comments.list

    return (
        <Card
            bordered={false}
        >
            <Comment
                avatar={
                    <Avatar
                        src=""
                        alt="User"
                    />
                }
                content={
                    <div>
                        <Form.Item>
                            <TextArea rows={4} placeholder="讲文明,树新风" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">
                                评论
                            </Button>
                        </Form.Item>
                    </div>
                }
            />
            <List
                dataSource={dataList}
                header={`${length} ${length && length > 0 ? 'replies' : 'reply'}`}
                itemLayout="horizontal"
                renderItem={items => (
                    <Fragment>
                        <Comment
                            actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                            author={<a>{items.comment_user_name}</a>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            datetime={
                                <Tooltip
                                    title={moment(items.comment_create_time)
                                    .subtract(1, 'days')
                                    .format('YYYY-MM-DD HH:mm:ss')}
                                >
                                    <span>
                                    {moment(items.comment_create_time)
                                        .subtract(1, 'days')
                                        .fromNow()}
                                    </span>
                                </Tooltip>
                            }
                            content={items.comment_content}
                        />
                        <Divider />
                    </ Fragment>
                )}
            />
        </Card>
    )
}

export default CommentsIndex
