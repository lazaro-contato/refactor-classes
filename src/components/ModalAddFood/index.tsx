import React, {useState} from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import {FoodProps} from "../../types";

interface ModalAddFoodProps {
  handleAddFood: (food: FoodProps) => void
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
}

type InputTypes = 'image' | 'name' | 'price' | 'description'


const ModalAddFood = ({handleAddFood, setIsOpen, isOpen}: ModalAddFoodProps) => {
  const [foodData, setFoodData] = useState<FoodProps>(
    {
      name: '',
      available: true,
      id: Math.random() * Math.random(),
      description: '',
      image: '',
      price: '',
    }
  )

  const handleSubmit = (data: FoodProps) => {
    handleAddFood(data)
    setIsOpen(false)
  }

  const setValues = (event: React.ChangeEvent<HTMLInputElement>, element: InputTypes) => {
    switch (true) {
      case (element === 'name'):
        return setFoodData(prevState => ({...prevState, name: event.target.value}))
      case (element === 'image'):
        return setFoodData(prevState => ({...prevState, image: event.target.value}))
      case (element === 'price'):
        return setFoodData(prevState => ({...prevState, price: event.target.value}))
      case (element === 'description'):
        setFoodData(prevState => ({...prevState, description: event.target.value}))
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={() => handleSubmit(foodData)}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder='Cole o link aqui' onChange={(event) => setValues(event, 'image')}/>
        <Input name="name" placeholder='Ex: Moda Italiana' onChange={(event) => setValues(event, 'name')}/>
        <Input name="price"  placeholder='Ex: 19.90' onChange={(event) => setValues(event, 'price')}/>
        <Input name="description"  placeholder='Descrição' onChange={(event) => setValues(event, 'description')}/>
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}


export default ModalAddFood;
