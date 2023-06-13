import { useEffect, useState } from 'react';
import { TodoistApi } from '@doist/todoist-api-typescript';
import Button from './components/Button';

function App() {
  const [isSaving, setIsSaving] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    chrome.cookies.getAll({ domain: 'saveurltodoist.vercel.app' }, function (cookies) {
      if (cookies) {
        cookies.forEach((cookie) => {
          if (cookie.name == 'token') {
            setToken(cookie.value);
          }
        });
      }
    });
  }, []);

  const addUrlToTodoist = (url: string) => {
    const api = new TodoistApi(token);

    api
      .addTask({
        content: `Check out ${url}`,
      })
      .then(() => {
        setIsSaving(false);
      });
  };

  const handleSaveButtonClick = () => {
    setIsSaving(true);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];

      if (activeTab.url) {
        addUrlToTodoist(activeTab.url);
      }
    });
  };

  const handleConnectButtonClick = () => {
    chrome.tabs.create({
      url: 'https://saveurltodoist.vercel.app/integration/authorize',
    });
  };

  const handleLogoutButtonClick = () => {
    chrome.cookies.remove({ url: 'https://saveurltodoist.vercel.app', name: 'token' });
    setToken('');
  };

  const handleGitHubLinkClick = () => {
    chrome.tabs.create({
      url: 'https://github.com/ryanarnold/todoist-save-url-extension',
    });
  };

  return (
    <main>
      <div className="w-72 p-5">
        <div className="mb-3">
          {token ? (
            isSaving ? (
              <Button text="Saving..." isDisabled={true} />
            ) : (
              <div>
                <Button text="Save URL to Todoist" eventHandler={handleSaveButtonClick} isPrimary />
              </div>
            )
          ) : (
            <Button text="Connect to Todoist" eventHandler={handleConnectButtonClick} />
          )}
        </div>
        <div className="flex w-full justify-center gap-x-4">
          {token ? (
            <div>
              <button
                onClick={handleLogoutButtonClick}
                className="text-center text-gray-600 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : null}

          <div>
            <button
              onClick={handleGitHubLinkClick}
              className="text-center text-gray-600 hover:underline"
            >
              GitHub
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
