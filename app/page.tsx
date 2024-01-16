"use client";
import dynamic from "next/dynamic";
import React, { useState, useRef } from "react";
import '../css/page.css'
import { OPTIONS_DATA } from "@/constants/OptionsData";

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
  const [options, setOptions] = useState<Option[]>(OPTIONS_DATA);
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
      className={`pill ${props.option.highlighted ? "pillHighlighted" : ""}`}
    >
      {props.option.label}
      <button
        onClick={() => {
          setPills(pills.filter((pill) => pill !== props.option));
          setOptions([...options, props.option]);
          setFilteredOptions([...options, props.option]);
        }}
      >
        X
      </button>
    </div>
    );
  };

  return (
    <div className="homeContainer">
    <div className="pillContainer">
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
