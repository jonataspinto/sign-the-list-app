import { GoBackButton } from "@/components/GoBackButton";
import { CreateListForm } from "@/pages/CreateListPage/CreateListForm";

export function CreateListPage() {
  return (
    <div className="space-y-6">
      <GoBackButton />
      <CreateListForm />
    </div>
  );
}
