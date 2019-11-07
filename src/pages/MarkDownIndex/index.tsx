import React, { useEffect } from 'react';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { Card } from 'antd';
import Marked from 'marked';
import Highlight from 'highlight.js';

const MarkDownIndex:React.FunctionComponent = () => {

  const test = "<div><h1>hah</h1><span>1231</span><strong>12</strong></div><img  src=https://upload-images.jianshu.io/upload_images/19996201-c7c63ff577e597a3.gif?imageMogr2/auto-orient/strip|imageView2/2/w/432/format/webp alt='summary_01'/>"


  useEffect(() => {
    Marked.setOptions({
      renderer: new Marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function(code) {
          return Highlight.highlightAuto(code).value;
      },
    });
  }, [])

  return (
    <PageHeaderWrapper>
      <GridContent>
        <Card>
          <div dangerouslySetInnerHTML={{ __html: test }}
          >

          </div>
        </Card>
      </GridContent>
    </PageHeaderWrapper>
  )
}

export default MarkDownIndex
