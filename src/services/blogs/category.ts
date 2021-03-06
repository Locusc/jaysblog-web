import request from '@/utils/request';
import { Pagination } from '@/models/connect';

export async function queryCategories(pagination: Pagination): Promise<any> {
  return request('/api/blog/category', {
    method: 'POST',
    data: pagination,
  });
}
