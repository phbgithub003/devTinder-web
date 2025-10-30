import { API_BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

function Card({userData}) {
    let {firstName, lastName, age, about, photoUrl, skills, _id} = userData;
    let dispatch = useDispatch();


    const handleSendRequest = async (status)=>{
      try{
        let res = await axios.post(API_BASE_URL+"/request/send/"+status+"/"+_id,{},{
        withCredentials: true,
      });

      dispatch(removeUserFromFeed(_id));
      console.log("Request sent:", res.data);
      }catch(err){
        console.error("Error sending request:", err);
      } 
    }
  return (
    <div className="card bg-base-300 w-96 shadow-sm justify-center items-center mx-auto my-20">
      <figure>
        <img
          src={photoUrl}
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + " " + lastName}
          <p>{age} </p>
        </h2>
        <p>
          {about ? about : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris."}
        </p>
        <div className="card-actions justify-end">
         {
            skills && skills.map((skill, index) => {
                return <div key={index} className="badge badge-outline">{skill}</div>;
            })
         }
        </div >
        <div className="card-actions justify-center mt-4">
            <button className="btn btn-secondary" onClick={()=>handleSendRequest("ignored")}>Ignore ❌</button>
            <button className="btn btn-primary" onClick={()=>handleSendRequest("interested")}>Interested ❤️</button>
            
        </div>
      </div>
    </div>
  );
}

export default Card;
