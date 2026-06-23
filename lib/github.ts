import "server-only";

const OWNER = "pedroparisii";
const REPO = "parisi-app"; 
const BRANCH = "main";
const API = "https://api.github.com";

const token = process.env.GITHUB_TOKEN!;

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

interface GitHubFile {
  content: string;
  sha: string;
}

export async function readDataFile<T>(
  path: string,
): Promise<{ data: T; sha: string }> {
  const res = await fetch(
    `${API}/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`,
    { headers, cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Failed to read ${path}: ${res.status}`);
  }

  const file = (await res.json()) as GitHubFile;
  const json = Buffer.from(file.content, "base64").toString("utf-8");
  return { data: JSON.parse(json) as T, sha: file.sha };
}


export async function writeDataFile<T>(
  path: string,
  data: T,
  message: string,
): Promise<void> {
  let sha: string | undefined;
  try {
    const current = await readDataFile<unknown>(path);
    sha = current.sha;
  } catch {
  }

  const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");

  const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message,
      content,
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to write ${path}: ${res.status} ${err}`);
  }
}
