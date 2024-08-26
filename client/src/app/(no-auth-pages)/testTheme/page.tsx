"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import { toggleTheme } from "@/store/theme/themeSlice";
import "./testTheme.css"; // Import the CSS file

const LandingPage = () => {
  const { theme, colors } = useAppSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  return (
    <div className="landing-page">
      <header className="header">
        <h1 className="title">Planner Pulse</h1>
        <button
          className="toggle-button"
          onClick={() => dispatch(toggleTheme())}
        >
          Toggle Theme
        </button>
      </header>
      <section className="section">
        <h2 className="section-title">Theme Colors</h2>
        <div className="grid">
          <div
            style={{ backgroundColor: `var(--${theme}-primary)` }}
            className="grid-item primary-color"
          >
            Primary Color
          </div>
          <div
            style={{ backgroundColor: `var(--${theme}-secondary)` }}
            className="grid-item secondary-color"
          >
            Secondary Color
          </div>
          <div
            style={{ backgroundColor: `var(--${theme}-accent)` }}
            className="grid-item accent-color"
          >
            Accent Color
          </div>
          <div
            style={{ backgroundColor: `var(--${theme}-text)` }}
            className="grid-item text-color"
          >
            Text Color
          </div>
          <div
            style={{ backgroundColor: `var(--${theme}-background)` }}
            className="grid-item background-color"
          >
            Background Color
          </div>
          <div
            style={{ backgroundColor: `var(--${theme}-border)` }}
            className="grid-item border-color"
          >
            Border Color
          </div>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title">Features</h2>
        <div className="grid">
          <div className="grid-item feature">
            <h3 className="feature-title">Create and Manage Notes</h3>
            <p className="feature-description">
              Easily create and manage your notes with Planner Pulse. Organize
              your thoughts and ideas efficiently.
            </p>
          </div>
          <div className="grid-item feature">
            <h3 className="feature-title">Share Notes</h3>
            <p className="feature-description">
              Share your notes with other users seamlessly. Collaborate and
              share knowledge effortlessly.
            </p>
          </div>
          <div className="grid-item feature">
            <h3 className="feature-title">Rich Text Editor</h3>
            <p className="feature-description">
              Use our rich text editor to add and edit notes. Format your notes
              with ease and precision.
            </p>
          </div>
          <div className="grid-item feature">
            <h3 className="feature-title">Encrypted Storage</h3>
            <p className="feature-description">
              Your notes are stored in an encrypted format, ensuring your data
              is secure and private.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
