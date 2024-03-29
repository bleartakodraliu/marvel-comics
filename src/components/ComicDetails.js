import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL, TOKEN } from "../consts";
import Loader from "./Loader";

const ComicDetails = ({ comicId }) => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);

  const fetchCharacterDetails = async (id, comicId) => {
    try {
      setLoading(true);
      const url = `${API_URL}/comics/${comicId}?${TOKEN}`;
      const res = await axios.get(url);

      setItem(res.data.data.results[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacterDetails(id, comicId);
  }, [id, comicId]);

  return (
    <div className="bg-dark">
      {loading && <Loader />}
      {item && (
        <div className="container mt-5">
          <div className="d-flex gap-5">
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              alt="Comic Cover"
              width={"auto"}
              height={200}
              loading="lazy"
            />
            <h3 className="text-white pt-3">{item.title}</h3>
          </div>
          <div className="p-1">
            <h5 className="text-white mt-5">{item.description}</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicDetails;
