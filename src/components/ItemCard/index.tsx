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
    setModalIsOpen,
    closeModal,
    signedByMe,
    handleSubmit,
    code,
    hasSubscriber,
    showDetails,
    setShowDetails,
  } = useItemCard();

  return (
    <div className="card flex-row md:justify-start md:flex grid grid-cols-2 md:gap-8 gap-3">
      <div className="flex flex-col justify-between items-center gap-2">
        <img
          className="avatar"
          src={item?.photoURL}
          alt={`imagem ${item.name}`}
          onError={({ currentTarget }) => {
            // eslint-disable-next-line no-param-reassign
            currentTarget.src = "/logo512.png";
          }}
        />
        <h2>{item.name}</h2>
        <Button
          className="primary"
          onClick={() => {
            setModalIsOpen(true);
            setShowDetails(true);
          }}
        >
          Ver detalhes
        </Button>
      </div>

      <div className="flex flex-col justify-end gap-2">
        {item.subscriber?.name && (
          <>
            <img
              className="avatar w-14 h-14"
              src={item?.subscriber?.photoURL}
              alt={`imagem ${item.subscriber?.name}`}
              onError={({ currentTarget }) => {
                // eslint-disable-next-line no-param-reassign
                currentTarget.src = "/logo512.png";
              }}
            />
            <p>
              Assinado por
              {" "}
              {item.subscriber?.name}
            </p>
          </>
        )}
        <Button
          disabled={validateActiveButton(hasSubscriber(item), signedByMe(item))}
          onClick={() => setModalIsOpen(true)}
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
        {showDetails ? (
          <div>
            <div className="flex flex-col justify-between items-center gap-2">
              <img
                className="avatar"
                src={item?.photoURL}
                alt={`imagem ${item.name}`}
                onError={({ currentTarget }) => {
                  // eslint-disable-next-line no-param-reassign
                  currentTarget.src = "/logo512.png";
                }}
              />
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <Button
                className="primary"
                onClick={() => {
                  closeModal();
                }}
              >
                Fechar
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-4 flex flex-col gap-4">
            <input
              className="placeholder-gray-400 px-4 py-2.5 transition duration-200 ease-in-out transform rounded-lg bg-gray-200 focus:bg-white focus:outline-none border-2 focus:border-gray-200"
              ref={code}
              type="text"
              placeholder="Código de confirmação"
              name="code"
            />
            <span className="flex gap-3">
              <Button
                className="primary"
                onClick={() => {
                  closeModal();
                }}
              >
                Cancelar
              </Button>
              <Button
                disabled={validateActiveButton(hasSubscriber(item), signedByMe(item))}
                onClick={() => {
                  handleSubmit(list as IList, position, code?.current?.value as string);
                }}
                className="secondary"
              >
                {getButtonLabel(hasSubscriber(item), signedByMe(item))}
              </Button>
            </span>
          </div>
        )}
      </Modal>
    </div>
  );
};
