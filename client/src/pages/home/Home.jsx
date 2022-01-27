import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWU4YTVhYmE2ZTIxNmFiNmI3Mzc1MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MzE5NTc0MywiZXhwIjoxNjQzNjI3NzQzfQ.gTXOslsmJOSV4e72d_pvdbekRgtr6iR9kMOMrGxUNsU",
            },
          }
        );

        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list) => (
        <List list={list}/>
      ))}
    </div>
  );
};

export default Home;
