import Modal from "react-modal";  
import { IItem, IList } from "../../types/IList";
import { useItemCard } from "./useItemCard";
import * as S from "./ItemCardStyled";

type ItemCardProps = {
  item: IItem;
  position: number;
};

export const ItemCard = ({ item, position }: ItemCardProps) => {
  const { 
    list,
    getButtonLabel,
    validateActiveButton,
    modalIsOpen,
    setIsOpen,
    closeModal,
    signedByMe,
    handleSubmit,
    code,
    hasSubscriber
  } = useItemCard();

  return (
    <S.ItemCardWrapper>
      <S.ItemCardTitle>{item.name}</S.ItemCardTitle>
      <S.ItemCardDescription>{item.description}</S.ItemCardDescription>
      <S.ItemCardDescription>
        Assinado por {item.subscriber?.name}
      </S.ItemCardDescription>
      <button
        disabled={validateActiveButton(hasSubscriber(item), signedByMe(item))}
        onClick={() => setIsOpen(true)}
      >
        {getButtonLabel(hasSubscriber(item), signedByMe(item))}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <input 
          ref={code} 
          type="text"
          placeholder="Código de confirmação"
          name="code"
        />
        <button
          disabled={validateActiveButton(hasSubscriber(item), signedByMe(item))}
          onClick={() => {
            handleSubmit(list as IList, position, code?.current?.value as string)
          }}
        >
          {getButtonLabel(hasSubscriber(item), signedByMe(item))}
        </button>
      </Modal>
    </S.ItemCardWrapper>
  );
};
