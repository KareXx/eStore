import React, { useState, useRef } from "react";
import "./DropDown.css";

const DropDown = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="filter_elem">
      <button className="filter_elem_title" onClick={toggleDropdown}>
        {title}
      </button>
      <div 
        className='filter_elem_body'
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
        }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;