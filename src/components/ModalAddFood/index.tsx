import {Component, createRef, useRef, useState} from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface ModalAddFoodProps {
  handleAddFood: (food: []) => void
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
}

const ModalAddFood = ({handleAddFood, setIsOpen, isOpen}: ModalAddFoodProps) => {
  const formRef = useRef(null)

  const handleSubmit = (data: []) => {
    handleAddFood(data)
    setIsOpen(false)
  }


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" />

        <Input name="name" />
        <Input name="price"  />

        <Input name="description"  />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  // <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
  //   <Form ref={formRef} onSubmit={handleSubmit}>
  //     <h1>Novo Prato</h1>
  //     <Input name="image" placeholder="Cole o link aqui" />
  //
  //     <Input name="name" placeholder="Ex: Moda Italiana" />
  //     <Input name="price" placeholder="Ex: 19.90" />
  //
  //     <Input name="description" placeholder="Descrição" />
  //     <button type="submit" data-testid="add-food-button">
  //       <p className="text">Adicionar Prato</p>
  //       <div className="icon">
  //         <FiCheckSquare size={24} />
  //       </div>
  //     </button>
  //   </Form>
  // </Modal>
  )
}


export default ModalAddFood;
