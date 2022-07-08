import {Component, createRef, useRef, useState} from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import {FormHandles} from "@unform/core";
import {FoodProps} from "../../types";

interface ModalEditFoodProps {
  isOpen: boolean
  handleUpdateFood: (food: []) => void
  editingFood: FoodProps
  setIsOpen: (isOpen: boolean) => void
}

const ModalEditFood = ({isOpen, handleUpdateFood, editingFood, setIsOpen}: ModalEditFoodProps): JSX.Element => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = (food: []) => {
    handleUpdateFood(food)
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={() => setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" />

        <Input name="name"  />
        <Input name="price" />

        <Input name="description"/>

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  // <Modal isOpen={isOpen} setIsOpen={() => setIsOpen}>
  //   <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
  //     <h1>Editar Prato</h1>
  //     <Input name="image" placeholder="Cole o link aqui" />
  //
  //     <Input name="name" placeholder="Ex: Moda Italiana" />
  //     <Input name="price" placeholder="Ex: 19.90" />
  //
  //     <Input name="description" placeholder="Descrição" />
  //
  //     <button type="submit" data-testid="edit-food-button">
  //       <div className="text">Editar Prato</div>
  //       <div className="icon">
  //         <FiCheckSquare size={24} />
  //       </div>
  //     </button>
  //   </Form>
  // </Modal>
  )
}

export default ModalEditFood;
