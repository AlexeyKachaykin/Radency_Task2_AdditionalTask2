import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faTrash } from '@fortawesome/free-solid-svg-icons';

interface TableProps {
  data: {
    [key: string]: string | number | JSX.Element;
  }[];
  columns: string[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <div className="border border-gray-600  rounded-md overflow-hidden  ">
      <div className=" flex justify-around p-2 bg-gray-400 text-white m-4 rounded-md">
        {columns.map((column) =>
          column === 'Actions' ? (
            <div key={column} className="flex gap-2  ">
              <FontAwesomeIcon  icon={faArchive} />
              <FontAwesomeIcon  icon={faTrash} />
            </div>
          ) : (
              <div key={column} className="flex  ">
              {column}
            </div>
          )
        )}
      </div>

     
        {data.map((row, index) => (
          <div key={index} className=" flex  justify-around   m-4 rounded-md ">
            {columns.map((column) => (
              <div key={column} className="flex-1 text-center bg-zinc-300 justify-center items-center  ">
                {row[column]}
              </div>
            ))}
          </div>
        ))}
     
    </div>
  );
};

export default Table;
