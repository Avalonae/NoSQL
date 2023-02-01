import React, { useEffect, useState } from "react";
import a1 from "../assets/a1.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import { useContext } from "react";

const Home = () => 
{

  const [albums, setAlbums] = useState([]);
  const { collection, addToCollection, updateCollection, LoginStatus} = useContext(GlobalContext);

  useEffect(() => 
  {
    axios(
    {
      url: "http://localhost:5000/api/album/all_albums",
      method: "get"
    })
      .then((res) => 
      {
        setAlbums(res.data);;
      })
      .catch((error) => 
      {
        console.log(console.log(`Message ERROR : ${error}`));
      });
  }, []);

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
    //console.log(id);
    const title = document.getElementById("hiddentitle" + id).value;
    const artist = document.getElementById("hiddenartist" + id).value;
    const genre = document.getElementById("hiddengenre" + id).value;
    const year = document.getElementById("hiddenyear" + id).value;
    const tracks = document.getElementById("hiddentracks" + id).value;
    const type_of_media = document.getElementById("hiddentype_of_media" + id).value;
    const price = document.getElementById("hiddenprice" + id).value;
    

    const newAlbum = 
    {
        id,
        title,
        artist,
        genre,
        year,
        tracks,
        type_of_media,
        price: +price,
        duration: 1,
    }

    console.log(newAlbum);

    const findAlbum = collection.find((album) => album.id === id);

    if(findAlbum)
    {
        updateCollection(id);
        return;
    }

    addToCollection(newAlbum);

  };

  return (
    <div className="w-full">
      <div className="">
        <img src={a1} className="h-[240px] w-full" />
      </div>

      <div className="w-full flex justify-center mt-5 mb-4">
        <div className="grid gap-4 grid-cols-3 w-[82%] ">
          {albums.map((album) => 
          {
            return (
              <div className="shadow bg-[#F9F7F7]" key={album._id}>
                <div className="w-[95%] flex justify-between my-2">
                  <div className="mx-20">
                    <div className = "font-bold text-xl my-2">{album.title}</div>

                    <div className="flex">
                        <div className = " text-bs mx-2">Artysta:</div>
                        <div className = "font-bold text-bs"> {album.artist}</div>
                    </div>

                    <div className="flex">
                        <div className = " text-bs mx-2">Rok produkcji:</div>
                        <div className = "font-bold text-bs"> {album.year}</div>
                    </div>

                    <div className="flex">
                        <div className = " text-bs mx-2">Multimedia:</div>
                        <div className = "font-bold text-bs">{changeArray(album.type_of_media)}</div>
                    </div>
                    
                    <div className = " text-bs">Koszt/dzień: {album.price_per_day} PLN</div>

                    <input
                      type="hidden"
                      value={album.title}
                      id={`hiddentitle${album._id}`}
                    />

                    <input
                      type="hidden"
                      value={album.artist}
                      id={`hiddenartist${album._id}`}
                    />

                    <input
                      type="hidden"
                      value={album.year}
                      id={`hiddenyear${album._id}`}
                    />

                    <input
                      type="hidden"
                      value={album.price_per_day}
                      id={`hiddenprice${album._id}`}
                    />
                    
                    <input
                      type="hidden"
                      value={album.type_of_media}
                      id={`hiddentype_of_media${album._id}`}
                    />

                    <input
                      type="hidden"
                      value={album.tracks}
                      id={`hiddentracks${album._id}`}
                    />

                    <input
                      type="hidden"
                      value={album.genre}
                      id={`hiddengenre${album._id}`}
                    />

                  </div>
                  <div>
                    <div className=''>
                        <div className='row'>

                            {LoginStatus
                            ?
                            (
                                <button
                            id={album._id}
                            onClick={addToCollectionHandler}
                            className=" block font-bold my-5 py-2 px-5 bg-black text-white rounded hover:bg-transparent hover:text-black transition duration-300"
                            >
                            Wypożycz
                            </button>
                            ) : (
                            <Link to={'login'}>
                                <button className="block font-bold my-5 py-2 px-4  bg-[#0CC400] text-white rounded hover:bg-transparent hover:text-[#0CC400] transition duration-300">
                                    Zaloguj się!
                                </button>
                            </Link>
                            )}

                            <Link to={`productdetails/${album._id}`}>
                                <button className="block font-bold my-5 py-2 px-6 bg-[#FFA500] text-white rounded hover:bg-transparent hover:text-[#FFA500] transition duration-300">
                                    Sczegóły
                                </button>
                            </Link>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;