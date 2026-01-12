import React, { useState } from 'react';

// A helper component for the individual accordion item
const AccordionItem = ({ id, heading, content, isExpanded, onToggle }) => {
  return (
    <div className={id !== 1 ? 'mt-4' : ''}>
      <h2 id={`accordion-card-heading-${id}`}>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-body rounded-base shadow-xs border bg-yellow-100 border-default hover:text-heading hover:bg-neutral-secondary-medium gap-3 ${
            isExpanded ? 'aria-expanded:rounded-b-none' : ''
          }`}
          data-accordion-target={`#accordion-card-body-${id}`}
          aria-expanded={isExpanded}
          aria-controls={`accordion-card-body-${id}`}
          onClick={() => onToggle(id)}
        >
          <span>{heading}</span>
          <svg
            data-accordion-icon
            className={`w-5 h-5 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7" />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-card-body-${id}`}
        className={`border bg-gray-200 border-t-0 border-default rounded-b-base shadow-xs ${isExpanded ? '' : 'hidden'}`}
        aria-labelledby={`accordion-card-heading-${id}`}
      >
        <div className="p-4 md:p-5">
          {content}
        </div>
      </div>
    </div>
  );
};

const FlowbiteAccordion = ({accordionData}) => {
  // State to manage which accordion item is currently open
  const [openItem, setOpenItem] = useState(1); // Default to the first item being open

  const handleToggle = (id) => {
    setOpenItem(openItem === id ? null : id); // Close if already open, otherwise open the new one
  };

 

  return (
    <div id="accordion-card" data-accordion="collapse">
      {accordionData.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          heading={item.title}
          content={item.content}
          isExpanded={openItem === item.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

export default FlowbiteAccordion;