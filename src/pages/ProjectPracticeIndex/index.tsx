import { Card, List } from 'antd';
import React from 'react';
// import { connect } from 'dva';
import moment from 'moment';
import AvatarList from './AvatarList';
// import { ListItemDataType } from '@/models/blogs/blog';
// import { ModalState } from '../../model';
import styles from './index.less';
import { PageHeaderWrapper, GridContent  } from '@ant-design/pro-layout'
import { messages } from '@/utils/GlobalTools';

export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface ListItemDataType {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}

export interface ModalState {
  list: ListItemDataType[];
}

const titles = [
  'Python博客后台详解',
  'React博客前端详解',
  // 'Ant Design',
  // 'Ant Design Pro',
  // 'Bootstrap',
  // 'React',
  // 'Vue',
  // 'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const covers = [
  require('../../assets/images/python.jpg'),
  require('../../assets/images/react.jpg'),
  // 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  // 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  // 'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  // 'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '基于Python3.7+Flask1.0+Sqlalchemy1.3+Mysql8+Redis5+Migrate2实现的博客后台',
  '基于React16.9+ReactHook+Redux4+Dva2.4+Umi2.8+Antdesgin3.20实现博客前端',
  // '生命就像一盒巧克力，结果往往出人意料',
  // '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  // '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

function fakeList(count: number): ListItemDataType[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3] as
        | 'normal'
        | 'exception'
        | 'active'
        | 'success',
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      subDescription: desc[i % 5],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
          id: 'member1',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
          id: 'member2',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
          id: 'member3',
        },
      ],
    });
  }

  return list;
}

const list:ListItemDataType[] = fakeList(2)


const Projects: React.FunctionComponent<Partial<ModalState>> = props => {
  // const { list } = props;

  const handleOpenUrl = (id: string) => {
    if(id === 'fake-list-0'){
      window.open("https://github.com/Locusc/jaysblog", "_blank");
    }else{
      window.open("https://github.com/Locusc/jaysblog-web", "_blank");
    }
  }

  return (
    <PageHeaderWrapper>
      <GridContent>
        <Card>
          <List<ListItemDataType>
            className={styles.coverCardList}
            rowKey="id"
            grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
            dataSource={list}
            renderItem={item => (
              <List.Item>
                <Card
                  className={styles.card}
                  hoverable
                  cover={<img alt={item.title}
                  src={item.cover} />}
                  onClick={() => handleOpenUrl(item.id)}
                >
                  <Card.Meta title={<a>{item.title}</a>} description={item.subDescription} />
                    <div className={styles.cardItemContent}>
                      <span>{moment(item.updatedAt).fromNow()}</span>
                      <div className={styles.avatarList}>
                        {/* <AvatarList size="small">
                          {item.members.map(member => (
                            <AvatarList.Item
                              key={`${item.id}-avatar-${member.id}`}
                              src={member.avatar}
                              tips={member.name}
                            />
                          ))}
                        </AvatarList> */}
                      </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </GridContent>
    </PageHeaderWrapper>
  );
};

// export default connect(({ blogIndex }: { blogIndex: ModalState }) => ({
//   list: blogIndex.list,
// }))(Projects);

export default Projects
