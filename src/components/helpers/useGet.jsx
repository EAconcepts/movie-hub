import axios from  'axios'
import {useMutation} from '@tanstack/react-query'
import { useState } from 'react';
import { useEffect } from 'react';

const useGet =(url)=>{
const [data, setData] = useState([])
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
   const headers = {
     Authorization: `Bearer ${apiKey}`,
   };
   const mutationName = useMutation({
    mutationFn: ()=>axios.get(url, {headers}),
    onSuccess:(res)=>{
        console.log(res.data)
        setData(res.data)
    },
    onError:(err)=>{
        console.log(err)
    }
   }) 
    //    useEffect(()=>{
    //     mutationName.mutate()
    //    },[])
   return {data, mutationName}
}

export default useGet