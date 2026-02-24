import { HttpClient } from "./clients/httpClient";

export function productScraper(productUrl: string): Promise<{
  pageTitle: string;
  productTitle: string;
  imageUrl: string;
}> {
  const client = new HttpClient(
    import.meta.env.VITE_PRODUCT_SCRAPER_LAMBDA_URL as string,
  );

  const query = new URLSearchParams({ url: productUrl }).toString();

  return client.get(`/?${query}`);
}
