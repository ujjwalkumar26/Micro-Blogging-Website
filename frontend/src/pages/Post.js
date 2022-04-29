import React, {useContext} from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import LikeButton from '../components/LikeButton';
import CommentButton from '../components/CommentButton';
import DeletePostButton from '../components/DeletePostButton';
import { Card, Avatar} from 'antd';
import { AuthContext } from '../context/auth';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

function Post() {
    const {user} = useContext(AuthContext);
    const params = useParams();
    const postId = params.postId;
    const navigate = useNavigate();
    const {data} = useQuery(GET_POST_QUERY, {
        variables:  { postId }
    });

    let element;
    if(data) {
        const {id, username, likes, body, createdAt, commentCount, likeCount } = data.getPost;
        const actions = [
                            <LikeButton likes = {likes} user = {user} likeCount = {likeCount} id = {id}/>,
                            <CommentButton user = {user} commentCount={commentCount} id = {id} />,
                        ];
        if(user && user.username === username) {
            actions.push(<DeletePostButton postId = {id} callback = { () => { navigate('/') }}/>);
        }
        element = (
                <Card
                style={{ "width": 300 }}
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
                    description= { `Posted: ${moment(createdAt).fromNow().charAt(0).toUpperCase()
                                     + moment(createdAt).fromNow().slice(1)
                                }`}
                />
                <p style={{"paddingTop": 20}}>{body}</p>
                </Card>
        )
    }
    else element  = (<div className="loading-spinner"><Spin size = "large"/></div>);
    
    return (
        <>
        <div style = {{margin: "5%"}}>
            {element}
        </div>
        </>
    )
}

const GET_POST_QUERY = gql`

    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            username
            createdAt
            comments {
                id
                body
                username
                createdAt
            }
            likeCount
            likes {
                id
                username
                createdAt
            }
            commentCount
        }
    }

`
export default Post;
