import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { ItemCard } from "../../components/ItemCard";
import { useApp } from "../../contexts/app";

export const ListItemPage = () => {
  const params = useParams<{ id: string }>();

  const { loadList, list } = useApp();

  useEffect(() => {
    loadList(params.id);
  }, [params, loadList]);

  return (
    <div className="pb-16">
      {list?.name}
      <p className="mb-4">{list?.email}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {list?.items?.map((item, index) => (
          <ItemCard key={uuid()} item={item} position={index} />
        ))}
      </div>
    </div>
  );
};
