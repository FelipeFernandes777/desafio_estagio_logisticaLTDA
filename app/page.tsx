'use client'
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import { getResponseApi } from "./utils/getResponseApi";

export default function Home() {
  useEffect(() => {
    setData([""]);
  }, [])

  const [data, setData] = useState<string[]>();

  return (
    <div className="max-w-screen max-h-screen bg-slate-800">
      <section className="w-screen h-screen">
        <Header />
      </section>
    </div>
  );
}
