import Modal from "react-modal";
import { IItem, IList } from "../../types/IList";
import { useItemCard } from "./useItemCard";
import { Button } from "../Button";

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
    hasSubscriber,
  } = useItemCard();

  return (
    <div className="card flex-row md:justify-start md:flex grid grid-cols-2 gap-3">
      <div className="flex flex-col justify-between">
        <img className="avatar" src={item?.photoURL} alt={`imagem ${item.name}`} />
        <h2>{item.name}</h2>
        <p>{item.description}</p>
      </div>

      <div className="flex flex-col justify-end gap-4">
        <img className="avatar w-14 h-14" src={item?.subscriber?.photoURL} alt={`imagem ${item.name}`} />
        <p>
          Assinado por
          {" "}
          {item.subscriber?.name}
        </p>
        <Button
          disabled={validateActiveButton(hasSubscriber(item), signedByMe(item))}
          onClick={() => setIsOpen(true)}
          className="secondary"
        >
          {getButtonLabel(hasSubscriber(item), signedByMe(item))}
        </Button>
      </div>

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
        <Button
          disabled={validateActiveButton(hasSubscriber(item), signedByMe(item))}
          onClick={() => {
            handleSubmit(list as IList, position, code?.current?.value as string);
          }}
          className="primary"
        >
          {getButtonLabel(hasSubscriber(item), signedByMe(item))}
        </Button>
      </Modal>
    </div>
  );
};
