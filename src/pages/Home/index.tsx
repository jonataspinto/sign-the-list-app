import { useEffect } from "react";
import { ListsSection } from "../../components/ListsSection";
import { useApp } from "../../contexts/app";

export const Home = () => {
  const { fetchLists } = useApp();

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return <ListsSection />;
};
