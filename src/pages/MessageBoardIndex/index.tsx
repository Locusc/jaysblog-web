import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Card, Tag, Icon } from 'antd';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';

const MessageBoard: React.FunctionComponent<{}> = () => {
  return (
    <PageHeaderWrapper title={' '}>
      <GridContent>
        <Card>
          <h1 style={{ textAlign: 'center' }}>
            <Tag color="geekblue">Message Board</Tag>
          </h1>
          <ul>
            <li>
              <Tag color="geekblue">温馨提示:</Tag>
            </li>
            <li>
              <Icon type="swap-right" />
              讲文明 树新风 请勿重拳出击
            </li>
            <li>
              <Icon type="swap-right" />
              向作者留言需要登陆系统,留言通过后台审核后会显示在留言板中
            </li>
            <li>
              <Icon type="swap-right" />
              作者回复后会以邮件的方式通知您
            </li>
          </ul>
        </Card>
      </GridContent>
    </PageHeaderWrapper>
  );
};

export default connect(({}) => ({}))(MessageBoard);
