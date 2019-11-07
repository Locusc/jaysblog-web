import request from '@/utils/request';
import { Pagination } from '@/models/connect';

export interface IAddBoardMessage {
  nickName: string;
  desc: string;
  email: string;
}

export async function queryMessageBoardList(pagination: Pagination){
  return request('/api/board/list', {
    method: 'POST',
    data: pagination,
  });
}

export async function addMessageBoardInfo(params: IAddBoardMessage){
  return request('/api/board/addBoardMessage', {
    method: 'POST',
    data: params,
  });
}
