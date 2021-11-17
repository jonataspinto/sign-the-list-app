import { ListsSection } from "../components/ListsSection";
import { useEffect } from "react";
import { useApp } from "../contexts/app";

export const Home = () => {
  const { loadLists } = useApp();

  useEffect(() => {
    loadLists();
  }, [loadLists]);

  return <ListsSection />;
};
