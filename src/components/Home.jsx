import React from 'react'
import Layout from '../components/layout/Layout'
import useGet from './helpers/useGet';
import Hero from './Hero'
import Section2 from './Section2'

const Home = ({ imageBaseUrl }) => {
    // console.log(imageBaseUrl)
    // const {data, mutationName} = useGet('https://api.themoviedb.org/3/movie/top_rated')
    // console.log(data)
    // if(mutationName.isError){
    //   console.log("successfully fetched the details")
    // }
  return (
    <Layout>
      <div className='w-full'>
        <Hero imageBaseUrl={imageBaseUrl} />
        <Section2 imageBaseUrl={imageBaseUrl} />
      </div>
    </Layout>
  );
};

export default Home