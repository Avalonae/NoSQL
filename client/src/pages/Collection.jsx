import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext/GlobalContext";

const Collection = () => 
{
  const { collection, increaseDuration, decreaseDuration, removeItem } = useContext(GlobalContext);


  return (
    <div className="w-full min-h-full flex justify-center">
      <div className="w-[95%] mt-[90px] flex justify-between">
        <div className="w-[70%]">
            
          <table className="w-full border-collapse border border-slate-400">
            <tr className="bg-[#060606]">
              <th className="border border-slate-700 p-3 text-[#e6e6e6]">Tytuł Albumu</th>
              <th className="border border-slate-700 p-3 text-[#e6e6e6]">Wykonawca</th>
              <th className="border border-slate-700 p-3 text-[#e6e6e6]">Rok produkcji</th>
              <th className="border border-slate-700 p-3 text-[#e6e6e6]">Ilość dni</th>
              <th className="border border-slate-700 p-3 text-[#e6e6e6]">Do zapłaty</th>
              <th className="border border-slate-700 p-3 text-[#e6e6e6]">Usuń z kolekcji</th>
            </tr>
            {collection.length > 0 ? (
              collection.map((album) => {
                return (
                  <tr className="hover:bg-slate-100">

                    <td className="border border-slate-300 text-center">
                      {album.title}
                    </td>

                    <td className="border border-slate-300 text-center">
                      {album.artist}
                    </td>



                    <td className="border border-slate-300 text-center">
                      {album.year}
                    </td>

                    <td className="border border-slate-300 text-center">
                      <button
                        onClick={() => decreaseDuration(album.id)}
                        className="py-1 px-2 focus:border border-orange-300 mx-2 font-bold text-2xl"
                      >
                        -
                      </button>
                      {album.duration}
                      <button
                        onClick={() => increaseDuration(album.id)}
                        className="py-1 px-2 focus:border border-orange-300 mx-2 font-bold text-2xl"
                      >
                        +
                      </button>
                    </td>

                    <td className="border border-slate-300 text-center">
                      {(album.price * album.duration).toFixed(2)} PLN
                    </td>

                    <td className="border border-slate-300 text-center">
                      <button
                        onClick={() => removeItem(album.id)}
                        className="font-bold py-1 px-8 rounded bg-red-500 text-white hover:bg-transparent hover:text-red-500 transition duration-300"
                      >
                        Usuń
                      </button>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center font-bold text-3xl">
                  No Item Selected
                </td>
              </tr>
            )}
          </table>
        </div>
        <div className="w-[25%] bg-[#FCFCFC] shadow py-3 px-2 flex justify-center">
          <div className="w-[95%]">
          <h3 className="text-3xl fond-bold text-[#e6e6e6] bg-[#060606] text-center my-4 w-full border border-b-slate-200">
            KOLEKCJA - INFORMACJE
          </h3>
          <h4 className="text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">Ilość posiadanych albumów: {collection.length}</h4>
          <h4 className="text-bold text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">
            Ilość dni:{" "}
            {collection.reduce((sum, albums) => (sum += albums.duration), 0)}
          </h4>

          <h4 className="text-bold text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">
            Suma do zapłacenia:{" "}
            {collection.reduce((sum, albums) => (sum += albums.price * albums.duration), 0).toFixed(2)} PLN
          </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;