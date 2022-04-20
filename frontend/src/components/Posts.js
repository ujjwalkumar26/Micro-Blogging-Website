import React from 'react'
import Post from '../components/Post';
import {Row, Col, Divider} from 'antd';
export default function Posts({props}) {
  return (
    <div>
    <Row gutter = {[8]}>
        { props && props.map((post, index, props) => ([ 
            <Col span = {8} key = {index}>
            <Post post = {post} key = {post.id}/> 
            <Divider/> 
            </Col>
        ]))} 
    </Row>
    </div>
  )
}
