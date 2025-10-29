function Card({userData}) {
    let {firstName, lastName, age, about, photoUrl, skills} = userData;
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
            <button className="btn btn-secondary">Ignore ❌</button>
            <button className="btn btn-primary">Interested ❤️</button>
            
        </div>
      </div>
    </div>
  );
}

export default Card;
