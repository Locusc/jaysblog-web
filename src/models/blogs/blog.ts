import { Effect } from 'dva';
import { Reducer } from 'redux';
import {
  queryArticleList,
  queryArticleDetails,
  queryArticleComments,
  handleSubmitComment,
  handleSubmitReply,
  handleSubmitLike,
} from '@/services/blogs/blog';
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
  articleComments?: BlogCommentsState;
}

export interface BlogCommentsState {
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
      comment_user_avatar_url: string,
      comment_replies: {
        id: number;
        reply_from_user: string;
        reply_to_user: string;
        reply_content: string;
        reply_comment_id: number;
        reply_create_time: string;
        reply_update_time: string;
        reply_user_is_admin: boolean;
        reply_user_avatar_url: string;
      }[];
    }[];
  };
}

export interface BlogArticleDetails {
  post: ListItemDataType;
}

export interface BlogModelType {
  namespace: 'blog';
  state: BlogModelState;
  effects: {
    fetchArticleList: Effect;
    fetchArticleDetails: Effect;
    fetchArticleComments: Effect;
    fetchSubmitComments: Effect;
    fetchSubmitReply: Effect;
    fetchSubmitLike: Effect;
  };
  reducers: {
    changeArticleList: Reducer<BlogModelState>;
    changeArticleDetails: Reducer<BlogModelState>;
    changeArticlComments: Reducer<BlogModelState>;
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
    *fetchArticleComments({ payload, callback }, { call, put }){
      const response = yield call(queryArticleComments, payload);
      if (callback) callback(response);
      yield put({
        type: 'changeArticlComments',
        payload: response,
      });
    },
    *fetchSubmitComments({ payload, callback }, { call }){
      const response = yield call(handleSubmitComment, payload);
      if (callback) callback(response);
    },
    *fetchSubmitReply({ payload, callback }, { call }){
      const response = yield call(handleSubmitReply, payload);
      if (callback) callback(response);
    },
    *fetchSubmitLike({ payload, callback }, { call }){
      const response = yield call(handleSubmitLike, payload);
      if (callback) callback(response);
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
    changeArticlComments(state, { payload }){
      return {
        ...state,
        articleComments: payload.data,
      };
    }
  },
};

export default BlogModel;
