import axios from 'axios';
import { useEffect, useState } from 'react';
import {useInView} from 'react-intersection-observer';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import './App.css';
function App() {
  
  let [photos,changePhotos] = useState([]);
  let [page,changePage] = useState(1);
  let clientId = "W1xXuHYwXPYq91hWDb9SOHQbAupgfvJeIJOejY2BDyQ";
  const { ref, inView } = useInView({threshold:0});


  let getPhotos = async (page,clientId)=>{
    try{
      let {data} = await axios.get(`https://api.unsplash.com/photos?page=${page}&client_id=${clientId}`);
      changePhotos(photos=>[...photos,...data]);
    }catch(err){
      console.log(err.toString());
    }
  }

  useEffect(()=>{
    if(inView === true){
      changePage(page=>page+1);
    }
  },[inView]);

  useEffect(()=>{
    getPhotos(page,clientId);
  },[page,clientId]);

  let buildImage = ()=>{
    return photos.map((e,id)=>{
      return (
        <div className="img__wrapper" key={id}>
          <img alt="" src={e.urls.regular}/>
          <h1 className="caption">{e.user.name}</h1>
        </div>
      )
    })
  }


  return (
    <div className="App">
      <h1 className="App__heading">Photos for you</h1>
      <div className="img__holder">
          {buildImage()}
      </div>

      <div className="loading" ref={ref}>
        {inView===true?<Loader type="Bars" color="#00BFFF" height={80} width={80} /> : null}
      </div>
    </div>
  );
}

export default App;
