import React, { useState } from 'react';
import { Anchor } from 'antd';

const { Link } = Anchor

const AnchorIndex:React.FunctionComponent<{}> = () => {
    const [targetOffset, setTargetOffset] = useState<number>(window.innerHeight / 2)

    return (
        <div >
            <Anchor
                offsetTop={targetOffset - 100}
            >
                <Link href="#components-anchor-demo-basic" title="Basic demo" />
                <Link href="#components-anchor-demo-static" title="Static demo" />
                <Link href="#API" title="API" />
                <Link href="#Anchor-Props" title="Anchor Props" />
                <Link href="#Link-Props" title="Link Props" />
            </Anchor>
        </div>
    )
}

export default AnchorIndex
