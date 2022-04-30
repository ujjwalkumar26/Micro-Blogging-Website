import React, {useContext} from 'react';
import { Card, Avatar} from 'antd';
// import { LikeOutlined } from '@ant-design/icons';
import moment from 'moment';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import DeletePostButton from './DeletePostButton';

import { AuthContext } from '../context/auth';
const { Meta } = Card;

function Post( { post: {body, createdAt, username, id, likeCount, commentCount, likes} }) {
  
  const {user} = useContext(AuthContext);
  const actions = [
    <LikeButton likes = {likes} user = {user} likeCount = {likeCount} id = {id}/>,
    <CommentButton user = {user} commentCount={commentCount} id = {id} />,
  ];
  if(user && user.username === username) {
    actions.push(<DeletePostButton postId = {id} />);
  }
  return (
    <Card
    style={{ width: 300, margin: "auto" }}
    hoverable 
    cover={
        <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
    }
    actions={
      actions
    }
    >
    <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={username}
        description= {<a href = {`/posts/${id}`}> Posted: {moment(createdAt).fromNow().charAt(0).toUpperCase() + moment(createdAt).fromNow().slice(1)}</a>}
    />
    <p style={{"paddingTop": 20}}>{body}</p>
  </Card>
  )
}

export default Post;