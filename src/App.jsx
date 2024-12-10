import { useState, useCallback, useEffect } from 'react';

import './App.css';

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_{}[]`><?/'";

    for (let i = 0; i < passwordLength; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [passwordLength, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordLength, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div 
        className="w-full max-w-lg mx-auto shadow-lg rounded-xl px-6 py-4 my-6 
                   text-orange-500 bg-gray-700 fixed top-12 left-0 right-0"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Password Generator</h1>
        <div className="flex shadow-lg rounded-xl overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 text-lg bg-gray-800 text-white"
            placeholder="Password"
            readOnly
          />
          <button 
            className="outline-none bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-transform transform active:scale-95"
            onClick={() => navigator.clipboard.writeText(password)}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-4">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              value={passwordLength}
              className="cursor-pointer"
              onChange={(e) => setPasswordLength(Number(e.target.value))}
            />
            <label>Length: {passwordLength}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

