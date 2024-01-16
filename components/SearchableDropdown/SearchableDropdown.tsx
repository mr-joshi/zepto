"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import './index.css'
interface SearchableDropdownProps {
  options: Option[];
  setPills: (pills: Option[]) => void;
  pills: Option[];
  filteredOptions: Option[];
  setFilteredOptions: (filteredOptions: Option[]) => void;
  setOptions: (options: Option[]) => void;
}

interface Option {
  label: string;
  email: string;
  profileImage: string;
  highlighted: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  setPills,
  pills,
  filteredOptions,
  setFilteredOptions,
  setOptions,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [focused, setFocused] = useState<Boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredOptions(filtered);
    if (pills[pills.length - 1]?.highlighted) {
      const updatedPills = [...pills];
      updatedPills[updatedPills.length - 1].highlighted = false;
      setPills(updatedPills);
    }
  };

  const handleBackSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (ref.current?.value.length !== 0 || pills.length === 0) {
      return;
    }

    if (event.key === "Backspace") {
      if (pills[pills.length - 1].highlighted) {
        // delete the last pill
        const updatedPills = [...pills];
        updatedPills[updatedPills.length - 1].highlighted = false;
        setOptions([...options, updatedPills[pills.length - 1]]);
        setFilteredOptions([...options, updatedPills[pills.length - 1]]);
        updatedPills.pop();
        setPills(updatedPills);
      } else {
        // high light the last pill
        const updatedPills = [...pills];
        updatedPills[updatedPills.length - 1].highlighted = true;
        setPills(updatedPills);
      }

      // Prevent the default backspace behavior
      event.preventDefault();
    }
  };

  const handleOptionClick = (option: Option) => {
    setInputValue("");
    setPills([...pills, option]);
    const filtered = options.filter((obj) => obj.email !== option.email);
    setOptions(filtered);
    setFilteredOptions(filtered); // Reset filtered options when an option is selected
  };

  return (
    <div
      className="searchable-dropdown"
      
    >
      <input
        ref={ref}
        type="text"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleBackSpace}
        value={inputValue}
        onChange={handleInputChange}
        className="input-field"
      />
      {focused ? (
        <div
        className="dropdown dropdown-menu"  
        >
          {filteredOptions.map((option) => (
            <div
             className="dropdown-option"
              key={option.label}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleOptionClick(option)}
            
            >
              <div>
                <Image
                  src={option.profileImage}
                  alt="Profile"
                  width={30}
                  height={30}
                 className="profile-image "
                />
              </div>
              <div
               className="label-email" 
              >
                {option.label}
              </div>
              <div
               className="label-email" 
              >
                {option.email}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchableDropdown;
