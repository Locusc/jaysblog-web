import { Avatar, Card, Col, Divider, Icon, Input, Row, Tag } from 'antd';
import React, { PureComponent } from 'react';
import { Dispatch } from 'redux';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import Link from 'umi/link';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'dva';
import { ModalState } from './model';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import { CurrentUser, TagType } from './data.d';
import styles from './Center.less';
import PersonalProfile from '../GlobalComponents/PersonalProfile';

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        应用 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        项目 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];

interface BlogIndexProps extends RouteChildrenProps {
  dispatch: Dispatch<any>;
  currentUser: CurrentUser;
  currentUserLoading: boolean;
}
interface BlogIndexState {
  newTags: TagType[];
  tabKey: 'articles' | 'applications' | 'projects';
  inputVisible: boolean;
  inputValue: string;
}

@connect(
  ({
    loading,
    blogIndex,
  }: {
    loading: { effects: { [key: string]: boolean } };
    blogIndex: ModalState;
  }) => ({
    currentUser: blogIndex.currentUser,
    currentUserLoading: loading.effects['blogIndex/fetchCurrent'],
  }),
)
class BlogIndex extends PureComponent<BlogIndexProps, BlogIndexState> {
  // static getDerivedStateFromProps(
  //   props: blogIndexProps,
  //   state: blogIndexState,
  // ) {
  //   const { match, location } = props;
  //   const { tabKey } = state;
  //   const path = match && match.path;

  //   const urlTabKey = location.pathname.replace(`${path}/`, '');
  //   if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
  //     return {
  //       tabKey: urlTabKey,
  //     };
  //   }

  //   return null;
  // }

  state: BlogIndexState = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    tabKey: 'articles',
  };

  public input: Input | null | undefined = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'blogIndex/fetchCurrent',
    });
    dispatch({
      type: 'blogIndex/fetch',
    });
  }

  onTabChange = (key: string) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key as BlogIndexState['tabKey'],
    });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input && this.input.focus());
  };

  saveInputRef = (input: Input | null) => {
    this.input = input;
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  renderChildrenByTabKey = (tabKey: BlogIndexState['tabKey']) => {
    if (tabKey === 'projects') {
      return <Projects />;
    }
    if (tabKey === 'applications') {
      return <Applications />;
    }
    if (tabKey === 'articles') {
      return <Articles />;
    }
    return null;
  };

  render() {
    const { newTags, inputVisible, inputValue, tabKey } = this.state;
    const { currentUser, currentUserLoading } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <PageHeaderWrapper>
        <GridContent>
          <Row gutter={24}>
            <Col lg={7} md={24}>
              <PersonalProfile
                newTags={newTags}
                inputVisible={inputVisible}
                inputValue={inputValue}
                dataLoading={dataLoading}
                currentUser={currentUser}
              />
            </Col>
            <Col lg={17} md={24}>
              <Card
                className={styles.tabsCard}
                bordered={false}
                tabList={operationTabList}
                activeTabKey={tabKey}
                onTabChange={this.onTabChange}
              >
                {this.renderChildrenByTabKey(tabKey)}
              </Card>
            </Col>
          </Row>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default BlogIndex;
