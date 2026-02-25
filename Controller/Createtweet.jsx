import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateTweet() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tweetData: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("myToken");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
        const formData = new FormData();
        formData.append("tweetData", form.tweetData);
        formData.append("image", form.image);
      const res = await axios.post(
        "http://localhost:7000/api/tweet/create",
        formData,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (res.data.success) {
        alert("Tweet posted successfully");
        navigate("/tweets");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Tweet post failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Tweet</h2>

      <form onSubmit={handleSubmit}>
        {/* Tweet Text */}
        <div style={{ marginBottom: "10px" }}>
          <label>Tweet Text</label>
          <br />
          <textarea
            name="tweetData"
            value={form.tweetData}
            onChange={handleChange}
            placeholder="What's happening?"
            rows={4}
            style={{ width: "100%" }}
            required
          />
        </div>

        {/* Image URL */}
        <div style={{ marginBottom: "10px" }}>
          <label>Image URL (Optional)</label>
          <br />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <button type="submit">Post Tweet</button>
      </form>
    </div>
  );
}