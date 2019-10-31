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

// export const generateUUID = () => {
//   let d = new Date().getTime();
//   if (window.performance && typeof window.performance.now === "function") {
//       d += performance.now(); //use high-precision timer if available
//   }
//   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//       let r = (d + Math.random() * 16) % 16 | 0;
//       d = Math.floor(d / 16);
//       return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//   });
//   return uuid;
// }

//根据 QueryString 参数名称获取值
export function getQueryStringByName(name: string) {
  let result = window.location.search.match(
    new RegExp('[?&]' + name + '=([^&]+)', 'i'),
  );
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
}
