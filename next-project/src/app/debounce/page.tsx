'use client'

import React, { useState, useEffect, useRef } from 'react';

type DebounceCallback<T extends unknown[]> = (...args: T) => void;


function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useDebouncedCallback<T extends unknown[]>(
  callback: DebounceCallback<T>,
  delay: number
): DebounceCallback<T> {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFunction = React.useCallback((...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
}

const DebouncedInputComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string>('');
  const [actionLog, setActionLog] = useState<string[]>([]);

  const debouncedSearchTerm = useDebounce<string>(inputValue, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchSimulatedData = async () => {
        setActionLog(prev => [...prev, `Searching for: "${debouncedSearchTerm}" (API call simulated)`]);
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
        setSearchResult(`Results for: "${debouncedSearchTerm}"`);
      };
      fetchSimulatedData();
    } else {
      setSearchResult('');
    }
  }, [debouncedSearchTerm]);

  const debouncedLogAction = useDebouncedCallback((action: string) => {
    setActionLog(prev => [...prev, `Debounced Action: ${action}`]);
  }, 1000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    debouncedLogAction(`Input changed to "${event.target.value}"`);
  };

  const handleButtonClick = () => {
    setActionLog(prev => [...prev, 'Button clicked!']);
    debouncedLogAction('Button click debounced');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          Debounce Example
        </h1>

        <div className="mb-6">
          <label htmlFor="search-input" className="block text-gray-700 text-sm font-semibold mb-2">
            Type to search (debounced by 500ms):
          </label>
          <input
            id="search-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Start typing..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-gray-700 text-sm mb-2">
            <span className="font-semibold">Current Input Value:</span> {inputValue || 'Empty'}
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Debounced Search Term:</span> {debouncedSearchTerm || 'Waiting...'}
          </p>
          {searchResult && (
            <p className="text-blue-700 font-medium mt-2">
              <span className="font-semibold">Simulated Search Result:</span> {searchResult}
            </p>
          )}
        </div>

        <div className="mb-6">
          <button
            onClick={handleButtonClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Click Me (Action Debounced by 1000ms)
          </button>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Action Log:</h3>
          {actionLog.length === 0 ? (
            <p className="text-gray-500 text-sm">No actions logged yet.</p>
          ) : (
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {actionLog.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebouncedInputComponent;
