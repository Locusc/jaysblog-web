import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryArticleList, queryArticleDetails } from '@/services/blogs/blog';
import { Pagination } from '@/models/connect';

export interface ListItemDataType {
  id?: number;
  post_title?: string;
  post_user_id?: number;
  post_digest?: string;
  post_clicks?: number;
  post_like_num?: number;
  post_index_image_url?: string;
  post_category: {
    cg_name: string;
    cg_posts_count: number;
    id: number;
  };
  post_comments_count?: number;
  post_create_time?: string;
  post_update_time?: string;
  post_content?: string;
  post_can_comment?: string;
}

export interface BlogModelState {
  paginates?: Pagination;
  list?: ListItemDataType[];
  loading?: boolean;
  articleDetails?: BlogArticleDetails;
}

export interface BlogArticleDetails {
  post: ListItemDataType;
  comments: {
    paginates: Pagination;
    list: {
      id: number;
      comment_user_name: string;
      comment_content: string;
      comment_from_admin: boolean;
      comment_post_id: number;
      comment_create_time: string;
      comment_update_time: string;
      comment_replies: {
        id: number;
        reply_from_user: string;
        reply_to_user: string;
        reply_content: string;
        reply_comment_id: number;
        reply_create_time: string;
        reply_update_time: string;
      }[];
    }[];
  };
}

export interface BlogModelType {
  namespace: 'blog';
  state: BlogModelState;
  effects: {
    fetchArticleList: Effect;
    fetchArticleDetails: Effect;
  };
  reducers: {
    changeArticleList: Reducer<BlogModelState>;
    changeArticleDetails: Reducer<BlogModelState>;
  };
}

const BlogModel: BlogModelType = {
  namespace: 'blog',

  state: {},

  effects: {
    *fetchArticleList({ payload, callback }, { call, put }) {
      const response = yield call(queryArticleList, payload);
      if (callback) callback(response);
      yield put({
        type: 'changeArticleList',
        payload: response,
      });
    },
    *fetchArticleDetails({ payload, callback }, { call, put }) {
      const response = yield call(queryArticleDetails, payload);
      if (callback) callback(response);
      yield put({
        type: 'changeArticleDetails',
        payload: response,
      });
    },
  },

  reducers: {
    changeArticleList(state, { payload }) {
      return {
        ...state,
        ...payload.data,
      };
    },
    changeArticleDetails(state, { payload }) {
      return {
        ...state,
        articleDetails: payload.data,
      };
    },
  },
};

export default BlogModel;
