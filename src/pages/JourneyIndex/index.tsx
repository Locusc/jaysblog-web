import React, { useState, useEffect, Fragment } from 'react';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { Timeline, Icon, Card, Comment, Tooltip, Tag, Row, Col } from 'antd';
import { connect } from 'dva';
import { JourneyMessages } from '@/models/blogs/journey';
import { Dispatch, AnyAction } from 'redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import moment from 'moment';
import styles from './index.less';
import PersonalProfile from '../GlobalComponents/PersonalProfile';
import BackTopComponent from '../GlobalComponents/BackTop';

interface JourneyIndexProps extends ConnectProps {
  loading: boolean;
  journeyMessages: JourneyMessages;
  dispatch: Dispatch<AnyAction>;
}

const JourneyIndex: React.FunctionComponent<JourneyIndexProps> = props => {
  const { dispatch, loading, journeyMessages } = props;
  const [reverse, setReverse] = useState<boolean>(false);

  useEffect(() => {
    dispatch({
      type: 'journey/fetchJourneyList',
    });
  }, []);

  const handleChangeReverse = () => {
    if (!reverse) {
      setReverse(true);
    } else {
      setReverse(false);
    }
  };

  const { list } = journeyMessages;

  return (
    <PageHeaderWrapper title=" " extra={<Tag color="purple">既是人生, 也是旅程</Tag>}>
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <PersonalProfile />
          </Col>
          <Col lg={17} md={24}>
            <Card loading={loading} className={styles.tabsCard}>
              {loading ? (
                <div style={{ textAlign: 'center' }}>
                  <Icon type="loading" />
                </div>
              ) : (
                <Fragment>
                  <div style={{ textAlign: 'right' }}>
                    <Tooltip title={`${!reverse ? '倒序查看' : '正序查看'}`}>
                      <Icon
                        type={`${!reverse ? 'arrow-up' : 'arrow-down'}`}
                        onClick={handleChangeReverse}
                      />
                    </Tooltip>
                  </div>
                  <Timeline reverse={reverse}>
                    {list.map(item => (
                      <Timeline.Item key={item.id}>
                        <Comment
                          actions={[
                            <span key="comment-nested-reply-to">
                              {moment(item.journey_time).format('YYYY-MM-DD HH:mm:ss')}
                            </span>,
                          ]}
                          author={<a>{item.journey_title}</a>}
                          content={<p>{item.journey_desc}</p>}
                        />
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Fragment>
              )}
            </Card>
            <div>
              <BackTopComponent />
            </div>
          </Col>
        </Row>
      </GridContent>
    </PageHeaderWrapper>
  );
};

export default connect(({ journey, loading }: ConnectState) => ({
  journeyMessages: journey.journeyMessages,
  loading: loading.effects['journey/fetchJourneyList'],
}))(JourneyIndex);
