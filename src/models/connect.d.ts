import { AnyAction, Dispatch } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { LoginModelType } from './login';
import { JourneyModelState } from './blogs/journey';
import { CategoryModelState } from './blogs/category';
import { BlogModelState } from './blogs/blog';
import { MessageBoardState } from './blogs/board';

export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
    journey?: boolean;
    category?: boolean;
    blog?: boolean;
    board?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  login: LoginModelType;
  journey: JourneyModelState;
  category: CategoryModelState;
  blog: BlogModelState;
  board: MessageBoardState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}

export interface Pagination {
  pageSize?: number;
  current?: number;
  total?: number;
}
