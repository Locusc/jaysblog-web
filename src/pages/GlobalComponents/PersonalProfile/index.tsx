import React, { useEffect } from 'react';
import { Card, Divider, Tag, Row, Col, Avatar, Icon } from 'antd';
import { Link } from 'umi';
import styles from './index.less';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { Dispatch, AnyAction } from 'redux';
import { CurrentUser } from '@/models/user';
import { CategoryModelState } from '@/models/blogs/category';
import Router from 'umi/router';

export interface PersonalProfileState {
  dataLoading: boolean;
  currentUser: CurrentUser;
  categoryMessages: CategoryModelState;
  dispatch: Dispatch<AnyAction>;
  handleChangeArticleList: (page?: number, pageSize?: number, category_id?: number) => void
}

const PersonalProfile: React.FunctionComponent<PersonalProfileState> = props => {
  const { dataLoading, currentUser, categoryMessages, dispatch } = props;

  useEffect(() => {
    dispatch({
      type: 'fetch/fetchCurrent',
    });
    dispatch({
      type: 'category/fetchCategoryList',
      payload: {
        pageSize: 20,
        current: 1,
      },
    });
  }, []);

  const handleChangeList = (value: number) => {
    const { handleChangeArticleList } = props
    if (handleChangeArticleList) {
      handleChangeArticleList(1, 5, value)
    } else {
      Router.push({pathname:'/blogIndex', query:{ cateId:value }})
    }
  }


  const { list } = categoryMessages;

  return (
    <Card bordered={false} style={{ marginBottom: 24 }} loading={dataLoading}>
      {!dataLoading ? (
        <div>
          <div className={styles.avatarHolder}>
            <img alt="" src={require('../../../../src/assets/images/jay.jpg')} />
            <div className={styles.name}>Jay Chen</div>
            <div>
              <Tag color="#000000">WeChat：Ayu019Bryant</Tag>
            </div>
          </div>
          <div className={styles.detail}>
            <p>
              <i className={styles.title} />
              {'Salted Fish Front-end Engineer'}
            </p>
            <p>
              <i className={styles.group} />
              {`Software Development Team`}
            </p>
            <p>
              <i className={styles.address} />
              {'China'}
              {' ChengDu'}
            </p>
          </div>
          <Divider dashed />
          <div className={styles.tags}>
            <div className={styles.tagsTitle}>分类</div>
            {list.map(item => (
              <Tag style={{cursor:"pointer"}} key={item.id} onClick={() => handleChangeList(item.id)}>{item.cg_name}</Tag>
            ))}
          </div>
          <Divider style={{ marginTop: 16 }} dashed />
          <div className={styles.team}>
            <div className={styles.teamTitle}>团队</div>
            <Row gutter={36}>
              <Col lg={24} xl={12}>
                <Link to="/">
                  <Avatar
                    size="small"
                    src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
                  />
                  {'React'}
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      ) : null}
    </Card>
  );
};

export default connect(({ user, loading, category }: ConnectState) => ({
  currentUser: user.currentUser,
  categoryMessages: category,
  dataLoading: loading.effects['fetch/fetchCurrent'],
}))(PersonalProfile);
