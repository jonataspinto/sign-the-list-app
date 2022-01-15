import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "../../components/Button";
import { useApp } from "../../contexts/app";

export const Home = () => {
  const { fetchLists, lists: data } = useApp();

  const mountUrlToWhats = useCallback((number: string) => {
    const text = "Olá, quero assinar um item. Por favor me informe o código para validação";
    const url = `https://api.whatsapp.com/send/?phone=55${number}&text=${text}`;

    return url;
  }, []);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const keys = data ? Object.keys(data) : [];

  return (
    <section className="flex flex-col pt-4 gap-4">
      <h1 className="text-3xl font-bold text-gray-900 px-4 sm:p-0">Listas disponíveis</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {data
        && keys.map((key) => (
          <div key={data[key].id} className="card">
            <h2 className="text-1xl">{data[key].name}</h2>
            <img
              src={data[key].photoURL}
              alt="Imagem Familia"
              className="avatar my-1"
              onError={({ currentTarget }) => {
                // eslint-disable-next-line no-param-reassign
                currentTarget.src = "/user.png";
              }}
            />
            <a
              target="_blank"
              href={mountUrlToWhats(data[key].phoneNumber)}
              rel="noreferrer"
              className="flex gap-2 items-center"
            >
              Pegar codigo
              <FaWhatsapp className="hover:text-green-300 transition-colors" />
            </a>
            <Link
              to={`/list/${data[key].id}`}
            >
              <Button className="primary mt-2">Ver lista</Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
