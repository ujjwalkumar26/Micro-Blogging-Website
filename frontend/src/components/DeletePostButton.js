import React from 'react'
import { Tooltip } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
// import {useNavigate} from 'react-router-dom';

function DeletePostButton({commentCount, id}) {
    // const navigate = useNavigate();
    const DeletePost  = () => {
        console.log(`delete ${id}`);
    };
    return (
        <Tooltip key="comment-basic-like" title="Delete this post">
        <span >
            <DeleteTwoTone twoToneColor={'red'} key = "delete" onClick={DeletePost}/>
            <span className="comment-action" style={{ "paddingLeft": 8}}>{commentCount}</span>
        </span>
        </Tooltip>
    )
}
export default DeletePostButton;