"use client";
import { useState } from 'react';

export default function SimpleTest() {
  const [results, setResults] = useState('');
  
  const testDirectFetch = async () => {
    try {
      // Hard-coded URL to test
      const response = await fetch('http://localhost:4000/lab5/welcome');
      const text = await response.text();
      setResults(`Success: ${text}`);
    } catch (error: any) {
      setResults(`Error: ${error.message}`);
    }
  };
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', margin: '20px 0' }}>
      <h3>Simple Connection Test</h3>
      <button onClick={testDirectFetch} className="btn btn-primary">
        Test Direct Connection to http://localhost:4000/lab5/welcome
      </button>
      <p>Result: {results}</p>
      <p>Environment variable: {process.env.NEXT_PUBLIC_HTTP_SERVER || 'NOT SET'}</p>
    </div>
  );
}
