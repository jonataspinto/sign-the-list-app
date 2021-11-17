import { useApp } from "../../contexts/app";
import { ListCard } from "../ListCard";

export const ListsSection = () => {
  const { lists: data } = useApp();

  const keys = data ? Object.keys(data) : [];

  return (
    <div>
      Listas
      {data &&
        keys.map((key) => (
          <div key={data[key].id}>
            <ListCard list={data[key]} />
          </div>
        ))}
    </div>
  );
};
