import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Posts from '../components/Posts';


function Home() {
  const {loading, data} = useQuery(FETCH_POSTS_QUERY);
  // if(data) console.log(data);
  return (
    <>
    {loading ? <h2>Loading</h2> : <Posts props = {data.getPosts}/>}
    </>
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