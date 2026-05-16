import React, { useEffect, useRef, useState } from "react";

const TOKENS = {
  paper: "#FFF9F0",
  ink: "#1A1A1E",
  teal: "#0A3E42",
  secondary: "#546E71",
  stamp: "#7C2D12",
  border: "rgba(10, 62, 66, 0.15)",
};

const DATELINE = {
  stamp: "BOSTON, MAY 13, 2026 — ",
  body: "vault indexer wrote 47 chunks at 02:34. fleet green. 7 of 9 agents on.",
};

const NAME = "Sean Winslow";
const ROLE = "/ AI PRODUCT MANAGER";
const TAGLINE = "Raised by Saturday morning cartoons and Vercel deployment logs.";

const CHARACTER_SRC = "../reference-images/2D-Character-Sketch-Sean-v1.png";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

function Dateline({ start = 200 }) {
  const [stampShown, setStampShown] = useState("");
  const [bodyShown, setBodyShown] = useState("");
  const [cursorOn, setCursorOn] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setStampShown(DATELINE.stamp);
      setBodyShown(DATELINE.body);
      return;
    }
    let t1, t2, t3;
    t1 = setTimeout(() => {
      const stampDur = 300;
      const stampStep = stampDur / DATELINE.stamp.length;
      DATELINE.stamp.split("").forEach((_, i) => {
        setTimeout(() => setStampShown(DATELINE.stamp.slice(0, i + 1)), i * stampStep);
      });
      const bodyStart = stampDur;
      const bodyDur = 200;
      const bodyStep = bodyDur / DATELINE.body.length;
      DATELINE.body.split("").forEach((_, i) => {
        setTimeout(() => setBodyShown(DATELINE.body.slice(0, i + 1)), bodyStart + i * bodyStep);
      });
      t2 = setTimeout(() => setCursorOn(true), bodyStart + bodyDur);
      t3 = setTimeout(() => setCursorOn(false), bodyStart + bodyDur + 800);
    }, start);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduced, start]);

  return (
    <div className="dateline" aria-live="polite">
      <div className="dateline__line">
        <span className="dateline__stamp">{stampShown}</span>
        <span className="dateline__body">{bodyShown}</span>
        {cursorOn && <span className="dateline__cursor">▌</span>}
      </div>
      <div className="dateline__divider" />
    </div>
  );
}

function Name({ start = 400 }) {
  const reduced = useReducedMotion();
  return (
    <h1 className="name" aria-label={NAME}>
      {NAME.split("").map((ch, i) => (
        <span
          key={i}
          className={"name__char" + (reduced ? " name__char--reduced" : "")}
          style={{ animationDelay: `${start + i * 20}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </h1>
  );
}

function RoleTag({ start = 700 }) {
  return (
    <div className="role" style={{ animationDelay: `${start}ms` }}>
      {ROLE}
    </div>
  );
}

function Tagline({ start = 900 }) {
  return (
    <p className="tagline" style={{ animationDelay: `${start}ms` }}>
      <span className="tagline__inner">{TAGLINE}</span>
    </p>
  );
}

function Badge({ start = 1200 }) {
  const text = "GET IN TOUCH • GET IN TOUCH • ";
  const chars = text.split("");
  return (
    <a
      className="badge"
      href="mailto:sean.winslow28@gmail.com"
      aria-label="Get in touch"
      style={{ animationDelay: `${start}ms` }}
    >
      <svg viewBox="0 0 200 200" className="badge__svg">
        <defs>
          <path
            id="badge-circle"
            d="M 100, 100 m -72, 0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
          />
        </defs>
        <g className="badge__rotor">
          <text className="badge__text">
            <textPath href="#badge-circle" startOffset="0">
              {chars.join("")}
            </textPath>
          </text>
        </g>
        <g className="badge__core">
          <circle cx="100" cy="100" r="28" fill={TOKENS.teal} />
          <text
            x="100"
            y="105"
            textAnchor="middle"
            fontSize="10"
            fill={TOKENS.paper}
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="1px"
          >
            ↗
          </text>
        </g>
      </svg>
    </a>
  );
}

function Character({ start = 1300 }) {
  return (
    <div className="character" style={{ animationDelay: `${start}ms` }}>
      <div className="character__breath">
        <img
          src={CHARACTER_SRC}
          alt="Sean, standing, holding a pencil."
          className="character__img"
        />
      </div>
    </div>
  );
}

function TornPaperEdge() {
  return (
    <svg
      className="torn-edge"
      viewBox="0 0 1440 32"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,16 Q24,8 48,14 T96,16 T144,12 T192,18 T240,14 T288,20 T336,12 T384,16 T432,10 T480,18 T528,14 T576,20 T624,12 T672,16 T720,8 T768,18 T816,14 T864,20 T912,12 T960,16 T1008,10 T1056,18 T1104,14 T1152,20 T1200,12 T1248,16 T1296,8 T1344,18 T1392,14 T1440,16 L1440,32 L0,32 Z"
        fill={TOKENS.paper}
      />
      <path
        d="M0,16 Q24,8 48,14 T96,16 T144,12 T192,18 T240,14 T288,20 T336,12 T384,16 T432,10 T480,18 T528,14 T576,20 T624,12 T672,16 T720,8 T768,18 T816,14 T864,20 T912,12 T960,16 T1008,10 T1056,18 T1104,14 T1152,20 T1200,12 T1248,16 T1296,8 T1344,18 T1392,14 T1440,16"
        fill="none"
        stroke={TOKENS.border}
        strokeWidth="0.5"
      />
    </svg>
  );
}

function Cursor() {
  const cursorRef = useRef(null);
  const reduced = useReducedMotion();
  const [hoverState, setHoverState] = useState("default");

  useEffect(() => {
    if (reduced) return;
    const el = cursorRef.current;
    if (!el) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const loop = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest(".name")) setHoverState("name");
      else if (t.closest(".badge")) setHoverState("badge");
      else if (t.closest(".character")) setHoverState("character");
      else setHoverState("default");
    };
    document.addEventListener("mouseover", onOver);
    return () => document.removeEventListener("mouseover", onOver);
  }, [reduced]);

  if (reduced) return null;
  return <div ref={cursorRef} className={`cursor cursor--${hoverState}`} aria-hidden="true" />;
}

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <Dateline start={200} />
          <div className="hero__head">
            <div className="hero__title">
              <Name start={400} />
              <RoleTag start={700} />
            </div>
            <Badge start={1200} />
          </div>
          <div className="hero__body">
            <Tagline start={900} />
            <Character start={1300} />
          </div>
        </div>
        <TornPaperEdge />
      </section>
      <Cursor />
    </>
  );
}
