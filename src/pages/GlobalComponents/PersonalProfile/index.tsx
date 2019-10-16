import React, { useEffect } from 'react';
import { Card, Divider, Tag, Input, Row, Col, Avatar, Icon } from 'antd';
import { Link } from 'umi';
import styles from './index.less';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { Dispatch, AnyAction } from 'redux';
import { CurrentUser } from '@/models/user';

export interface PersonalProfileState {
  dataLoading: boolean;
  currentUser: CurrentUser;
  // newTags: TagType[];
  inputVisible: boolean;
  inputValue: string;
  dispatch: Dispatch<AnyAction>;
}

const PersonalProfile: React.FunctionComponent<PersonalProfileState> = props => {
  const { dataLoading, currentUser, dispatch } = props;

  useEffect(() => {
    dispatch({
      type: 'fetch/fetchCurrent',
    });
  }, []);

  console.log(currentUser);
  return (
    <Card bordered={false} style={{ marginBottom: 24 }} loading={dataLoading}>
      {!dataLoading ? (
        <div>
          <div className={styles.avatarHolder}>
            <img alt="" src={currentUser.avatar_url} />
            <div className={styles.name}>{currentUser.nick_name}</div>
            <div>舔狗不得House</div>
          </div>
          <div className={styles.detail}>
            <p>
              <i className={styles.title} />
              {'一只咸鱼'}
            </p>
            <p>
              <i className={styles.group} />
              {'开发组'}
            </p>
            <p>
              <i className={styles.address} />
              {'四川'}
              {'成都'}
            </p>
          </div>
          <Divider dashed />
          {/* <div className={styles.tags}>
            <div className={styles.tagsTitle}>标签</div>
            {currentUser.tags.concat(newTags).map(item => (
              <Tag key={item.key}>{item.label}</Tag>
            ))}
            {inputVisible && (
              <Input
                //   ref={ref => this.saveInputRef(ref)}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                //   onChange={this.handleInputChange}
                //   onBlur={this.handleInputConfirm}
                //   onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag
                //   onClick={this.showInput}
                style={{ background: '#fff', borderStyle: 'dashed' }}
              >
                <Icon type="plus" />
              </Tag>
            )}
          </div>
          <Divider style={{ marginTop: 16 }} dashed />
          <div className={styles.team}>
            <div className={styles.teamTitle}>团队</div>
            <Row gutter={36}>
              {currentUser.notice &&
                currentUser.notice.map(item => (
                  <Col key={item.id} lg={24} xl={12}>
                    <Link to={item.href}>
                      <Avatar size="small" src={item.logo} />
                      {item.member}
                    </Link>
                  </Col>
                ))}
            </Row>
          </div> */}
        </div>
      ) : null}
    </Card>
  );
};

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  dataLoading: loading.effects['fetch/fetchCurrent'],
}))(PersonalProfile);
