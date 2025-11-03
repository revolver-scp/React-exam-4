import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const AboutById = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [data, setData] = useState(null);
  async function getdata() {
    try {
      const res = await axios(`https://to-dos-api.softclub.tj/api/to-dos/${id}`);
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getdata();
  }, [id]);
  if (!data) {
    return <p>Загрузка...</p>;
  }
  return (
    <div className="flex justify-self-center flex-col text-center  cart shadow-2xl rounded-2xl border-[1px solid black]">
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <p className="mt-3">{data.description}</p>
      <p className="mt-3">{data.id}</p>
      <p className={data.isCompleted ? "true" : "false"}>{data.isCompleted ? "Active" : "Inactive"}</p>
      {data.images.map((e) => {
        return (
          <img src={`https://to-dos-api.softclub.tj/images/${e.imageName}`} alt="" />
        )
      })}
          <button onClick={() => navigate(-1)}> -Go back</button>
    </div>
  );
};
export default AboutById;