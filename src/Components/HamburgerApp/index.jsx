import { useState } from 'react';
import ingredientsToAdd from '../../constants/ingredientsToAdd.js';
import './style.css';

const HamburgerApp = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);


  const updateSelectedIngredients = (ingredient, updateFn) => {
    setSelectedIngredients(
      selectedIngredients.map((item) => {
        if (item.id === ingredient.id) {
          return updateFn(item);
        }
        return item;
      })
    );

  };
  const isIngredientAdded = (ingredient) =>
    selectedIngredients.some((item) => item.id === ingredient.id);

  

  const addIngredient = (ingredient) => {
    if (isIngredientAdded(ingredient)) {
      updateSelectedIngredients(ingredient, (item) => ({
        ...item,
        count: item.count + 1,
      }));
    } else {
      setSelectedIngredients([
        ...selectedIngredients,
        { ...ingredient, count: 1 },
      ]);
    }
  };

  const removeIngredient = (ingredient) => {
    const addedIngredient = selectedIngredients.find(
      (item) => item.id === ingredient.id
    );
    if (addedIngredient.count > 1) {
      updateSelectedIngredients(ingredient, (item) => ({
        ...item,
        count: item.count - 1,
      }));
    } else {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item.id !== ingredient.id)
      );
    }
  };

  const calculateTotalPrice = () => {
    const totalPrice = selectedIngredients.reduce((total, ingredient) => {
      return total + ingredient.count * ingredient.price;
    }, 0);
    return totalPrice;
  };

  
  const sortedIngredients = ingredientsToAdd.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      <div className="box">
        <h1>Hamburger Uygulaması</h1>
      </div>
      <div>
        <div className="box">
          <h2>Malzemeler</h2>
          <ul>
            {selectedIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name} x {ingredient.count}
              </li>
            ))}
          </ul>
        </div>

        <div className="box">
          <h2>Ek Malzemeler</h2>
          <ul>
            {sortedIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                <p>
                  {ingredient.name}{' '}
                  <button
                    onClick={() => addIngredient(ingredient)}
                    className="add-ingredient"
                  >
                    Ekle
                  </button>
                  {isIngredientAdded(ingredient) && (
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="remove-ingredient"
                    >
                      Çıkar
                    </button>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="box">
        <h2>Toplam Tutar</h2>
        <p>{calculateTotalPrice()} TL</p>
      </div>
    </div>
  );
};

export default HamburgerApp;
