'use client'

import { useState } from "react";


export default function ChatBox() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setUserInput("");
    } catch(error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="entry" className="block text-sm font-medium text-gray-700">
          Your message
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="entry"
            id="entry"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="How tall is Brack Obama?"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
          <input type="submit" value="Submit" />
      </form>
      <div className="text-gray-500">{result}</div>
    </div>
  )
}
