import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request); // ensure reducer default is []!
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      console.log("Requests Data:", res.data);
      // make sure your action expects an array; guard if API returns null
      dispatch(addRequest(res.data?.data ?? []));
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // optionally add dispatch if linter complains

  if (loading) {
    return <div className="text-center my-10">Loading requests…</div>;
  }

  if (error) {
    return (
      <div className="text-center my-10 text-red-500">
        Failed to load connection requests.
      </div>
    );
  }

  // defensive: ensure we have an array
  const requestsArray = Array.isArray(request) ? request : [];

  if (requestsArray.length === 0) {
    return (
      <div className="text-center my-10">
        <h1 className="font-bold text-white text-3xl">No Connection Requests</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Connection Requests</h1>

      <div className="max-w-3xl mx-auto mt-6">
        {requestsArray.map((req) => {
          // be safe if fromUserId is null/undefined
          const from = req.fromUserId ?? {};
          const { _id, firstName, lastName, photoUrl, age, gender, about } = from;

          // fallback key: maybe the request itself has an id (req._id or req.id)
          const key = _id ?? req._id ?? req.id;
          return (
            <div
              key={key ?? Math.random()}
              className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 mx-auto"
            >
              <div>
                <img
                  alt={firstName ? `${firstName} ${lastName}` : "profile"}
                  className="w-20 h-20 rounded-full object-cover"
                  src={photoUrl ?? "/default-avatar.png"}
                />
              </div>

              <div className="text-left mx-4 flex-1">
                <h2 className="font-bold text-xl">
                  {(firstName || lastName) ? `${firstName ?? ""} ${lastName ?? ""}`.trim() : "Unknown User"}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                {about && <p className="text-sm mt-1">{about}</p>}
              </div>

              <div className="flex-shrink-0">
                <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
