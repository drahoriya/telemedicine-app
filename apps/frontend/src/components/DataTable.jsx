"use client";

import { useState, useEffect } from "react";
import { Pagination } from "@/components/pagination";

const ITEMS_PER_PAGE = 10;

function paginate(data) {
  const pages = [];
  for (let i = 0; i < data.length; i += ITEMS_PER_PAGE) {
    pages.push(data.slice(i, i + ITEMS_PER_PAGE));
  }
  return pages.length ? pages : [[]];
}

const DataTable = ({ data, renderRow, headers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([[]]);

  useEffect(() => {
    setPages(paginate(data || []));
    setCurrentPage(1);
  }, [data]);

  const currentData = pages[currentPage - 1] || [];

  const nextPageHandler = () => {
    if (currentPage < pages.length) setCurrentPage((p) => p + 1);
  };

  const prevPageHandler = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left font-medium text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No data to display
                </td>
              </tr>
            ) : (
              currentData.map((item, index) => renderRow(item, index))
            )}
          </tbody>
        </table>
      </div>
      {pages.length > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pages.length}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default DataTable;
