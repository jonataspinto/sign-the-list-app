import { IItem } from "../../types/IList";
import * as S from "./ItemCardStyled";

type ItemCardProps = {
  item: IItem;
};

export const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <S.ItemCardWrapper>
      <S.ItemCardTitle>{item.name}</S.ItemCardTitle>
      <S.ItemCardDescription>{item.description}</S.ItemCardDescription>
      <button>Assinar Item</button>
    </S.ItemCardWrapper>
  );
};
