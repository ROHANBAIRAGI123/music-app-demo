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
    formData.append("musicFile", file);
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
    <div className="max-w-sm mx-auto">
      MusicPage
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <button
        onClick={handleUpload}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Upload
      </button>
      <form>
        <input
          type="text"
          placeholder="get by title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={async () => {
            console.log("get all music");
            await axios.get("http://localhost:8001/api/v1/music");
          }}
        >
          getAllMusic
        </button>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
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
