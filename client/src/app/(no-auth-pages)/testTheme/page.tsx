"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import { toggleTheme } from "@/store/theme/themeSlice";

const LandingPage = () => {
  const { theme, colors } = useAppSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  return (
    <div className={`${colors.background} min-h-screen p-4`}>
      <header className="flex justify-between items-center mb-8">
        <h1 className={`${colors.text} text-4xl font-bold`}>Planner Pulse</h1>
        <button
          className={`${colors.primary} ${colors.text} p-2 rounded`}
          onClick={() => dispatch(toggleTheme())}
        >
          Toggle Theme
        </button>
      </header>
      <section className="mb-8">
        <h2 className={`${colors.text} text-2xl font-semibold mb-4`}>
          Theme Colors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className={`p-4 rounded ${colors.primary} ${colors.text}`}>
            Primary Color
          </div>
          <div className={`p-4 rounded ${colors.secondary} ${colors.text}`}>
            Secondary Color
          </div>
          <div className={`p-4 rounded ${colors.accent} ${colors.text}`}>
            Accent Color
          </div>
          <div className={`p-4 rounded ${colors.text} ${colors.background}`}>
            Text Color
          </div>
          <div className={`p-4 rounded ${colors.background} ${colors.text}`}>
            Background Color
          </div>
          <div
            className={`p-4 border-2 rounded ${colors.border} ${colors.text}`}
          >
            Border Color
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className={`${colors.text} text-2xl font-semibold mb-4`}>
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className={`p-4 rounded ${colors.secondary}`}>
            <h3 className={`${colors.text} text-xl font-bold mb-2`}>
              Create and Manage Notes
            </h3>
            <p className={`${colors.text}`}>
              Easily create and manage your notes with Planner Pulse. Organize
              your thoughts and ideas efficiently.
            </p>
          </div>
          <div className={`p-4 rounded ${colors.secondary}`}>
            <h3 className={`${colors.text} text-xl font-bold mb-2`}>
              Share Notes
            </h3>
            <p className={`${colors.text}`}>
              Share your notes with other users seamlessly. Collaborate and
              share knowledge effortlessly.
            </p>
          </div>
          <div className={`p-4 rounded ${colors.secondary}`}>
            <h3 className={`${colors.text} text-xl font-bold mb-2`}>
              Rich Text Editor
            </h3>
            <p className={`${colors.text}`}>
              Use our rich text editor to add and edit notes. Format your notes
              with ease and precision.
            </p>
          </div>
          <div className={`p-4 rounded ${colors.secondary}`}>
            <h3 className={`${colors.text} text-xl font-bold mb-2`}>
              Encrypted Storage
            </h3>
            <p className={`${colors.text}`}>
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
