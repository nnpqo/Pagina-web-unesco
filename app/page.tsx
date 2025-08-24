"use client";

import { useState } from "react";
import { evaluate } from "@/lib/scoring";
import Tips from "@/components/Tips";

export default function Page() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState<{score:number; label:string; flags:string[]}|null>(null);
  const [loading, setLoading] = useState(false);

  async function onEvaluateClient() {
    setLoading(true);
    const r = evaluate(text, title);
    setResult({ score: r.score, label: r.band, flags: r.flags });
    setLoading(false);
  }

  async function onEvaluateAPI() {
    setLoading(true);
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text }),
      });
      const data = await res.json();
      setResult({ score: data.score, label: data.band, flags: data.flags });
    } catch (e) {
      console.error(e);
      const r = evaluate(text, title);
      setResult({ score: r.score, label: r.band, flags: r.flags });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="grid">
        <section className="card">
          <h1 className="title">Validador de Noticias</h1>
          
          <div style={{display:"grid", gap: "0.9rem"}}>
            <div>
              <label htmlFor="t">Título</label>
              <input id="t" placeholder="Descubren algo"
                value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="c">Contenido</label>
              <textarea id="c" placeholder="Pegar aquí el texto de la noticia..."
                value={text} onChange={(e)=>setText(e.target.value)} />
            </div>

            <div style={{display:"flex", gap: ".6rem", flexWrap:"wrap"}}>
              <button onClick={onEvaluateAPI} disabled={loading} style={{background:"linear-gradient(135deg,#10b981,#34d399)"}}>
                {loading ? "Analizando..." : "Evaluar"}
              </button>
            </div>

            {result && (
              <div className="card" style={{marginTop:".5rem"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:".5rem"}}>
                  <strong>Puntaje de credibilidad:</strong>
                  <span className="badge">{result.label} — {result.score}%</span>
                </div>
                <div className="meter" aria-label="Barra de credibilidad">
                  <div className="meter-fill" style={{width:`${result.score}%`}} />
                </div>
                {result.flags?.length > 0 && (
                  <div className="flags">
                    <strong>Alertas:</strong>
                    <ul>
                      {result.flags.map((f,i)=>(<li key={i}>{f}</li>))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <aside className="card">
          <Tips/>
        </aside>
      </div>
    </div>
  );
}
