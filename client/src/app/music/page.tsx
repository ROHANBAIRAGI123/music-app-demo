"use client";
import axios from "axios";
import React, { useState } from "react";

const MusicPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", "test");
    formData.append("artist", "test artist");
    formData.append("album", "test album");
    formData.append("genre", JSON.stringify(["test genre"]));
    formData.append("mood", JSON.stringify(["test mood"]));
    formData.append("theme", JSON.stringify(["test theme"]));
    formData.append("instrument", JSON.stringify(["test instrument"]));

    try {
      const res = await axios.post(
        "http://localhost:8001/api/v1/music/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload success:", res.data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
  return (
    <div>
      MusicPage
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button
        onClick={async () => {
          console.log("get all music");
          await axios.get("http://localhost:8001/api/v1/music");
        }}
      >
        getAllMusic
      </button>
      <form>
        <input type="text" placeholder="get by title" />
        <button
          type="submit"
          onClick={async () => {
            await axios.get("http://localhost:8001/api/v1/music/:title", {
              params: {
                title: "test",
              },
            });
          }}
        >
          Get Music
        </button>
      </form>
    </div>
  );
};

export default MusicPage;
