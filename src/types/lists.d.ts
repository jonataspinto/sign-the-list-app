type Item = {
  name: string;
  description: string;
  imageUrl: string;
  storeUrl: string;
  claimedBy: string;
  claimedAt: string;
};

type List = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  eventDate: string;
  shareCode: string;
  items: Array<Item>;
};
