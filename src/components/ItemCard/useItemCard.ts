import { useCallback, useRef, useState } from "react";
import { useApp } from "../../contexts/app";
import { useAuth } from "../../contexts/auth";
import { IItem, IList, ISubscriber } from "../../types/IList";

export const useItemCard = () => {
  const { list, assingnItem } = useApp();
  const { user } = useAuth();
  const code = useRef<HTMLInputElement>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const signedByMe = useCallback((item: IItem) => (
    user.email === item?.subscriber?.email
  ), [user.email]);

  const hasSubscriber = useCallback((item) => (!!item?.subscriber?.email), []);

  const validateActiveButton = useCallback((_hasSubscriber: boolean, _signedByMe: boolean) => {
    if (_hasSubscriber && !_signedByMe) {
      return true;
    }

    if (_signedByMe) {
      return false;
    }

    return false;
  }, []);

  const getButtonLabel = useCallback((_hasSubscriber: boolean, _signedByMe: boolean) => {
    if (_hasSubscriber && !_signedByMe) {
      return "Assinar";
    }

    if (_signedByMe) {
      return "Liberar";
    }

    return "Assinar";
  }, []);

  const handleAssingnItem = useCallback((
    _list: IList,
    positionItem: number,
    subscriber: ISubscriber,
  ) => {
    let draftList = { ..._list };
    const draftItems = _list.items.map((i) => i);
    const coppyItem = _list.items.find((_, index) => index === positionItem);

    if (coppyItem) {
      draftItems?.splice(positionItem, 1, {
        ...coppyItem,
        subscriber,
      });
    }

    draftList = { ...draftList, items: draftItems };

    assingnItem(_list.id, draftList);
  }, [assingnItem]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback((listData: IList, position: number, _code: string) => {
    const isValid = listData.code === _code;

    if (isValid) {
      handleAssingnItem(
        listData,
        position,
        !signedByMe(listData.items[position]) ? user : ({} as ISubscriber),
      );
      closeModal();
    }
  }, [handleAssingnItem, closeModal, signedByMe, user]);

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
  };
};
