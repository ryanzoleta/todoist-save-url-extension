import { useState } from 'react';
import { TodoistApi } from '@doist/todoist-api-typescript';

function App() {
  const [isSaving, setIsSaving] = useState(false);

  const addUrlToTodoist = (url: string) => {
    const api = new TodoistApi('YOUR_TOKEN_HERE');

    api
      .addTask({
        content: `Check out ${url}`,
      })
      .then(() => {
        setIsSaving(false);
      });
  };

  const handleClick = () => {
    setIsSaving(true);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];

      if (activeTab.url) {
        addUrlToTodoist(activeTab.url);
      }
    });
  };

  return (
    <main>
      <div className="w-72 p-5">
        {isSaving ? (
          <button className="rounded-full bg-red-300 w-full p-3  text-red-50" disabled>
            Saving...
          </button>
        ) : (
          <button
            className="rounded-full bg-red-500 w-full p-3 hover:bg-red-700 text-red-50"
            onClick={handleClick}
          >
            Save URL to Todoist
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
