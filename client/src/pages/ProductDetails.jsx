import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { GlobalContext } from "../GlobalContext/GlobalContext";

const ProductDetails = () => {
  const params = useParams();
  const albumid = params.albumid;

  const { collection, addToCollection, updateCollection, LoginStatus} = useContext(GlobalContext);

  const [album, setAlbum] = useState([]);

  useEffect(() => 
  {
    axios({
      url: `http://localhost:5000/api/album/get_album/${albumid}`,
      method: "get",
    })
      .then((res) => 
      {
        setAlbum(res.data);
      })
      .catch((error) => 
      {
        console.log(error);
      });
  }, [albumid]);

  const changeArray = (arr) =>
  {
    let str = "";
    arr.forEach(el => 
    {
        str += String(el) + ", "
        
    });
    return str.substring(0, str.length - 2);
  }


  const addToCollectionHandler = (event) => 
  {
    event.preventDefault();

    let id = event.target.id;

    const newAlbum = 
    {
      id: album._id,
      title: album.title,
      artist: album.artist,
      genre: album.genre,
      year: album.year,
      tracks: album.tracks,
      type_of_media: album.type_of_media,
      price: +album.price_per_day,
      duration: 1,
    };

    const findAlbum = collection.find((album) => album.id === id);

    if (findAlbum) 
    {
      updateCollection(id);
      return;
    }

    addToCollection(newAlbum);
  };


  let index = 0;

  return (
  <div className="w-full min-h-full flex justify-center">
      <div className="w-[80%] mt-[90px] flex justify-between ">
        <div className="w-[70%] shadow-md ">
            
          <table className="w-full border-collapse border border-slate-400 ">
            <caption className="bg-[#F37703] text-white text-xl py-3 font-bold">UTWORY ZAWARE W ALBUMIE</caption>

            <tr className="bg-[#060606]">
              <th className="border border-slate-700 p-3 text-[#e6e6e6]">Indeks</th>
              <th className="border border-slate-700 p-3 text-[#e6e6e6]">Utwór</th>
            </tr>

            {album.tracks?.map((row) => 
            {
              return (
                <tr key={row} className="bg-[#FCFCFC] hover:bg-slate-100">
                  <td className="border border-slate-300 text-center">
                    {index++}
                  </td>
                  <td className="border border-slate-300 text-center">
                    {row}
                  </td>
                </tr>
              );
            })}

          </table>
                  
        </div>
        <div className="w-[25%] bg-[#FCFCFC] shadow-md py-3 px-2 flex justify-center">
          <div className="w-[95%]">

          <h3 className="text-3xl fond-bold text-[#e6e6e6] bg-[#060606] text-center my-4 w-full border border-b-slate-200">
            INFORMACJE
          </h3>

          <h4 className="font-bold text-lg border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">
            Tytuł albumu: {album.title}
          </h4>

          <h4 className="text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">
            Wykonawca: {album.artist}
          </h4>


          <h4 className="text-bold text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">
            Rok Produkcji: {album.year}
          </h4>

          <h4 className="text-bold text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">
            Gatunki: {album.genre ? changeArray(album.genre) : false}
          </h4>

          <h4 className="text-bold text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">
            Multimedia: {album.type_of_media ? changeArray(album.type_of_media) : false}
          </h4>

          <h4 className="text-bold text-bold border border-b-slate-200 border-l-0 border-t-0 border-r-0 py-2">
            Koszt/dzień: {album.price_per_day} PLN
          </h4>
            {LoginStatus ? (<button className="bg-[#F37703] rounded px-3 py-2 text-white w-full my-4 hover:bg-transparent hover:text-[#F37703] transition duration-300"
          onClick={addToCollectionHandler}
          >Wypożycz</button>) : (<></>)
        }




          </div>
        </div>
      </div>
    </div>
            );
};

export default ProductDetails;
