import { Effect } from 'dva';
import { Reducer } from 'redux';

import { queryCurrent, queryCategory, query as queryUsers } from '@/services/user';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}

export interface ListParams {
  id: number;
  cg_name: string;
  cg_count: number;
}

export interface CategoryData {
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  list: ListParams[];
}

export interface UserModelState {
  currentUser?: CurrentUser;
  categoryData?: CategoryData;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    fetchCategory: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
    queryCategory: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchCategory({ callback, payload }, { call, put }) {
      const response = yield call(queryCategory, payload);
      if (callback) callback(response);
      yield put({
        type: 'queryCategory',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    queryCategory(state, action) {
      return {
        ...state,
        categoryData: action.payload || {},
      };
    },
  },
};

export default UserModel;
