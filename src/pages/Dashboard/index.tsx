import {Component, useCallback, useEffect, useState} from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import {FoodProps} from "../../types";
import Food from '../../components/Food';


interface DashboardProps {
  foods: []
  editingFood: object
  modalOpen: boolean
  editModalOpen: boolean
}


const Dashboard = ():JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [foods, setFoods] = useState<FoodProps[]>([])
  const [editingFood, setEditingFood] = useState<FoodProps>()

  useEffect(   () => {
      const fetchData = async () => {
        const response = await api.get('/foods')
        setFoods(response.data)
      }
      fetchData()
        .catch(console.error)
  },[])

  const toggleModal = useCallback(() => {
      setIsModalOpen(!isModalOpen)
  },[setIsModalOpen, isModalOpen])

  const toggleEditModal = useCallback(() => {
    setIsEditModalOpen(!isEditModalOpen)
  },[setIsEditModalOpen, isEditModalOpen])


  const handleAddFood = async (food: FoodProps) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      if (response) setFoods([...foods, response.data])
    } catch (err) {
      console.log(err);
    }
  }


  const handleUpdateFood = async (food: FoodProps) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

     setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);
    setFoods(foodsFiltered)
  }

  const handleEditFood = (food: FoodProps) => {
    setEditingFood(food)
    setIsEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={isModalOpen}
        setIsOpen={toggleModal}
        handleAddFood={() => handleAddFood}
      />
      <ModalEditFood
        isOpen={isEditModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood as FoodProps}
        handleUpdateFood={() => handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={() =>handleDeleteFood}
              handleEditFood={() => handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}

export default Dashboard;
