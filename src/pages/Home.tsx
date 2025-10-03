import { getUsers } from "@/services/users";
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    getUsers().then((data) => {
      console.log(data);
    });
  }, []);
  return <div className="container">Home</div>;
}
