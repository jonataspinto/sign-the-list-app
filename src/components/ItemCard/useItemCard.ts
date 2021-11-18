import { useCallback, useRef, useState } from "react";
import { useApp } from "../../contexts/app";
import { useAuth } from "../../contexts/auth";
import { IItem, IList, ISubscriber } from "../../types/IList";

export const useItemCard = () => {
  const { list, assingnItem } = useApp();
  const { user } = useAuth();
  const code = useRef<HTMLInputElement>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const signedByMe = useCallback((item: IItem) => (user.email === item?.subscriber?.email), []);
  
  const hasSubscriber = useCallback((item) => (!!item?.subscriber?.email), []);

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

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [])

  const handleSubmit = useCallback((listData: IList, position: number, code: string) => {
    const isValid = listData.code === code;

    if (isValid) {
      handleAssingnItem(
        listData,
        position,
        !signedByMe ? user : ({} as ISubscriber)
      );
      closeModal()
    }
  }, [handleAssingnItem, closeModal, signedByMe, user])

  return {
    list,
    code,
    modalIsOpen,
    setIsOpen,
    signedByMe,
    hasSubscriber,
    validateActiveButton,
    getButtonLabel,
    closeModal,
    handleSubmit,
  }
}