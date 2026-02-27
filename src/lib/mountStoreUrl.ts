export function mountStoreUrl(baseUrl: string): string {
  const url = new URL(baseUrl);

  if (url.hostname.includes("amazon")) {
    url.search = "";
    url.searchParams.set("linkCode", "ll2");
    url.searchParams.set("tag", "oferreirajp-20");
  }

  return url.toString();
}
