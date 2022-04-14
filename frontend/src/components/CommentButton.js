import React from 'react'
import { Tooltip } from 'antd';
import { CommentOutlined } from '@ant-design/icons';

function CommentButton({commentCount}) {
    const commentOnPost  = () => {
        console.log('commenting');
    };
    return (
        <Tooltip key="comment-basic-like" title="Comment">
        <span >
            <CommentOutlined key = "comment" onClick={commentOnPost}/>
            <span className="comment-action" style={{ "paddingLeft": 8}}>{commentCount}</span>
        </span>
        </Tooltip>
    )
}
export default CommentButton;