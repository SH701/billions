import Search from "@/components/search";
import Image from "next/image";
import Link from "next/link";

interface Person {
  id: string;
  name: string;
  squareImage?: string;
  netWorth: number;
  industries: string[];
}

async function getPeople(): Promise<Person[]> {
  const res = await fetch("https://billions-api.nomadcoders.workers.dev/", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("API 호출 실패");

  const data: Person[] = await res.json();
  return data.filter(
    (p) =>
      typeof p.squareImage === "string" &&
      p.squareImage.startsWith("https://")
  );
  
}


export default async function Page() {
  const people = await getPeople();
  
  return (
    <>
    <Search/>
    <div className="grid lg:grid-cols-5 sm:grid-cols-3 px-20 py-10">
      {people.map((person) => {
        const imageUrl = person.squareImage!.trim() || "";
        return (
          <div key={person.id}>
            <div className="flex flex-col gap-2 items-center justify-center">
            <div className="w-50 overflow-hidden text-center">
               <p className="text-xl sm:text-base font-semibold truncate" title={person.id}>
                  {person.name}
                </p>
            </div>
            <Link href={`/person/${person.id}`} className="hover:opacity-80">
            {imageUrl ? (
              <Image
                src={imageUrl}
                width={240}
                height={240}
                alt={person.name}
                className="rounded-lg w-80 h-80 sm:w-40 sm:h-40 lg:w-60 lg:h-60 object-cover"
              />
            ) : (
              <p>이미지 없음</p>
            )}
            </Link>
            <div className="flex gap-1 sm:text-xs lg:text-base pb-10 text-lg">
              <p>{String(person.netWorth).slice(0,3)} Billion</p>
              <p> | {person.industries}</p>
            </div>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}
