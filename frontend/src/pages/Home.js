import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Posts from '../components/Posts';
import {Card} from 'antd';

function Home() {
  const {loading, data} = useQuery(FETCH_POSTS_QUERY);
  // if(data) console.log(data);
  return (
    <div style = {{margin: "5%"}}>
    { loading 
      ? <Card style={{ width: "30%", height: "20%",  marginLeft: "30%", marginTop: 16 }}  loading = {loading} /> 
      : <Posts props = {data.getPosts}/>}
    </div>
  )
}

const FETCH_POSTS_QUERY = gql `
  query {
    getPosts  {
      id 
      body 
      createdAt 
      username 
      likeCount 
      commentCount
      likes { 
        username
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`

export default Home;