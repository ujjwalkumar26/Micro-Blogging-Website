import React , { useState } from 'react'
import { Tooltip } from 'antd';
import {LikeOutlined} from '@ant-design/icons';
function LikeButton({likeCount}) {
  
  const [currentLikes, setCurrentLikes] = useState({
    liked: false,
    count: likeCount
  });
  
  const clickLike = () => {
    // console.log(currentLikes)
    if(currentLikes.liked === true) {
      setCurrentLikes({
        liked: false,
        count: currentLikes.count - 1
      })
    }
    else setCurrentLikes({
      liked: true,
      count: currentLikes.count + 1
    })
    // console.log(currentLikes)
  };

  return (
    <Tooltip key="comment-basic-like" title="Like">
      <span >
        <LikeOutlined key = "like" onClick={clickLike}/>
        <span className="comment-action" style={{ "paddingLeft": 8}}>{currentLikes.count}</span>
      </span>
    </Tooltip>
  )
}
export default LikeButton;