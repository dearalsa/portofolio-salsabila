import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import "../app.css";

export default function Certificate() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetchCertificates();

    const channel = supabase
      .channel("realtime-sertifikat")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sertifikat" },
        () => {
          fetchCertificates();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCertificates = async () => {
    const { data, error } = await supabase
      .from("sertifikat")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal memuat sertifikat:", error.message);
      return;
    }

    setCertificates(data);
  };

  return (
    <div id="certificate" className="certificate">
      <div className="sertifikat-section">
        <div className="terminal">
          <div className="top-bar">
            <div className="circles">
              <div className="circle pink"></div>
              <div className="circle yellow"></div>
              <div className="circle warnaapasihini"></div>
            </div>
            <div className="title">~ alsa</div>
          </div>
          <div className="content">
            {certificates.length === 0 ? (
              <p>Tidak ada sertifikat untuk ditampilkan.</p>
            ) : (
              <div className="sertifikat-grid-usr">
                {certificates.map((certificate) => (
                  <div className="sertifikat-card-usr" key={certificate.id}>
                    <a
                      href={certificate.gambar}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {certificate.gambar.endsWith(".pdf") ? (
                        <embed
                          src={certificate.gambar}
                          type="application/pdf"
                          className="sertifikat-preview-usr"
                        />
                      ) : (
                        <img
                          src={certificate.gambar}
                          alt={certificate.judul}
                          className="sertifikat-preview-usr"
                        />
                      )}
                    </a>
                    <h3 className="sertifikat-judul-usr">{certificate.judul}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
