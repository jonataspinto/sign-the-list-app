import { useEffect } from "react";
import { useParams } from "react-router";
import {v4 as uuid} from "uuid";
import { ItemCard } from "../../components/ItemCard";
import { useApp } from "../../contexts/app";

export const ListItemPage = () => {
  const params = useParams<{ id: string }>();

  const { loadList, list } = useApp();

  useEffect(() => {
    loadList(params.id);
  }, [params, loadList]);

  return (
    <div>
      {list?.name}
      <p>{list?.email}</p>

      <div>
        {list?.items.map((item, index) => (
          <ItemCard key={uuid()} item={item} position={index} />
        ))}
      </div>
    </div>
  );
};
