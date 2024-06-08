import Image from "next/image";
import Filter from "../components/Filter";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-[100vh] bg-black/30">
        <Filter />
      </div>
    </>
  );
}
