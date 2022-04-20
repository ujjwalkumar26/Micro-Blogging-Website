import React from 'react';
import { Card, Avatar} from 'antd';
// import { LikeOutlined } from '@ant-design/icons';
import moment from 'moment';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

const { Meta } = Card;

function Post( { post: {body, createdAt, username, id, likeCount, commentCount, likes} }) {
  return (
    <Card
    style={{ "width": 300 }}
    cover={
        <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
    }
    actions={
      [
        <LikeButton likeCount = {likeCount}/>,
        <CommentButton commentCount={commentCount} />
      ]
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