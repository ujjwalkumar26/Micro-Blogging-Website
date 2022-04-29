import React from 'react'
import { Tooltip } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import FETCH_POSTS_QUERY from '../util/graphql';
// import {useNavigate} from 'react-router-dom';


function DeletePostButton({ postId, callback }) {
    // const navigate = useNavigate();
    const [ deletePost ] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
                variables: { id: postId }
            });
            data.getPosts = data.getPosts.filter(post => post.id !== postId)
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data
            });
            if(callback) callback();
        },
        onError(err) {
          console.log(err);
        },
        variables: { id: postId }
    });

    return (
        <Tooltip key="deleteTip" title="Delete this post">
        <span >
            <DeleteTwoTone twoToneColor={'red'} key = "delete" onClick={ deletePost }/>
        </span>
        </Tooltip>
    )
}

const DELETE_POST_MUTATION = gql`

    mutation($id: ID!) {
        deletePost(id: $id)
    }

`
export default DeletePostButton;