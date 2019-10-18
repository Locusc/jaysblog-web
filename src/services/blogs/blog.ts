import request from '@/utils/request';
import { Pagination } from '@/models/connect';

export async function queryArticleList(pagination: Pagination) {
  return request('/server/api/blog/post', {
    method: 'POST',
    data: pagination,
  });
}

export async function queryArticleDetails(postId: number) {
  return request(`/server/api/blog/post/details/${postId}`);
}
