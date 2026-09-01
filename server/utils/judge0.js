const LANGUAGE_IDS = {
  JavaScript: 63,
  Python: 71,
  "C++": 54,
  Java: 62,
};

const getConfig = () => {
  const url = process.env.JUDGE0_API_URL;
  const key = process.env.JUDGE0_API_KEY;
  const host = process.env.JUDGE0_API_HOST;
  return { url, key, host };
};

export const isJudge0Configured = () => {
  const { url } = getConfig();
  return Boolean(url);
};

export const executeCode = async ({ code, language, stdin = "" }) => {
  const { url, key, host } = getConfig();

  if (!url) {
    throw new Error(
      "Code execution is not configured. Set JUDGE0_API_URL (and JUDGE0_API_KEY/JUDGE0_API_HOST if using RapidAPI) in server/.env."
    );
  }

  const languageId = LANGUAGE_IDS[language];
  if (!languageId) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const headers = { "Content-Type": "application/json" };
  if (key) headers["X-RapidAPI-Key"] = key;
  if (host) headers["X-RapidAPI-Host"] = host;

  const submitRes = await fetch(
    `${url}/submissions?base64_encoded=false&wait=true`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin,
      }),
    }
  );

  if (!submitRes.ok) {
    const text = await submitRes.text();
    throw new Error(`Judge0 request failed (${submitRes.status}): ${text}`);
  }

  const result = await submitRes.json();

  return {
    stdout: result.stdout || "",
    stderr: result.stderr || "",
    compileOutput: result.compile_output || "",
    status: result.status?.description || "Unknown",
    time: result.time,
    memory: result.memory,
  };
};