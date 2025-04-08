import React, { useState } from "react";

import "./App.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
function App() {
  return (
    <>
      <section>
        <div className="absolute">
          <img
            src="../src/assets/images/pattern-bg-desktop.png"
            alt=""
            className="w-screen object-cover h-80 box-border"
          />
        </div>
        <div className="relative px-5 " style={{ zIndex: 100000 }}>
          <article className="">
            <h1 className="text-center font-medium py-6 text-white text-2xl lg:text-4xl">
              IP Address Tracker
            </h1>
            <form
              action=""
              className="flex items-center justify-center mx-auto max-w-4xl "
            >
              <input
                type="text"
                name="ip-address"
                id="ip-address"
                placeholder="Enter Ip Address"
                className="py-3 bg-white px-4 rounded-l-lg w-full lg:py-4"
              />
              <button className="py-5 px-5 bg-black rounded-r-xl lg:py-6">
                <img src="/icon-arrow.svg" alt="" className="w-2 " />
              </button>
            </form>
          </article>

          <article className="bg-white rounded-2xl w-full p-5 pb-7 text-center mx-auto grid grid-cols-1 md:grid-cols-2 md:text-left lg:grid-cols-4 mt-6 lg:max-w-7xl lg:mt-10 lg:py-2 lg:px-6 lg:gap-8 lg:pb-9">
            <div className="mt-4 lg:border-r lg:border-slate-300 ">
              <h2 className="text-xs font-bold text-slate-400 tracking-widest">
                IP ADDRESS
              </h2>
              <p className="mt-2 font-medium text-xl ">192.212.174.101</p>
            </div>
            <div className="mt-4  lg:border-r lg:border-slate-300">
              <h2 className="text-xs font-bold text-slate-400 tracking-widest">
                LOCATION
              </h2>
              <p className="mt-2 font-medium text-xl">Brooklyn, NY 10001</p>
            </div>
            <div className="mt-4 -10 lg:border-r lg:border-slate-300">
              <h2 className="text-xs font-bold text-slate-400 tracking-widest">
                TIMEZONE
              </h2>
              <p className="mt-2 font-medium text-xl">UTC -05:00</p>
            </div>
            <div className="mt-4  ">
              <h2 className="text-xs font-bold text-slate-400 tracking-widest">
                ISP
              </h2>
              <p className="mt-2 font-medium text-xl">SpaceX Starlink</p>
            </div>
          </article>
        </div>
        <div className="-mt-60 lg:-mt-15">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={100}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>

      <section className="relative p-5"></section>

      <section className=""></section>
    </>
  );
}

export default App;
