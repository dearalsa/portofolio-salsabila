import React, { useEffect, useState } from "react";
import "../app.css";
import rectangle from "../image/Rectangle 6.svg";
import frame1 from "../image/Frame 1.svg";
import frame4 from "../image/Frame 4.svg";
import group23 from "../image/Group 23.svg";
import frame2 from "../image/Frame 2.svg";
import frame3 from "../image/Frame 3.svg";
import group8 from "../image/Group 8.svg";
import { supabase } from "../supabase/supabaseClient";

export default function Home() {
  const [konten, setKonten] = useState({
    nama: "",
    deskripsi: "",
  });

  useEffect(() => {
    const fetchKonten = async () => {
      const { data, error } = await supabase
        .from("konten_beranda")
        .select("*")
        .single(); 

      if (!error && data) {
        setKonten({
          nama: data.nama,
          deskripsi: data.deskripsi,
        });
      } else {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchKonten();
  }, []); 

  return (
    <div id="home" className="home">
      <div className="desk">
        <p className="ptext">Halo, nama saya..</p>
        <h1 className="title1">{konten.nama}</h1> 
        <p className="paragraph">{konten.deskripsi}</p> 
        <a href="#about">
          <button className="button1">Read More</button>
        </a>
      </div>
      <div className="kotak5">
        <img src={rectangle} alt="" className="elemen5" />
      </div>
      <div className="kotak6">
        <button className="button2">Alsa</button>
      </div>
      <div className="kotak1">
        <img src={frame1} alt="" className="elemen1" />
        <div className="kotak2">
          <img src={frame4} alt="" className="elemen2" />
          <div className="kotak3">
            <img src={frame2} alt="" className="elemen3" />
            <div className="kotak4">
              <img src={frame3} alt="" className="elemen4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
