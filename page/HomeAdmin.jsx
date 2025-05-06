import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";

const HomeAdmin = () => {
  const [konten, setKonten] = useState({
    nama: "",
    deskripsi: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKonten = async () => {
      setLoading(true);
      let { data, error } = await supabase
        .from("konten_beranda")
        .select("*")
        .limit(1);

      if (error) {
        setError("Gagal mengambil data: " + error.message);
        console.error("Gagal mengambil data:", error.message);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        setKonten({
          nama: data[0].nama,
          deskripsi: data[0].deskripsi,
        });
      } else {
        const newUUID = uuidv4();
        const newKonten = {
          id: newUUID,
          nama: "Nama",
          deskripsi: "Deskripsi",
        };

        const { error: insertError } = await supabase
          .from("konten_beranda")
          .insert([newKonten]);

        if (insertError) {
          setError("Gagal membuat data baru: " + insertError.message);
          console.error("Gagal membuat data baru:", insertError.message);
        } else {
          setKonten({
            nama: newKonten.nama,
            deskripsi: newKonten.deskripsi,
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
      ...konten,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    const { data: existingData, error: fetchError } = await supabase
      .from("konten_beranda")
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
      .from("konten_beranda")
      .upsert([
        {
          id: uuidToUse,
          nama: konten.nama,
          deskripsi: konten.deskripsi,
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
    <div className="admin-home">
        <div className="admin-container-home">
      <h2 className="judul-buat-admin">Home</h2>
      <p className="deskripsinyainii">Silakan sesuaikan konten yang akan ditampilkan di halaman utama pengguna ✏️</p>
      {error && <p className="inikaloerror">{error}</p>}
      {loading && <p className="lagiloading">Loading...</p>}
      <div className="admin-home-form">
        <div className="admin-form-group">
          <label className="admin-label" htmlFor="nama">
            Nama:
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            className="admin-home-input"
            value={konten.nama}
            onChange={handleChange}
            placeholder="Masukkan Nama"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-label" htmlFor="deskripsi">
            Deskripsi:
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            className="admin-home-textarea"
            value={konten.deskripsi}
            onChange={handleChange}
            placeholder="Tambahkan Deskripsi"
          />
        </div>
        <button
          className="admin-home-button"
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

export default HomeAdmin;