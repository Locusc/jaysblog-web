import React, { useState, useEffect, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Timeline, Icon, Card, Comment, Tooltip, BackTop, Tag } from 'antd';
import { connect } from 'dva';
import { JourneyList } from '@/models/blogs/journey';
import { Dispatch, AnyAction } from 'redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import moment from 'moment';
import styles from './index.less';

interface JourneyIndexProps extends ConnectProps {
  loading: boolean;
  journeyList: JourneyList[];
  dispatch: Dispatch<AnyAction>;
}

const JourneyIndex: React.FunctionComponent<JourneyIndexProps> = props => {
  const { dispatch, loading, journeyList } = props;
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

  return (
    <PageHeaderWrapper title=" " extraContent={<Tag color="purple">既是人生, 也是旅程</Tag>}>
      <Card loading={loading}>
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
              {journeyList.map((item, key) => (
                // eslint-disable-next-line react/no-array-index-key
                <Timeline.Item key={key}>
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
        <BackTop>
          <div className={styles.backTop}>
            <Icon type="arrow-up" />
          </div>
        </BackTop>
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(({ journey, loading }: ConnectState) => ({
  journeyList: journey.journeyList,
  loading: loading.effects['journey/fetchJourneyList'],
}))(JourneyIndex);
