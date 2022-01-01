import React, { useEffect, useRef, useState } from "react";

import { ReactComponent as FilterIcon } from "../../../../assets/icons/filter.svg";
import useDetectOutside from "../../../../customHooks/useDetectOutside";

function Filterable({ headerLabel, filterableFields, handleFilterableFields, filterOptions }) {
  const wrapperRef = useRef(null);
  const clickedOutside = useDetectOutside(wrapperRef);

  const [showSourceFilter, setShowSourceFilter] = useState(false);

  useEffect(() => {
    setShowSourceFilter(false);
  }, [clickedOutside]);

  return (
    <div className="head-with-filter" ref={wrapperRef}>
      <div className="filter-wrap" onClick={() => setShowSourceFilter((prev) => !prev)}>
        <p>{headerLabel}</p>

        <FilterIcon fill={filterableFields.length ? "#00ffe7" : "white"} />
      </div>
      {showSourceFilter && (
        <div className="filter-options">
          <div className="reset" onClick={() => handleFilterableFields([])}>
            reset
          </div>
          {filterOptions.map(({ name, _id: id }) => (
            <div className="control" key={id}>
              <input
                type="checkbox"
                name={name}
                id={name}
                value={name}
                checked={filterableFields.includes(name)}
                onChange={() => {
                  let temp = [...filterableFields];
                  if (!temp.includes(name)) {
                    temp.push(name);
                  } else temp.splice(temp.indexOf(name), 1);

                  handleFilterableFields(temp);
                }}
              />
              <label htmlFor={name}>{name}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filterable;
