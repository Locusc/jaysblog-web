import React, { } from 'react';
import { Card } from 'antd';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout'
import Tag from 'antd/es/tag';

const SummaryIndex:React.FunctionComponent = () => {

  return (
    <PageHeaderWrapper
      title={' '}
    >
      <GridContent>
        <Card>
          <div style={{textAlign:"center"}}>
            <Tag style={{fontSize:15, width:150}} color='geekblue'>
              Sum Up My 2019
            </Tag>
          </div>
          <div style={{textAlign:"center", marginTop:20}}>
            <img  src={require('../../assets/images/summary_01.jpg')} alt="summary_01"/>
            <p>正在思考中......</p>
            <p>预计2020.01.01发布</p>
          </div>
        </Card>
      </GridContent>
    </PageHeaderWrapper>
  );
}

export default SummaryIndex;
