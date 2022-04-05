import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  let [museums, setMuseums] = useState([]);
  let [detail, setDetail] = useState(-1);
  let [paints, setPaints] = useState([]);

  useEffect(() => {
    getMuseums();
  }, []);

  function getMuseums() {
    new Promise(function (resolve, reject) {
      const req = new XMLHttpRequest();
      req.open(
        "get",
        "https://back-museums-uniandes.herokuapp.com/api/museums"
      );
      req.onload = function () {
        if (req.status == 200) {
          let museumsIn = JSON.parse(req.response);
          resolve(museumsIn);
          museums = museumsIn;
          setMuseums(museumsIn);
          console.log(museums);
        } else {
          reject("No se encontraron productos");
        }
      };
      req.send();
    });
  }

  function handleDetail(id) {
    setDetail(id);
    const museum = museums.filter((museum) => museum.id === id);

    setPaints(museum[0].artworks);
    console.log(museum[0].artworks);
  }

  if (detail == -1) {
    return (
      <div className="App">
        <nav className="navbar navbar-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              Museos de arte moderno
            </a>
            <a href="" className="nav-item" onClick={() => handleDetail(-1)}>Museos</a>
            <a href="" className="nav-item">Artistas</a>
            <a href="" className="nav-item">Movimientos</a>
           
          </div>
        </nav>
        <div className="container">
          <p className="little">Home > Museos</p>
          <div className="row" id="museos">
            <h5 id="titulo" >MUSEOS</h5>
            </div>
        <div className="container cont-prin" >
          <div className="row">
            {museums.map((museum) => (
              <div className="col-md-3">
                <div className="card">
                  <a key={museum.id} onClick={() => handleDetail(museum.id)}>
                    <div className="card-body">
                    <img src={museum.image} alt="" class="card-img"/>
                      <h5 className="card-title">{museum.name}</h5>
                      <p className="card-text">{museum.city}</p>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <nav className="navbar navbar-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              Museos de arte moderno
            </a>
            <a className="nav-item" onClick={() => handleDetail(-1)}>Museos</a>
            <a className="nav-item">Artistas</a>
            <a className="nav-item">Movimientos</a>
           
          </div>
        </nav>
        <div className="container">
          <p className="little">Home > Museos</p>
          <div className="row" id="museos">
            <h5 id="titulo" >MUSEOS</h5>
            </div>
        <div className="container cont-prin" >
        {paints.map((paint) => (
              <div className="row paint">
              <div className="col-4">
                <div className="card">
                
                    <div className="card-body">
                      <h5 className="card-title">{paint.name}</h5>
                    </div>
                </div>
              </div>
              <div className="col-8">
                <div className="card">
                    <div className="card-body">
                      <p className="card-text down">{paint.description}</p>
                    </div>
                </div>
              </div>
              </div>
            ))}
        </div>
        </div>
        
      </div>
    );
  }
}

export default App;
