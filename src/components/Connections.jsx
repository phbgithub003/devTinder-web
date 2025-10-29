import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { useSelector } from "react-redux";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(API_BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("Connections Data:", res.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection) {
    return <div>Loading connections...</div>;
  }

  if (connection.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No Connections Found</h1>
      </div>
    );
  }
  
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connection.map((conn) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          conn;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
