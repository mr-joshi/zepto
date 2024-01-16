"use client";
import dynamic from "next/dynamic";
import React, { useState, useRef } from "react";
const SearchableDropdown = dynamic(
  () => import("@/components/SearchableDropdown/SearchableDropdown"),
  {
    ssr: false,
  },
);

interface Option {
  label: string;
  email: string;
  profileImage: string;
  highlighted: boolean;
}

interface SearchableDropdownProps {
  options: Option[];
}

// Considering email in the options to be unique
// If not we can unique id's to be unique
// Keeping email as unique as it is generally unique for users
export default function Home() {
  const [options, setOptions] = useState<Option[]>([
    {
      label: "Option 1",
      email: "1LqJ3@example.com",
      profileImage: "https://via.placeholder.com/150",
      highlighted: false,
    },
    {
      label: "Option 2",
      email: "2LqJ3@example.com",
      profileImage: "https://via.placeholder.com/150",
      highlighted: false,
    },
    {
      label: "Option 3",
      email: "3LqJ3@example.com",
      profileImage: "https://via.placeholder.com/150",
      highlighted: false,
    },
  ]);
  const [pills, setPills] = useState<
    {
      label: string;
      email: string;
      profileImage: string;
      highlighted: boolean;
    }[]
  >([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const Pill = (props: {
    option: {
      label: string;
      email: string;
      profileImage: string;
      highlighted: boolean;
    };
  }) => {
    return (
      <div
        style={{
          border: "2px solid green",
          margin: "5px 10px",
          background: props.option.highlighted ? "red" : "green",
          width: "fit-content",
        }}
      >
        {props.option.label}
        <button
          onClick={() => {
            setPills(pills.filter((pill) => pill !== props.option));
            setOptions([...options, props.option]);
            setFilteredOptions([...options, props.option]);
          }}
        >
          R
        </button>
      </div>
    );
  };

  return (
    <div
      style={{
        height: "500px",
      }}
    >
      <div
        style={{
          border: "2px solid blue",
          display: "flex",
          borderRadius: "5px",
        }}
      >
        {pills.map((pill) => (
          <Pill key={pill.email} option={pill} />
        ))}
        <SearchableDropdown
          options={options}
          setPills={setPills}
          pills={pills}
          filteredOptions={filteredOptions}
          setFilteredOptions={setFilteredOptions}
          setOptions={setOptions}
        />
      </div>
    </div>
  );
}
