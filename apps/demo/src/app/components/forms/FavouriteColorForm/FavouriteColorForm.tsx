import React from 'react';
import styled from 'styled-components';
import Color, { COLORS, isColor } from '../../../context/Favourites/Color';
import useFavouriteColor from '../../../context/Favourites/hooks/useFavouriteColor';
import useFavourites from '../../../context/Favourites/hooks/useFavourites';

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 0px 16px 24px 16px;
  box-sizing: border-box;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 2px;
  margin-bottom: 10px;
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: #ccc;
    &::after {
      content: '\f005';
      font-family: 'FontAwesome';
      display: block;
      color: white;
      width: 12px;
      height: 12px;
      margin: 4px;
    }
  }
  &:checked + ${Item} {
    background: yellowgreen;
    border: 2px solid yellowgreen;
  }
  &:checked + ${RadioButtonLabel} {
    background: yellowgreen;
    border: 1px solid yellowgreen;
    &::after {
      content: '\f005';
      font-family: 'FontAwesome';
      display: block;
      color: white;
      width: 12px;
      height: 12px;
      margin: 4px;
    }
  }
`;

const ColorItem: React.FC<{
  color: Color;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ color, handleOnChange }) => {
  const selectedColor = useFavouriteColor();
  return (
    <Item>
      <RadioButton
        type="radio"
        name="radio"
        value={color}
        checked={color === selectedColor}
        onChange={handleOnChange}
      />
      <RadioButtonLabel />
      <div>Choose {color}</div>
    </Item>
  );
};

const FavouriteColorForm: React.FC = () => {
  const { color, setColor } = useFavourites();

  return (
    <Wrapper>
      {COLORS.map((col) => (
        <ColorItem
          color={col}
          key={col}
          handleOnChange={(evt) => {
            const newColor = evt.currentTarget.value;
            if (isColor(newColor)) {
              setColor(newColor);
            }
          }}
        />
      ))}
    </Wrapper>
  );
};

export default FavouriteColorForm;
