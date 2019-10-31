import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryMessageBoardList, addMessageBoardInfo } from '@/services/blogs/board';

export interface MessageBoardList {
  id: number;
  board_user: string;
  board_desc:  string;
  board_status:  number;
  board_create_time: string;
  board_update_time: string;
}

export interface MessageBoardState {
  paginates?: {
    pageSize?: number;
    current?: number;
    total?: number;
  };
  list?: MessageBoardList[]
}

export interface MessageBoardModelType {
  namespace: 'board';
  state: MessageBoardState;
  effects: {
    fetchMessageBoardList: Effect;
    fetchAddMessageBoardInfo: Effect;
  };
  reducers: {
    changeMessageBoardList: Reducer<MessageBoardState>;
  }
}

const MessageBoardModel:MessageBoardModelType = {
  namespace:'board',

  state: {},

  effects:{
    *fetchMessageBoardList({ callback, payload }, { call, put }){
      const response = yield call(queryMessageBoardList, payload)
      if (callback) callback(response)
      yield put({
        type:'changeMessageBoardList',
        payload: response.data
      })
    },
    *fetchAddMessageBoardInfo({ callback, payload }, { call }){
      const response = yield call(addMessageBoardInfo, payload)
      if (callback) callback(response)
    }
  },

  reducers:{
    changeMessageBoardList(state, { payload }){
      return {
        ...state,
        ...payload,
      }
    }
  }
}

export default MessageBoardModel
