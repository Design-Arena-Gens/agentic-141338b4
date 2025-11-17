"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [connected, setConnected] = useState<boolean | null>(null);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string>("");
  const [authUrl, setAuthUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/status').then(async (r) => {
      const j = await r.json();
      setConnected(j.hasCredentials);
      setAuthUrl(j.authUrl ?? null);
    });
  }, []);

  const runAgent = async () => {
    setRunning(true);
    setLog('');
    try {
      const res = await fetch('/api/run', { method: 'POST' });
      const j = await res.json();
      setLog(j.message || JSON.stringify(j, null, 2));
    } catch (e: any) {
      setLog(e?.message || 'Error');
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="container">
      <h1>Agentic Emailer</h1>
      <div className="grid">
        <div className="card">
          <h3>Gmail Connection</h3>
          <p className="small">Status: <span className="badge">{connected ? 'Connected' : connected === false ? 'Not connected' : '...'}</span></p>
          {!connected && authUrl && (
            <a className="button" href={authUrl}>Connect Gmail</a>
          )}
        </div>
        <div className="card">
          <h3>Run Agent</h3>
          <p className="small">Triggers classification, auto-replies, and unsubscriptions.</p>
          <button className="button" onClick={runAgent} disabled={running}>{running ? 'Running?' : 'Run now'}</button>
        </div>
      </div>
      <div style={{ height: 16 }} />
      <div className="card">
        <h3>Logs</h3>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{log}</pre>
      </div>
    </div>
  );
}
