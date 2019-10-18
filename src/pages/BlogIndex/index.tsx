import { Card, Col, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import Link from 'umi/link';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'dva';
import { ModalState } from './model';
import Projects from './components/Projects';
import Articles from './components/Articles';
import StudyPlan from './components/StudyPlan';
import { CurrentUser } from './data.d';
import styles from './Center.less';
import PersonalProfile from '../GlobalComponents/PersonalProfile';
import BackTopComponent from '../GlobalComponents/BackTop';

const operationTabList = () => [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}></span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        项目 <span style={{ fontSize: 14 }}></span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        计划 <span style={{ fontSize: 14 }}></span>
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
  tabKeys: 'articles' | 'applications' | 'projects';
}

const BlogIndex: React.FunctionComponent<BlogIndexProps> = props => {
  const [tabKey, setTabKey] = useState<BlogIndexState['tabKeys']>('articles');

  const { dispatch } = props;

  useEffect(() => {
    dispatch({
      type: 'blogIndex/fetchCurrent',
    });
    dispatch({
      type: 'blogIndex/fetch',
    });
    dispatch({
      type: 'blog/fetchArticleList',
      payload: {
        pageSize: 5,
        current: 1,
      },
    });
  }, []);

  const handleChangeArticleList = (current: number, pageSize: number) => {
    dispatch({
      type: 'blog/fetchArticleList',
      payload: {
        pageSize,
        current,
      },
    });
  };

  const onTabChange = (key: string) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    setTabKey(key as BlogIndexState['tabKeys']);
  };

  const renderChildrenByTabKey = (tabKeys: BlogIndexState['tabKeys']) => {
    if (tabKeys === 'projects') {
      return <Projects />;
    }
    if (tabKeys === 'applications') {
      return <StudyPlan />;
    }
    if (tabKeys === 'articles') {
      return <Articles handleChangeArticleList={handleChangeArticleList} />;
    }
    return null;
  };

  const { currentUser, currentUserLoading } = props;
  const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
  return (
    <PageHeaderWrapper title=" ">
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <PersonalProfile />
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList()}
              activeTabKey={tabKey}
              onTabChange={onTabChange}
            >
              {renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
        <BackTopComponent />
      </GridContent>
    </PageHeaderWrapper>
  );
};

export default connect(
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
)(BlogIndex);
