import { useAuth } from "../../contexts/auth";
import { IItem, IList, ISubscriber } from "../../types/IList";
import { useItemCard } from "./useItemCard";
import * as S from "./ItemCardStyled";

type ItemCardProps = {
  item: IItem;
  position: number;
};

export const ItemCard = ({ item, position }: ItemCardProps) => {
  const { user } = useAuth();

  const signedByMe = user.email === item?.subscriber?.email;

  const hasSubscriber = !!item?.subscriber?.email;

  const { 
    list,
    getButtonLabel,
    validateActiveButton,
    handleAssingnItem
  } = useItemCard();

  return (
    <S.ItemCardWrapper>
      <S.ItemCardTitle>{item.name}</S.ItemCardTitle>
      <S.ItemCardDescription>{item.description}</S.ItemCardDescription>
      <S.ItemCardDescription>
        Assinado por {item.subscriber?.name}
      </S.ItemCardDescription>
      <button
        disabled={validateActiveButton(hasSubscriber, signedByMe)}
        onClick={() => {
          handleAssingnItem(
            list as IList,
            position,
            !signedByMe ? user : ({} as ISubscriber)
          );
        }}
      >
        {getButtonLabel(hasSubscriber, signedByMe)}
      </button>
    </S.ItemCardWrapper>
  );
};
