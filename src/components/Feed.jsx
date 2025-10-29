import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import Card from "./Card";

function Feed() {
  const despatch = useDispatch();
  const feed = useSelector((store)=>store.feed);
  if(feed){
    console.log("Feed data:", feed.data[0]);
  }

  const fetchFeed = async() =>{
    try{
      if (feed) return;
      let res = await axios.get(API_BASE_URL+"/feed",{
        withCredentials:true,
    })
    despatch(addFeed(res.data));
    }catch(err){
      console.error("Error fetching feed:", err);
    }   
  }

  useEffect(()=>{
    fetchFeed();
  },[])

  return (
    <>
      {feed &&  feed.data.map((user,index)=>{
        return <Card key={index} userData={user}/>;
      })} 
    </>
  );
}       

export default Feed;