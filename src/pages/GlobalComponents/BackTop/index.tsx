import React from 'react';
import { BackTop, Icon } from 'antd';
import styles from './index.less';

const BackTopComponent: React.FunctionComponent = props => (
  <BackTop>
    <div className={styles.backTop}>
      <Icon type="arrow-up" />
    </div>
  </BackTop>
);

export default BackTopComponent;
