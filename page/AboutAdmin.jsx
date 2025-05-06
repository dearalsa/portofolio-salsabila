import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";

const AboutAdmin = () => {
  const [about, setKonten] = useState({
    kotak_pertama: "",
    kotak_kedua: "",
    kotak_ketiga: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKonten = async () => {
      setLoading(true);
      let { data, error } = await supabase
        .from("about")
        .select("*")  // Memilih semua kolom
        .limit(1);    // Membatasi hasil menjadi satu entri

      if (error) {
        setError("Gagal mengambil data: " + error.message);
        console.error("Gagal mengambil data:", error.message);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        setKonten({
          kotak_pertama: data[0].kotak_pertama,
          kotak_kedua: data[0].kotak_kedua,
          kotak_ketiga: data[0].kotak_ketiga,
        });
      } else {
        const newUUID = uuidv4();
        const newKonten = {
          id: newUUID,
          kotak_pertama: "Introduce",
          kotak_kedua: "Hobby",
          kotak_ketiga: "Motivasi",
        };

        const { error: insertError } = await supabase
          .from("about")
          .insert([newKonten]);

        if (insertError) {
          setError("Gagal membuat data baru: " + insertError.message);
          console.error("Gagal membuat data baru:", insertError.message);
        } else {
          setKonten({
            kotak_pertama: newKonten.kotak_pertama,
            kotak_kedua: newKonten.kotak_kedua,
            kotak_ketiga: newKonten.kotak_ketiga,
          });
        }
      }
      setLoading(false);
    };

    fetchKonten();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKonten({
      ...about,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    const { data: existingData, error: fetchError } = await supabase
      .from("about")
      .select("id")
      .limit(1);

    if (fetchError) {
      setError("Gagal mengambil UUID: " + fetchError.message);
      console.error("Gagal mengambil UUID:", fetchError.message);
      setLoading(false);
      return;
    }

    const uuidToUse = existingData && existingData.length > 0 ? existingData[0].id : uuidv4();

    const { error } = await supabase
      .from("about")
      .upsert([
        {
          id: uuidToUse,
          kotak_pertama: about.kotak_pertama,
          kotak_kedua: about.kotak_kedua,
          kotak_ketiga: about.kotak_ketiga
        },
      ]);

    if (error) {
      console.error("Error saat memperbarui data:", error.message);
      setError("Error saat memperbarui data: " + error.message);
    } else {
      alert("Data berhasil diperbarui!");
    }
    setLoading(false);
  };

  return (
    <div className="about-admin">
      <div className="about-container-adm">
        <h2 className="judul-about-admin">About Me</h2>
        <p className="deskripsi-about-adm">Silakan sesuaikan konten yang akan ditampilkan di halaman about pengguna ✍🏻</p>
        {error && <p className="inierror">{error}</p>}
        {loading && <p className="iniloading">Loading...</p>}
        <div className="admin-about-form">
          <div className="admin-about-group">
            <label className="admin-label-about" htmlFor="kotak_pertama">
              Deskripsi:
            </label>
            <textarea
              id="kotak_pertama"
              name="kotak_pertama"
              className="admin-about-textarea"
              value={about.kotak_pertama}
              onChange={handleChange}
              placeholder="Isi Deskripsi"
            />
          </div>
          <div className="admin-about-group">
            <label className="admin-label-about" htmlFor="kotak_kedua">
              Deskripsi:
            </label>
            <textarea
              id="kotak_kedua"
              name="kotak_kedua"
              className="admin-about-textarea"
              value={about.kotak_kedua}
              onChange={handleChange}
              placeholder="Isi Deskripsi"
            />
          </div>
          <div className="admin-about-group">
            <label className="admin-label-about" htmlFor="kotak_ketiga">
              Deskripsi:
            </label>
            <textarea
              id="kotak_ketiga"
              name="kotak_ketiga"
              className="admin-about-textarea"
              value={about.kotak_ketiga}
              onChange={handleChange}
              placeholder="Isi Deskripsi"
            />
          </div>
          <button
            className="admin-about-button"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Memperbarui..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutAdmin;
