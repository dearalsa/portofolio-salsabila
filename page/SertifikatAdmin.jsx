import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../supabase/supabaseClient";

export default function SertifikatAdmin() {
  const [certificates, setCertificates] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from("sertifikat")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCertificates(data);
    } catch (error) {
      alert("Gagal memuat sertifikat: " + error.message);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      if (!file.type.match(/image\/(png|jpg|jpeg)|application\/pdf/)) {
        throw new Error("File harus berupa PNG, JPG, JPEG, atau PDF");
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Ukuran file maksimal 5MB");
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("sertifikat")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("sertifikat")
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      const { error: insertError } = await supabase.from("sertifikat").insert([
        {
          judul: file.name,
          gambar: publicUrl,
        },
      ]);

      if (insertError) throw insertError;

      alert("Sertifikat berhasil diunggah");
      fetchCertificates();
      fileInputRef.current.value = "";
    } catch (error) {
      alert(`Gagal mengunggah: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const deleteCertificate = async (id, fileUrl) => {
    try {
      const fileName = fileUrl.split("/").pop();

      const { error: storageError } = await supabase.storage
        .from("sertifikat")
        .remove([fileName]);

      if (storageError) throw storageError;

      const { error: deleteError } = await supabase
        .from("sertifikat")
        .delete()
        .match({ id });

      if (deleteError) throw deleteError;

      setCertificates(certificates.filter((cert) => cert.id !== id));
      alert("Sertifikat berhasil dihapus");
    } catch (error) {
      alert(`Gagal menghapus sertifikat: ${error.message}`);
    }
  };

  const handleUpdateTitle = async (id) => {
    try {
      const { error } = await supabase
        .from("sertifikat")
        .update({ judul: newTitle })
        .eq("id", id);

      if (error) throw error;

      setCertificates(certificates.map((cert) =>
        cert.id === id ? { ...cert, judul: newTitle } : cert
      ));
      setEditingId(null);
      setNewTitle("");
    } catch (error) {
      alert("Gagal mengedit judul: " + error.message);
    }
  };

  return (
    <div className="sertifikat-container">
      <h2 className="sertifikat-title">Input Sertifikat</h2>

      <div className="sertifikat-upload-container">
        <input
          type="file"
          ref={fileInputRef}
          className="sertifikat-file-input"
          onChange={handleFileChange}
          accept="image/png,image/jpeg,image/jpg,application/pdf"
          disabled={uploading}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
          className={`sertifikat-upload-btn ${uploading ? "uploading" : ""}`}
        >
          {uploading ? "Mengunggah..." : "+ Tambah Sertifikat"}
        </button>
      </div>

      {certificates.length === 0 ? (
        <p className="sertifikat-empty-text">Belum ada sertifikat!</p>
      ) : (
        <div className="sertifikat-grid">
          {certificates.map((certificate) => (
            <div className="sertifikat-card" key={certificate.id}>
              {certificate.gambar.endsWith(".pdf") ? (
                <embed
                  src={certificate.gambar}
                  type="application/pdf"
                  className="sertifikat-preview"
                />
              ) : (
                <img
                  src={certificate.gambar}
                  alt={certificate.judul}
                  className="sertifikat-preview"
                />
              )}

              {editingId === certificate.id ? (
                <div className="sertifikat-edit-form">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="sertifikat-input"
                  />
                  <div className="sertifikat-edit-buttons">
                    <button
                      onClick={() => handleUpdateTitle(certificate.id)}
                      className="btn-green"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn-gray"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="sertifikat-judul">{certificate.judul}</h3>
                  <button
                    onClick={() => {
                      setEditingId(certificate.id);
                      setNewTitle(certificate.judul);
                    }}
                    className="btn-yellow"
                  >
                    Edit Judul
                  </button>
                </>
              )}

              <button
                onClick={() => deleteCertificate(certificate.id, certificate.gambar)}
                className="btn-red"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
