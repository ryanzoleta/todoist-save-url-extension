import { useEffect, useState } from 'react';
import { TodoistApi } from '@doist/todoist-api-typescript';
import Button from './components/Button';

function App() {
  const [isSaving, setIsSaving] = useState(false);
  const [isIntegrated, setIsIntegrated] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    chrome.cookies.getAll({ domain: 'saveurltodoist.vercel.app' }, function (cookies) {
      if (cookies) {
        cookies.forEach((cookie) => {
          if (cookie.name == 'token') {
            setToken(cookie.value);
            setIsIntegrated(true);
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

    setIsIntegrated(true);
  };

  const handleLogoutButtonClick = () => {
    chrome.cookies.remove({ url: 'https://saveurltodoist.vercel.app', name: 'token' });
    setIsIntegrated(false);
    setToken('');
  };

  return (
    <main>
      <div className="w-72 p-5">
        {isIntegrated ? (
          isSaving ? (
            <Button text="Saving..." isDisabled={true} />
          ) : (
            <div>
              <div className="mb-3">
                <Button text="Save URL to Todoist" eventHandler={handleSaveButtonClick} isPrimary />
              </div>
              <div>
                <Button text="Logout" eventHandler={handleLogoutButtonClick} />
              </div>
            </div>
          )
        ) : (
          <Button text="Connect to Todoist" eventHandler={handleConnectButtonClick} />
        )}
      </div>
    </main>
  );
}

export default App;
