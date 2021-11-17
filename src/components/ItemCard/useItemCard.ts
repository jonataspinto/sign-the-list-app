import { useCallback } from "react";
import { useApp } from "../../contexts/app";
import { IList, ISubscriber } from "../../types/IList";

export const useItemCard = () => {
  const { list, assingnItem } = useApp();
  
  const validateActiveButton = useCallback((hasSubscriber: boolean, signedByMe: boolean) => {
    if (hasSubscriber && !signedByMe) {
      return true;
    }

    if (signedByMe) {
      return false;
    }

    return false
  }, []);
  
  const getButtonLabel = useCallback((hasSubscriber: boolean, signedByMe: boolean) => {
    if (hasSubscriber && !signedByMe) {
      return "Assinar";
    }

    if (signedByMe) {
      return "Liberar";
    }

    return "Assinar"
  }, []);

  const handleAssingnItem = useCallback((list: IList, positionItem: number, subscriber: ISubscriber) => {
    let draftList = { ...list };
    const draftItems = list.items.map((i) => i);
    const coppyItem = list.items.find((_, index) => index === positionItem);

    if (coppyItem) {
      draftItems?.splice(positionItem, 1, {
        ...coppyItem,
        subscriber,
      });
    }

    draftList = { ...draftList, items: draftItems };

    assingnItem(list.id, draftList);
  }, [assingnItem]);

  return {
    list,
    validateActiveButton,
    getButtonLabel,
    handleAssingnItem
  }
}