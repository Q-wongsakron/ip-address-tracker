import React, { useEffect, useState } from "react";

import "./App.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
function App() {
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  // const map = useMap();
  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  const getEnteredAddress = async () => {
    try {
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${
          import.meta.env.VITE_API_KEY
        }&${
          checkIpAddress.test(ipAddress)
            ? `ipAddress=${ipAddress}`
            : checkDomain.test(ipAddress)
            ? `domain=${ipAddress}`
            : ""
        }`
      );
      const data = await res.json();
      console.log(data);
      setAddress(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getEnteredAddress();
    setIpAddress("");
  };

  const getData = async () => {
    try {
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${
          import.meta.env.VITE_API_KEY
        }&ipAddress=192.212.174.101`
      );

      const data = await res.json();
      console.log(data);
      setAddress(data);
    } catch (error) {
      console.error(error);
    }
  };

  const FlyToLocation = ({ lat, lng }) => {
    const map = useMap(); // Access map instance
    useEffect(() => {
      if (lat && lng) {
        map.flyTo([lat, lng], 13, {
          animate: true,
          duration: 2,
        });
      }
    }, [lat, lng, map]);

    return null;
  };

  const customIcon = new L.Icon({
    iconUrl: "./icon-location.svg",
    iconSize: [30, 40],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  useEffect(() => {
    getData();
  }, []);

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
              onSubmit={handleSubmit}
              autoComplete="off"
              className="flex items-center justify-center mx-auto max-w-4xl "
            >
              <input
                type="text"
                name="ip-address"
                id="ip-address"
                placeholder="Enter Ip Address"
                className="py-3 bg-white px-4 rounded-l-lg w-full lg:py-4"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
              />
              <button className="py-5 px-5 bg-black rounded-r-xl lg:py-6 hover:bg-slate-700">
                <img src="/icon-arrow.svg" alt="" className="w-2 " />
              </button>
            </form>
          </article>

          {address && (
            <>
              <article className="bg-white rounded-2xl w-full p-5 pb-7 text-center mx-auto grid grid-cols-1 md:grid-cols-2 md:text-left lg:grid-cols-4 mt-6 lg:max-w-7xl lg:mt-10 lg:py-2 lg:px-6 lg:gap-8 lg:pb-9">
                <div className="mt-4 lg:border-r lg:border-slate-300 ">
                  <h2 className="text-xs font-bold text-slate-400 tracking-widest">
                    IP ADDRESS
                  </h2>
                  <p className="mt-2 font-medium text-xl ">{address?.ip}</p>
                </div>
                <div className="mt-4  lg:border-r lg:border-slate-300">
                  <h2 className="text-xs font-bold text-slate-400 tracking-widest">
                    LOCATION
                  </h2>
                  <p className="mt-2 font-medium text-xl">
                    {address?.location.city}, {address?.location.region}{" "}
                    {address?.location.postalCode}
                  </p>
                </div>
                <div className="mt-4 -10 lg:border-r lg:border-slate-300">
                  <h2 className="text-xs font-bold text-slate-400 tracking-widest">
                    TIMEZONE
                  </h2>
                  <p className="mt-2 font-medium text-xl">
                    UTC {address?.location.timezone}
                  </p>
                </div>
                <div className="mt-4  ">
                  <h2 className="text-xs font-bold text-slate-400 tracking-widest">
                    ISP
                  </h2>
                  <p className="mt-2 font-medium text-xl">
                    {address?.isp == "" ? "null" : address?.isp}
                  </p>
                </div>
              </article>
            </>
          )}
        </div>
        <div className="-mt-60 lg:-mt-15">
          {address?.location && (
            <MapContainer
              center={[address.location.lat, address.location.lng]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <FlyToLocation
                lat={address.location.lat}
                lng={address.location.lng}
              />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[address.location.lat, address.location.lng]}
                icon={customIcon}
              >
                <Popup>
                  {address.location.city}, {address.location.region}
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
