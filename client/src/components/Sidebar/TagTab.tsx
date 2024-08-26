import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import { TagType } from "@/store/tag/Types";
import { getAllTags } from "@/store/tag/tagSlice";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TagTab = () => {
  const { allTags, loading }: { allTags: TagType[]; loading: boolean } =
    useAppSelector((state: RootState) => state.tag);
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">Tags</h3>
      <div className="mt-4">
        <Link href='/tag/new'>
        <button className="block w-full px-4 py-2 text-center text-gray-700 hover:bg-opacity-75 transition-all duration-300 ease-in-out" >Add new Tag</button>
        </Link>
        <button
          onClick={toggleDropdown}
          className="block w-full px-4 py-2 text-center text-gray-700 hover:bg-opacity-75 transition-all duration-300 ease-in-out"
        >
          View Tags
        </button>
        {isDropdownOpen && loading && <h5>Loading...</h5>}
        {isDropdownOpen && !loading && (
          <div
            className={`mt-2 bg-white shadow-md rounded-md border border-gray-200 transition-all duration-300 ease-in-out ${
              isDropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="flex flex-col justify-center items-center gap-2">
              
              {allTags.map((tag) => (
                <Link
                  href={`/notes/tag?=${tag._id}`}
                  key={tag._id}
                  className="block w-full px-4 py-2 text-center text-gray-700 hover:bg-opacity-75 transition-all duration-300 ease-in-out"
                  style={{
                    border: `1px solid ${tag.color}`,
                  }}
                >
                  {tag.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagTab;
