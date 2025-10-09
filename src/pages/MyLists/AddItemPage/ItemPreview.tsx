import { ExternalLink } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import type { AddItemFormData } from "./AddItemForm";

export function ItemPreview() {
  const form = useFormContext<AddItemFormData>();

  const name = form.watch("name");
  const description = form.watch("description");
  const imageUrl = form.watch("imageUrl");
  const storeUrl = form.watch("storeUrl");

  const shouldShowPreview = name || description;

  return (
    <div className="">
      <h3 className="text-lg font-medium mb-3 w-full">Preview do Item</h3>
      {!shouldShowPreview && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-sm text-gray-600">
            O item aparecerá assim na lista após ser adicionado.
          </p>
        </div>
      )}

      {shouldShowPreview && (
        <Card className="border-green-200 pt-0 gap-2">
          <div className="w-full aspect-square rounded-t-xl relative overflow-hidden mb-4">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={name || "Imagem do item"}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
          <CardHeader>
            <CardTitle className="uppercase">{name || "Sem nome"}</CardTitle>
            <CardDescription className="break-all line-clamp-3">
              {description || "Sem descrição"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Link
              to={storeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="size-4 mr-1" />
              Ver na loja
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
