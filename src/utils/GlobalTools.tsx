import { message, Icon } from 'antd';
import React from 'react';

/**
 * cjj:对象深拷贝
 * @param object
 * @returns {any}
 */
export const copy = (object: {}): {} => JSON.parse(JSON.stringify(object));

/**
 * cjj：封装提示信息
 * @param type 类型
 * @param content 内容
 * @param duration 消失时间
 * @param icon 图标
 */
export const messages = (
  type: 'info' | 'success' | 'error' | 'warning' | 'loading',
  content: string,
  duration: number | null,
  icon: string,
) => {
  message.open({
    content,
    duration,
    type,
    icon: <Icon type={icon} />,
  });
};
