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
            

        case "UPDATE_COLLECTION_DURATION":
            return {
            ...state,
            collection: state.collection.filter((album) => {
            return album.id === action.payload
                ? (album.duration += 0.5)
                : album.duration;
            }),
            };

        case "INCREASE_DURATION":
                return {
                    ...state,
                    collection: state.collection.filter((album) => {
                    return album.id === action.payload
                        ? (album.duration += 0.5)
                        : album.duration;
                    }),
                };

        case "DECEASE_DURATION":
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


    const addToCollection = (data) => 
    {
        dispatch(
        {
            type: "ADD_TO_COLLECTION",
            payload: { data },
        });
    };


    const updateCollection = (id) => 
    {
        dispatch(
        {
            type: "UPDATE_COLLECTION_DURATION",
            payload: id,
        });
    };

    const increaseDuration = (id) => 
    {
        dispatch(
        {
            type: "INCREASE_DURATION",
            payload: id,
        });
    };


  const decreaseDuration = (id) => 
  {
        dispatch(
        {
            type: "DECEASE_DURATION",
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
            collection: state.collection,
            addToCollection,
            updateCollection,
            increaseDuration,
            decreaseDuration,
            removeItem,
        }}>
    {children}
    </GlobalContext.Provider>);
};