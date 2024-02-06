import React, { ReactElement, createContext, createElement, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

type ListProps = {
  position:{
    x:number;
    y:number;
  };  
};

const StyledList = styled.ul<ListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext({
  openId: '',
  position: { x: 0, y: 0 } as { x: number; y: number } | null,
  setPosition: ({ x, y }: { x: number; y: number }) => {},
  close: () => {},
  open: (id: string) => {},
});

function Menus({ children }: { children: ReactElement[] | ReactElement }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, setPosition, position }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: string }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    openId === '' || openId !== id ? open(id) : close();

    const rect = (e.target as HTMLElement)
      .closest('button')
      ?.getBoundingClientRect();
    if (rect) {
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
    }
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: string; children: ReactElement[]| ReactElement }) {
  const { openId, position, close } = useContext(MenusContext);

  const ref = useOutsideClick(close);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>{children}</StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }: { children: ReactElement, icon: ReactElement, onClick: () => void}) {
  const {close} = useContext(MenusContext);
  function handleClick(){
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>{icon}<span>{children}</span></StyledButton>
    </li>
  );
}

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
