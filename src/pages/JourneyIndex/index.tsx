import React, { useState, useEffect, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Timeline, Icon, Card, Comment, Avatar, Tooltip } from 'antd';
import { connect } from 'dva';
import { JourneyModelState } from '@/models/blogs/journey';
import { Dispatch, AnyAction } from 'redux';
import { ConnectProps, ConnectState } from '@/models/connect';

interface JourneyIndexProps extends ConnectProps {
  loading: boolean;
  journeyLists: JourneyModelState;
  dispatch: Dispatch<AnyAction>;
}

const JourneyIndex: React.FunctionComponent<JourneyIndexProps> = props => {
  const { dispatch, loading, journeyLists } = props;
  const [reverse, setReverse] = useState<boolean>(false);

  useEffect(() => {
    dispatch({
      type: 'journey/fetchJourneyList',
    });
  }, []);
  console.log(props);
  const handleChangeReverse = () => {
    console.log(journeyLists);
    if (!reverse) {
      setReverse(true);
    } else {
      setReverse(false);
    }
  };
  return (
    <PageHeaderWrapper>
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
            <Timeline mode="alternate" reverse={reverse}>
              <Timeline.Item>
                <Comment
                  actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                  author={<a>Han Solo</a>}
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <p>
                      {/* eslint-disable-next-line max-len */}
                      We supply a series of design principles, practical patterns and high quality
                      design resources (Sketch and Axure).
                    </p>
                  }
                ></Comment>
              </Timeline.Item>
              <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque
                {/* eslint-disable-next-line max-len */}
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                architecto beatae vitae dicta sunt explicabo.
              </Timeline.Item>
              <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                Technical testing 2015-09-01
              </Timeline.Item>
            </Timeline>
          </Fragment>
        )}
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ journey, loading }: ConnectState) => ({
  journeyList: journey.journeyList,
  loading: loading.effects['journey/fetchJourneyList'],
}))(JourneyIndex);
