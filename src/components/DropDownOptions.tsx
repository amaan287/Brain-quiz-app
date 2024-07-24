"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuizConfig } from "@/store/store";
import { ChevronDown } from "lucide-react";

type CategoryType = {
  id: number;
  name: string;
};

type LevelType = {
  id: number;
  name: string;
};

function DropDownOptions() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const addCategory = useQuizConfig((state: any) => state.addCategory);
  const config = useQuizConfig((state: any) => state.config);
  const addLevel = useQuizConfig((state: any) => state.addLevel);
  const addType = useQuizConfig((state: any) => state.addType);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      setCategories(data.trivia_categories);
    };
    fetchCategories();
  }, []);

  const Level = [
    { id: 1, name: "easy" },
    { id: 2, name: "medium" },
    { id: 3, name: "hard" },
  ];

  const Type = [
    { id: 0, name: "boolean" },
    { id: 1, name: "multiple" },
  ];
  console.log("Config:", config);

  return (
    <div className="flex flex-row justify-evenly items-center py-5">
      <div className="md:px-7 xl:px-10 my-4 row-span-1 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-800 dark:hover:bg-slate-200 dark:hover:text-gray-800 outline-none hover:text-white flex px-2 xl:px-5 py-2 rounded-lg shadow-lg">
            {config.category?.name ? config.category.name : "Category"}{" "}
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuItem
                onClick={() => addCategory(category.id, category.name)}
                key={category.id}
                className="overflow-y-auto"
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="md:px-7 xl:px-10 my-4 row-span-1 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-800 dark:hover:bg-slate-200 dark:hover:text-gray-800 hover:text-white flex px-2 xl:px-5 py-2 rounded-lg shadow-lg">
            {config.level ? config.level : "Level"} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Level</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Level.map((level) => (
              <DropdownMenuItem
                key={level.id}
                className="overflow-y-auto"
                onClick={() => addLevel(level.name)}
              >
                {level.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="md:px-7 xl:px-10 my-4 row-span-1 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-800 dark:hover:bg-slate-200 dark:hover:text-gray-800 hover:text-white flex px-2 xl:px-5 py-2 rounded-lg shadow-lg">
            {config.type ? config.type : "Type"} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Type.map((type) => (
              <DropdownMenuItem
                onClick={() => addType(type.name)}
                key={type.id}
              >
                {type.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default DropDownOptions;
