import request from '@/utils/request';

export interface CategoryParams {
  pageSize: number;
  currentPage: number;
}

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function queryCategory(params: CategoryParams): Promise<any> {
  return request('/category', {
    method: 'POST',
    data: params,
  });
}
