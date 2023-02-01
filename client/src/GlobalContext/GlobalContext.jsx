import React, {createContext, useReducer} from 'react';

const initialState = {
    IsLoggIn: false,
    collection: [],
};

const Reducer = (state, action) => 
{
    switch(action.type)
    {
        case "ISLOGGED_IN":
            return (
            {
                ...state,
                IsLoggIn: action.payload,
            });
            
         case "ADD_TO_COLLECTION":
            return (
            {
                ...state,
                collection: [...state.collection, action.payload.data],
            });
            

        case "UPDATE_COLLECTION_QUANTITY":
            return {
            ...state,
            collection: state.collection.filter((album) => {
            return album.id === action.payload
                ? (album.duration += 0.5)
                : album.duration;
            }),
            };

        case "INCREASE_QUANTITY":
                return {
                    ...state,
                    collection: state.collection.filter((album) => {
                    return album.id === action.payload
                        ? (album.duration += 0.5)
                        : album.duration;
                    }),
                };

        case "DECEASE_QUANTITY":
            return {
                ...state,
                collection: state.collection.filter((album) => 
                {
                return album.id === action.payload
                    ? (album.duration -= 0.5)
                    : album.duration;
                }),
            };

        case "REMOVE_ITEM":
            return {
                ...state,
                collection: [...state.collection.filter((album) => album.id !== action.payload)],
            };

        default:
            return state;
    }
};

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({ children }) =>
{
    const [state, dispatch] = useReducer(Reducer, initialState);
    
    const IsLoggedIn = (data) =>
    {
        dispatch(
        {
            type: "ISLOGGED_IN",
            payload: data,

        });
    }

    const addToCart = (data) => 
    {
        dispatch(
        {
            type: "ADD_TO_CART",
            payload: { data },
        });
    };

    const addToCollection = (data) => 
    {
        dispatch(
        {
            type: "ADD_TO_COLLECTION",
            payload: { data },
        });
    };

    const updateCart = (id) => 
    {
        dispatch(
        {
            type: "UPDATE_CART_QUANTITY",
            payload: id,
        });
    };

    const updateCollection = (id) => 
    {
        dispatch(
        {
            type: "UPDATE_COLLECTION_QUANTITY",
            payload: id,
        });
    };

    const increaseQuantity = (id) => 
    {
        dispatch(
        {
            type: "INCREASE_QUANTITY",
            payload: id,
        });
    };


  const decreaseQuantity = (id) => 
  {
        dispatch(
        {
            type: "DECEASE_QUANTITY",
            payload: id,
        });
  };

  const removeItem = (id) => 
  {
        dispatch(
        {
            type: "REMOVE_ITEM",
            payload: id,
        });
  };

    return (
    <GlobalContext.Provider
    value = {
        {
            IsLoggedIn,
            LoginStatus: state.IsLoggIn,
            cart: state.cart,
            collection: state.collection,
            addToCart,
            addToCollection,
            updateCart,
            updateCollection,
            increaseQuantity,
            decreaseQuantity,
            removeItem,
        }}>
    {children}
    </GlobalContext.Provider>);
};