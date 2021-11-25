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
    <div className="flex flex-col pt-4 gap-4 pb-4">
      <h2 className="text-3xl font-bold text-gray-900 px-4 sm:p-0">{list?.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {list?.items.map((item, index) => (
          <ItemCard key={uuid()} item={item} position={index} />
        ))}
      </div>
    </div>
  );
};
