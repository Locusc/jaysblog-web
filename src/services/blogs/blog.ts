import request from '@/utils/request';
import { Pagination } from '@/models/connect';

interface ISubmitComment {
  commentPostId: number;
  commentContent: string;
}

interface ISubmitReply {
  toUser: string;
  commentId: number;
  content: string;
}

export async function queryArticleList(pagination: Pagination) {
  return request('/api/blog/post', {
    method: 'POST',
    data: pagination,
  });
}

export async function queryArticleDetails(postId: number) {
  return request(`/api/blog/post/details/${postId}`);
}

export async function queryArticleComments(postId: number) {
  return request(`/api/blog/post/comments/${postId}`)
}

export async function handleSubmitLike(postId: number) {
  return request(`/api/blog/put/like/${postId}`)
}

export async function handleSubmitComment(params: ISubmitComment){
  return request('/api/blog/put/comment', {
    method: 'POST',
    data: params
  })
}

export async function handleSubmitReply(params: ISubmitReply){
  return request('/api/blog/put/reply', {
    method: 'POST',
    data: params
  })
}
