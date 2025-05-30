"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Person {
  id: string;
  name: string;
}

export default function SearchPeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await fetch("https://billions-api.nomadcoders.workers.dev/");
      const data = await response.json();
      setPeople(data);
    };
    fetchPeople();
  }, []);

const normalize = (str: string) => str.toLowerCase().replace(/[\s\-]/g, "");

const filteredPeople = people.filter((person) =>
  normalize(person.name).includes(normalize(query))
);
  const handleSearch = () => {
    if (filteredPeople.length > 0) {
      router.push(`/person/${filteredPeople[0].id}`);
    } else {
      alert("No person found!");
    }
  };

  return (
    <div className="p-5 flex justify-end">
      <div className="w-1/3 flex flex-col items-end">
        <input
          type="text"
          placeholder="Search person by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded border border-gray-600 bg-[#1a1a1a] text-white text-center w-full"
        />
        <button
          onClick={handleSearch}
          className="mt-4 p-2 rounded bg-blue-700 text-white hover:bg-blue-900 transition cursor-pointer"
        >
          Search
        </button>
      </div>
    </div>
  );
}
