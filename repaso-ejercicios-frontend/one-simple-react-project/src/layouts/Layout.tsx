import React from "react";
import { Header } from "../components/commons/Header";
import { Footer } from "../components/commons/Footer";
import { Aside } from "../components/commons/Aside";
import "../styles/layout.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-container">
      <Header />
      <Aside />
      {children}
      <Footer />
    </div>
  );
}
