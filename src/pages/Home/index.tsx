import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { useApp } from "../../contexts/app";

export const Home = () => {
  const { fetchLists, lists: data } = useApp();

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const keys = data ? Object.keys(data) : [];

  return (
    <section className="flex flex-col pt-4 gap-4">
      <h1>Listas disponíveis</h1>
      <div className="grid grid-cols-3 gap-5 ">
        {data
        && keys.map((key) => (
          <div key={data[key].id} className="card">
            <h2>{data[key].name}</h2>
            <img src={data[key].photoURL} alt="Imagem Familia" className="avatar" />
            <span>{data[key].phoneNumber}</span>
            <Link
              to={`/list/${data[key].id}`}
            >
              <Button className="primary">Ver lista</Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
