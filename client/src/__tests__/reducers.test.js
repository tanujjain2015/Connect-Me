// import our actions 
import {
    UPDATE_OFFERINGS,
    UPDATE_SUBJECTS,
    UPDATE_CURRENT_SUBJECT,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from '../utils/actions';

import { reducer } from '../utils/reducers';


//create a sample of our global state will look like
const initialState = {
    offerings: [],
    subjects: [{ name: 'Food'}],
    currentSubject: '1',
    cart: [
        {
            _id: '1',
            name: 'Soup',
            purchaseQuantity: 1

        },
        {
            _id: '2',
            name: 'Bread',
            purchaseQuantity: 2
        }
    ],
    cartOpen: false
}

test('UPDATE_OFFERINGS', () => {
    let newState = reducer(initialState, {
        type: UPDATE_OFFERINGS,
        offerings: [{}, {}]
    });

    expect(newState.offerings.length).toBe(2);
    expect(initialState.offerings.length).toBe(0);
});


test('UPDATE_SUBJECTS', () => {
    let newState = reducer(initialState, {
        type: UPDATE_SUBJECTS,
        subjects: [{}, {}]
    });

    expect(newState.subjects.length).toBe(2);
    expect(initialState.subjects.length).toBe(1);
});


test('UPDATE_CURRENT_SUBJECT', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CURRENT_SUBJECT,
        currentSubject: '2'
    });

    expect(newState.currentSubject).toBe('2');
    expect(initialState.currentSubject).toBe('1');
});


test('ADD_TO_CART', () => {
    let newState = reducer(initialState, {
        type: ADD_TO_CART,
        offering: { purchaseQuantity: 1}
    });

    expect(newState.cart.length).toBe(3);
    expect(initialState.cart.length).toBe(2);
});


test('ADD_MULTIPLE_TO_CART', () => {
    let newState = reducer(initialState, {
      type: ADD_MULTIPLE_TO_CART,
      offerings: [{}, {}]
    });
  
    expect(newState.cart.length).toBe(4);
    expect(initialState.cart.length).toBe(2);
});


test('REMOVE_FROM_CART', () => {
    let newState1 = reducer(initialState, {
      type: REMOVE_FROM_CART,
      _id: '1'
    });
  
    // cart is still open
    expect(newState1.cartOpen).toBe(true);
  
    // the second item should now be the first
    expect(newState1.cart.length).toBe(1);
    expect(newState1.cart[0]._id).toBe('2');
  
    let newState2 = reducer(newState1, {
      type: REMOVE_FROM_CART,
      _id: '2'
    });
  
    // cart is empty and closed
    expect(newState2.cartOpen).toBe(false);
    expect(newState2.cart.length).toBe(0);
  
    expect(initialState.cart.length).toBe(2);
  });


  test('UPDATE_CART_QUANTITY', () => {
      let newState = reducer(initialState, {
          type: UPDATE_CART_QUANTITY,
          _id: '1',
          purchaseQuantity: 3
      });

      expect(newState.cartOpen).toBe(true);
      expect(newState.cart[0].purchaseQuantity).toBe(3);
      expect(newState.cart[1].purchaseQuantity).toBe(2);

      expect(initialState.cartOpen).toBe(false);
  });


test('CLEAR_CART', () => {
    let newState = reducer(initialState, {
        type: CLEAR_CART
    });

    expect(newState.cartOpen).toBe(false);
    expect(newState.cart.length).toBe(0);
    expect(initialState.cart.length).toBe(2);
});


test('TOGGLE_CART', () => {
    let newState = reducer(initialState, {
        type: TOGGLE_CART
    });

    expect(newState.cartOpen).toBe(true);
    expect(initialState.cartOpen).toBe(false);

    let newState2 = reducer(newState, {
        type: TOGGLE_CART
    });

    expect(newState2.cartOpen).toBe(false);
})
