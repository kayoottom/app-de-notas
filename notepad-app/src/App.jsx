import { useState, useEffect, useRef } from "react";

const COLORS = ["#f9f4e8", "#e8f4f9", "#f4e8f9", "#e8f9ee", "#f9e8e8"];

function formatDate(date) {
  return date.toLocaleDateString("pt-BR", {
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
  });
}

function NoteCard({ note, active, onClick, onDelete }) {
  const preview = note.content.replace(/\n/g, " ").slice(0, 60) || "Nota vazia...";
  return (
    <div
      onClick={onClick}
      style={{
        background: active ? note.color : "#fff",
        border: active ? "2px solid #1a1a1a" : "2px solid transparent",
        borderRadius: "10px",
        padding: "14px 16px",
        cursor: "pointer",
        marginBottom: "10px",
        transition: "all 0.18s ease",
        boxShadow: active ? "3px 3px 0 #1a1a1a" : "1px 1px 0 #ddd",
        position: "relative",
      }}
    >
      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "15px", color: "#1a1a1a", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {note.title || "Sem título"}
      </div>
      <div style={{ fontSize: "12px", color: "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {preview}
      </div>
      <div style={{ fontSize: "11px", color: "#aaa", marginTop: "6px" }}>
        {formatDate(new Date(note.updatedAt))}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
        style={{
          position: "absolute", top: "10px", right: "10px",
          background: "none", border: "none", cursor: "pointer",
          color: "#ccc", fontSize: "16px", lineHeight: 1,
          padding: "2px 5px", borderRadius: "4px",
          transition: "color 0.15s",
        }}
        onMouseOver={e => e.target.style.color = "#e05050"}
        onMouseOut={e => e.target.style.color = "#ccc"}
        title="Apagar nota"
      >×</button>
    </div>
  );
}

export default function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("notepad_notes");
      return saved ? JSON.parse(saved) : [
        { id: 1, title: "Bem-vindo!", content: "Este é o seu bloco de notas.\nCrie, edite e organize suas ideias aqui.", color: COLORS[0], updatedAt: Date.now() }
      ];
    } catch { return []; }
  });
  const [activeId, setActiveId] = useState(notes[0]?.id ?? null);
  const [search, setSearch] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("notepad_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, [activeId]);

  const active = notes.find(n => n.id === activeId);

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      content: "",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      updatedAt: Date.now(),
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveId(newNote.id);
  };

  const updateNote = (field, value) => {
    setNotes(prev => prev.map(n =>
      n.id === activeId ? { ...n, [field]: value, updatedAt: Date.now() } : n
    ));
  };

  const deleteNote = (id) => {
    const remaining = notes.filter(n => n.id !== id);
    setNotes(remaining);
    if (activeId === id) setActiveId(remaining[0]?.id ?? null);
  };

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  const wordCount = active ? active.content.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = active ? active.content.length : 0;

  return (
    <div style={{
      display: "flex", height: "100vh", fontFamily: "'DM Sans', sans-serif",
      background: "#f5f0e8", color: "#1a1a1a", overflow: "hidden",
    }}>

      {/* Sidebar */}
      <div style={{
        width: "280px", minWidth: "280px", background: "#1a1a1a",
        display: "flex", flexDirection: "column", padding: "20px 16px",
        borderRight: "2px solid #333",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#f5f0e8", letterSpacing: "-0.5px" }}>
            📓 Notas
          </span>
          <button
            onClick={createNote}
            style={{
              background: "#f5f0e8", color: "#1a1a1a", border: "none",
              borderRadius: "8px", padding: "6px 12px", cursor: "pointer",
              fontWeight: 700, fontSize: "18px", lineHeight: 1,
              transition: "background 0.15s",
            }}
            title="Nova nota"
          >+</button>
        </div>

        <input
          placeholder="Buscar notas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: "#2a2a2a", border: "1px solid #333", borderRadius: "8px",
            padding: "8px 12px", color: "#f5f0e8", fontSize: "13px",
            outline: "none", marginBottom: "16px", width: "100%", boxSizing: "border-box",
          }}
        />

        <div style={{ flex: 1, overflowY: "auto", paddingRight: "2px" }}>
          {filtered.length === 0 && (
            <div style={{ color: "#555", fontSize: "13px", textAlign: "center", marginTop: "40px" }}>
              Nenhuma nota encontrada.
            </div>
          )}
          {filtered.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              active={note.id === activeId}
              onClick={() => setActiveId(note.id)}
              onDelete={deleteNote}
            />
          ))}
        </div>

        <div style={{ borderTop: "1px solid #333", paddingTop: "12px", marginTop: "8px", color: "#555", fontSize: "12px" }}>
          {notes.length} nota{notes.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Editor */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {active ? (
          <>
            <div style={{
              background: active.color, padding: "20px 32px 16px",
              borderBottom: "2px solid #1a1a1a", display: "flex",
              alignItems: "center", gap: "12px",
            }}>
              <input
                value={active.title}
                onChange={e => updateNote("title", e.target.value)}
                placeholder="Título da nota..."
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontFamily: "'Playfair Display', serif", fontSize: "26px",
                  fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.5px",
                }}
              />
              <div style={{ fontSize: "12px", color: "#888", whiteSpace: "nowrap" }}>
                {formatDate(new Date(active.updatedAt))}
              </div>
            </div>

            <textarea
              ref={textareaRef}
              value={active.content}
              onChange={e => updateNote("content", e.target.value)}
              placeholder="Comece a escrever..."
              style={{
                flex: 1, background: active.color, border: "none", outline: "none",
                padding: "28px 32px", fontSize: "16px", lineHeight: "1.8",
                color: "#2a2a2a", resize: "none", fontFamily: "'DM Sans', sans-serif",
              }}
            />

            <div style={{
              background: active.color, borderTop: "1px solid #ddd",
              padding: "8px 32px", display: "flex", gap: "20px",
              fontSize: "12px", color: "#999",
            }}>
              <span>{wordCount} palavras</span>
              <span>{charCount} caracteres</span>
            </div>
          </>
        ) : (
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "16px",
            color: "#aaa",
          }}>
            <div style={{ fontSize: "48px" }}>📝</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px" }}>Nenhuma nota selecionada</div>
            <button
              onClick={createNote}
              style={{
                background: "#1a1a1a", color: "#f5f0e8", border: "none",
                borderRadius: "8px", padding: "10px 24px", cursor: "pointer",
                fontWeight: 600, fontSize: "14px",
              }}
            >Criar primeira nota</button>
          </div>
        )}
      </div>
    </div>
  );
}
