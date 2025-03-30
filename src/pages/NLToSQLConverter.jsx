import React, { useState } from 'react';

const NLToSQLConverter = () => {
  const [tableName, setTableName] = useState('');
  const [columnCount, setColumnCount] = useState(0);
  const [columns, setColumns] = useState([]);
  const [schemaInput, setSchemaInput] = useState('');
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [useManualSchema, setUseManualSchema] = useState(false);

  const handleColumnChange = (index, field, value) => {
    const updatedColumns = [...columns];
    if (!updatedColumns[index]) {
      updatedColumns[index] = { name: '', type: '' };
    }
    updatedColumns[index][field] = value;
    setColumns(updatedColumns);
  };

  const handleColumnCountChange = (count) => {
    const parsedCount = parseInt(count, 10) || 0;
    setColumnCount(parsedCount);
    
    // Initialize or trim columns array based on new count
    if (parsedCount > columns.length) {
      const newColumns = [...columns];
      for (let i = columns.length; i < parsedCount; i++) {
        newColumns.push({ name: '', type: '' });
      }
      setColumns(newColumns);
    } else {
      setColumns(columns.slice(0, parsedCount));
    }
  };

  const parseManualSchema = () => {
    try {
      // This is a simple parser - can be enhanced for more complex schemas
      const lines = schemaInput.split('\n').filter(line => line.trim());
      const parsedColumns = [];
      
      for (const line of lines) {
        // Match patterns like "column_name type" or "column_name: type"
        const match = line.match(/^\s*(\w+)(?:\s*:)?\s+(\w+)/);
        if (match) {
          parsedColumns.push({
            name: match[1],
            type: match[2]
          });
        }
      }
      
      setColumns(parsedColumns);
      setColumnCount(parsedColumns.length);
      return parsedColumns;
    } catch (error) {
      console.error("Error parsing schema:", error);
      return [];
    }
  };

  const generateSQLQuery = async () => {
    setLoading(true);
    
    // Use manual schema if selected
    const tableSchema = useManualSchema ? parseManualSchema() : columns;
    
    // Validate inputs
    if (!tableName || tableSchema.length === 0 || !naturalLanguageQuery) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    
    try {
      // This is where you would make an API call to your NL-to-SQL service
      // For now, we'll simulate a response
      
      // Example API call:
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     tableName,
      //     schema: tableSchema,
      //     query: naturalLanguageQuery
      //   }),
      // });
      // const data = await response.json();
      // setSqlQuery(data.sqlQuery);
      
      // Simulate API response with a basic translation
      setTimeout(() => {
        // This is just a placeholder - your actual service would do the real conversion
        const columnsString = tableSchema.map(col => col.name).join(', ');
        const generatedQuery = `SELECT ${columnsString} FROM ${tableName} WHERE /* conditions based on: "${naturalLanguageQuery}" */`;
        
        setSqlQuery(generatedQuery);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error generating SQL query:", error);
      setLoading(false);
      alert("Failed to generate SQL query. Please try again.");
    }
  };

  const resetForm = () => {
    setTableName('');
    setColumnCount(0);
    setColumns([]);
    setSchemaInput('');
    setNaturalLanguageQuery('');
    setSqlQuery('');
    setUseManualSchema(false);
  };

return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">Natural Language to SQL Converter</h1>
            
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Table Schema</h2>
                
                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Table Name:
                        <input
                            type="text"
                            value={tableName}
                            onChange={(e) => setTableName(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            placeholder="e.g., users, products, orders"
                        />
                    </label>
                </div>
                
                <div className="mb-4">
                    <label className="inline-flex items-center cursor-pointer mb-4">
                        <input
                            type="checkbox"
                            checked={useManualSchema}
                            onChange={() => setUseManualSchema(!useManualSchema)}
                            className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        <span className="ml-3">Enter schema manually</span>
                    </label>
                </div>
                
                {!useManualSchema ? (
                    <>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">
                                Number of Columns:
                                <input
                                    type="number"
                                    min="0"
                                    value={columnCount}
                                    onChange={(e) => handleColumnCountChange(e.target.value)}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                />
                            </label>
                        </div>
                        
                        {columns.map((column, index) => (
                            <div key={index} className="mb-4 flex gap-4">
                                <div className="flex-1">
                                    <label className="block mb-2 font-medium">
                                        Column Name:
                                        <input
                                            type="text"
                                            value={column.name || ''}
                                            onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                            placeholder="e.g., id, name, email"
                                        />
                                    </label>
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-2 font-medium">
                                        Column Type:
                                        <select
                                            value={column.type || ''}
                                            onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="">Select type</option>
                                            <option value="int">int</option>
                                            <option value="varchar">varchar</option>
                                            <option value="text">text</option>
                                            <option value="date">date</option>
                                            <option value="timestamp">timestamp</option>
                                            <option value="boolean">boolean</option>
                                            <option value="float">float</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Schema (one column per line, format: "column_name type"):
                            <textarea
                                value={schemaInput}
                                onChange={(e) => setSchemaInput(e.target.value)}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md h-40"
                                placeholder="id int
name varchar
email varchar
created_at timestamp"
                            />
                        </label>
                    </div>
                )}
            </div>
            
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Natural Language Query</h2>
                <textarea
                    value={naturalLanguageQuery}
                    onChange={(e) => setNaturalLanguageQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md h-24"
                    placeholder="e.g., Show me all users who signed up last month and have a verified email"
                />
            </div>
            
            <div className="flex gap-4 mb-6">
                <button
                    onClick={generateSQLQuery}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50"
                >
                    {loading ? 'Generating...' : 'Generate SQL Query'}
                </button>
                <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                >
                    Reset Form
                </button>
            </div>
            
            {sqlQuery && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Generated SQL Query</h2>
                    <div className="bg-gray-100 p-4 rounded-md">
                        <pre className="whitespace-pre-wrap">{sqlQuery}</pre>
                    </div>
                </div>
            )}
        </div>
    </div>
);
};

export default NLToSQLConverter;