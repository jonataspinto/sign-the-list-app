type Item = {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  storeUrl: string;
  claimedBy: string;
  claimedAt: string;
  claimantProfile?: User;
};

type List = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  eventDate: string;
  shareCode: string;
  items: Record<"string", Item>;
};
