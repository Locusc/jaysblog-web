import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryJourneyList } from '@/services/blogs/journey';

export interface JourneyList {
  id: number;
  journey_title: string;
  journey_desc: string;
  journey_time: string;
}

export interface JourneyModelState {
  journeyList?: JourneyList[];
}

export interface JourneyModelType {
  namespace: 'journey';
  state: JourneyModelState;
  effects: {
    fetchJourneyList: Effect;
  };
  reducers: {
    queryJourneyList: Reducer<JourneyModelState>;
  };
}

const JourneyModel: JourneyModelType = {
  namespace: 'journey',

  state: {
    journeyList: [],
  },

  effects: {
    *fetchJourneyList({ callback, payload }, { call, put }) {
      const response = yield call(queryJourneyList);
      if (callback) callback(response);
      yield put({
        type: 'queryJourneyList',
        payload: response,
      });
    },
  },

  reducers: {
    queryJourneyList(state, { payload }) {
      return {
        ...state,
        journeyList: payload || {},
      };
    },
  },
};

export default JourneyModel;
