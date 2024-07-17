import React, { useContext, useState } from 'react';
import './Items.css';
import Itemform from './Itemform';
import { ItemContext } from '../../../context/itemContext';
import Item from './item';
import Sold from './sold';
import { TransactionContext } from '../../../context/transactionContext';

function Items() {
  const { items, updateItems } = useContext(ItemContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const {transactionsOnUserItems} = useContext(TransactionContext);

  const addItem = (formData) => {
    updateItems(formData);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  //console.log(transactionsOnUserItems);
  
  return (
    <div className="container">
      <div className="add-item-button-container">
        <button onClick={toggleForm} className="add-item-button">
          {isFormVisible ? 'Cancel' : 'Add Item'}
        </button>
      </div>
      {isFormVisible && <Itemform addItem={addItem} toggleForm={toggleForm} />}
      <Item items={items}/>
      <Sold items={transactionsOnUserItems}/>
    </div>
  );
}

export default Items;
