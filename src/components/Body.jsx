import React, { useState } from "react";

function Body() {
  const [mode, setMode] = useState("Natural Language");

  return (
    <>
      <div className="my-7">
        <div className="mx-7 flex flex-col gap-2 items-center justify-center">
          <div className="text-5xl font-bold text-gray-900">
            The Ultimate Query Converter
          </div>
          <p className="text-gray-500">
            Get SQL queries in a click! This service transforms your natural
            language queries into SQL queries.
          </p>
        </div>
        <div className="flex justify-center gap-5 mt-10">
          <div className="p-5 w-[35vw] border border-gray-300 shadow-md rounded-xl">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{mode}</div>
              <button 
                className="px-3 py-1 bg-gray-200 rounded text-sm" 
                onClick={() => setMode(mode === "Natural Language" ? "Schema" : "Natural Language")}
              >
                Switch to {mode === "Natural Language" ? "Schema" : "Natural Language"}
              </button>
            </div>
            {mode === "Schema" ? (
              <>
                <div className="text-gray-500">
                  Define your table structure using the form below
                </div>
                <div className="flex flex-col gap-2 mt-5">
                  <label className="font-semibold" htmlFor="table-name">
                    Table Name
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-sm p-2"
                  />
                  <label className="font-semibold" htmlFor="num-columns">
                    No of Columns
                  </label>
                  <input
                    type="number"
                    className="border border-gray-300 rounded-sm p-2"
                  />
                  <label className="font-semibold" htmlFor="column-names">
                    Name of Columns
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-sm p-2"
                  />
                  <label className="font-semibold" htmlFor="sql-type">
                    Type of SQL
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-sm p-2"
                  />
                  <label className="font-semibold" htmlFor="query">
                    Query
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-sm p-2"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="text-gray-500">Enter your query in natural language:</div>
                <textarea className="border border-gray-300 rounded-sm p-2 w-full mt-3" rows="4" placeholder="E.g., Show all students who scored above 90%."></textarea>
              </>
            )}
          </div>

          <div className="w-[35vw] p-5 rounded-xl border border-gray-300 shadow-md">
            <div className="text-2xl font-bold">Generated SQL</div>
            <div className="text-gray-500">Your SQL query will appear here</div>
           <br />
            
            <div className="space-mono-regular font-medium text-sm ">Your SQL query will appear here after you generate it.</div>
            <br />
            <div className="flex justify-between">
                <div className="border-gray-300 px-2 py-1 border-1">Clear</div>
                <div className="border-gray-300 px-2 py-1 border-1">Copy to Clipboard</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
