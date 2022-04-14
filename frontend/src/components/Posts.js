import React from 'react'
import Post from '../components/Post';
import {Row, Col} from 'antd';
export default function Posts({props}) {
  return (
    <div>
    <Row gutter = {[32]}>
      <Col>
        { props && props.map(post => (
          <Post post = {post} key = {post.id}/>
        ))}
      </Col>
    </Row>
    </div>
  )
}
