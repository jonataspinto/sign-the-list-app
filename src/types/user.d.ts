type Plan = "free" | "premium";

type User = {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  plan: Plan;
  createdAt: string;
  updatedAt: string;
};
