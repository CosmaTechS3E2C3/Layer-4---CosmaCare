export class CosmaClient {
  constructor(baseUrl = SDK_CONFIG.apiBase) {
    this.baseUrl = baseUrl;
  }

  async get(path: string) {
    const res = await fetch(`${this.baseUrl}${path}`);
    return res.json();
  }

  async post(path: string, body: any) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.json();
  }
}

