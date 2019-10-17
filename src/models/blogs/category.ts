import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryCategories } from '@/services/blogs/category';

export interface CategoryModelState {
  list: {
    id: number;
    cg_name: string;
    cg_posts_count: number;
  }[];
  pagination: {
    pageSize?: number;
    current?: number;
    total?: number;
  };
}

export interface CategoryModelType {
  namespace: 'category';
  state: CategoryModelState;
  effects: {
    fetchCategoryList: Effect;
  };
  reducers: {
    changeCategoryList: Reducer;
  };
}

const CategoryModel: CategoryModelType = {
  namespace: 'category',

  state: {
    list: [],
    pagination: {},
  },

  effects: {
    *fetchCategoryList({ payload, callback }, { call, put }) {
      const response = yield call(queryCategories, payload);
      if (callback) callback(response);
      yield put({
        type: 'changeCategoryList',
        payload: response,
      });
    },
  },

  reducers: {
    changeCategoryList(state, { payload }) {
      return {
        ...state,
        ...payload.data,
      };
    },
  },
};

export default CategoryModel;
