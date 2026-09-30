import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  profileQuestion,
  intensityQuestion,
  pickFlavor,
  flavors,
  type Flavor,
  type ProfileId,
  type IntensityId,
} from "../data/quizData";

const css = `
:where([data-flavor-finder]){
  --flavor-finder-bg:#3a0181; --flavor-finder-text:#ffffff; --flavor-finder-accent:#ffffff; --flavor-finder-accent-text:#3a0181;
  --flavor-finder-border:rgba(255,255,255,.3); --flavor-finder-track:rgba(255,255,255,.2); --flavor-finder-hover:rgba(255,255,255,.08);
  --flavor-finder-preview-empty:rgba(255,255,255,.08);
  --flavor-finder-font-body:'IBM Plex Mono',monospace; --flavor-finder-font-display:'Anton',sans-serif;
  --flavor-finder-radius:32px; --flavor-finder-radius-inner:24px; --flavor-finder-radius-option:14px; --flavor-finder-radius-btn:999px;
  --flavor-finder-padding:48px; --flavor-finder-gap:40px; --flavor-finder-max-width:1160px;
  --flavor-finder-columns:minmax(0,1fr) minmax(0,1.1fr); --flavor-finder-preview-order:0; --flavor-finder-preview-max-width:none;
  --flavor-finder-title-size:44px; --flavor-finder-result-size:64px; --flavor-finder-showcase-size:66px; --flavor-finder-text-size:16px;
}
@media (max-width:767px){
  :where([data-flavor-finder]){
    --flavor-finder-columns:minmax(0,1fr); --flavor-finder-preview-order:1; --flavor-finder-preview-max-width:360px;
    --flavor-finder-padding:24px; --flavor-finder-gap:24px; --flavor-finder-radius:24px;
    --flavor-finder-title-size:32px; --flavor-finder-result-size:44px; --flavor-finder-showcase-size:44px;
  }
}
.flavor-finder{position:relative;display:grid;grid-template-columns:var(--flavor-finder-columns);gap:var(--flavor-finder-gap);align-items:center;
  max-width:var(--flavor-finder-max-width);margin:0 auto;padding:var(--flavor-finder-padding);border-radius:var(--flavor-finder-radius);
  background:var(--flavor-finder-bg);color:var(--flavor-finder-text);font-family:var(--flavor-finder-font-body);overflow:hidden;box-sizing:border-box}
.flavor-finder.is-showcase{grid-template-columns:minmax(0,1fr);padding:0}
.flavor-finder *{box-sizing:border-box}
.flavor-finder__preview{position:relative;order:var(--flavor-finder-preview-order);aspect-ratio:1/1;width:100%;max-width:var(--flavor-finder-preview-max-width);margin:0 auto;
  border-radius:var(--flavor-finder-radius-inner);display:flex;align-items:center;justify-content:center;overflow:hidden}
.flavor-finder.is-showcase .flavor-finder__preview{aspect-ratio:16/8;max-width:none;justify-content:flex-end;border-radius:var(--flavor-finder-radius)}
.flavor-finder__preview img{width:88%;height:88%;object-fit:contain;display:block}
.flavor-finder.is-showcase .flavor-finder__preview img{width:60%;height:92%;object-position:right center;margin-right:3%}
.flavor-finder__preview-empty{font-family:var(--flavor-finder-font-display);font-size:120px;line-height:1;opacity:.18}
.flavor-finder__step{font-size:13px;letter-spacing:.08em;text-transform:uppercase;opacity:.7;margin-bottom:12px}
.flavor-finder__title{font-family:var(--flavor-finder-font-display);font-weight:400;text-transform:uppercase;font-size:var(--flavor-finder-title-size);line-height:1.05;margin:0 0 24px}
.flavor-finder__options{display:grid;gap:10px}
.flavor-finder__option{all:unset;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px 20px;
  border:1px solid var(--flavor-finder-border);border-radius:var(--flavor-finder-radius-option);font:inherit;font-size:var(--flavor-finder-text-size);color:var(--flavor-finder-text);
  transition:background .2s,border-color .2s,color .2s}
.flavor-finder__option:hover,.flavor-finder__option:focus-visible{border-color:var(--flavor-finder-accent);background:var(--flavor-finder-hover)}
.flavor-finder__option.is-active{background:var(--flavor-finder-accent);color:var(--flavor-finder-accent-text);border-color:var(--flavor-finder-accent)}
.flavor-finder__hint{font-size:12px;opacity:.65}
.flavor-finder__progress{height:4px;border-radius:4px;background:var(--flavor-finder-track);margin-bottom:28px;overflow:hidden}
.flavor-finder__progress>div{height:100%;background:var(--flavor-finder-accent);border-radius:4px}
.flavor-finder__body{min-height:300px}
.flavor-finder__row{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}
.flavor-finder__btn{all:unset;cursor:pointer;padding:14px 26px;border-radius:var(--flavor-finder-radius-btn);font:inherit;font-weight:600;font-size:15px;
  transition:background .25s,color .25s,border-color .25s,box-shadow .25s}
.flavor-finder__btn.is-primary{background:var(--flavor-finder-accent);color:var(--flavor-finder-accent-text);border:1px solid var(--flavor-finder-accent)}
.flavor-finder__btn.is-primary:hover,.flavor-finder__btn.is-primary:focus-visible{background:transparent;color:var(--flavor-finder-accent);box-shadow:0 0 0 4px var(--flavor-finder-hover)}
.flavor-finder__btn.is-ghost{border:1px solid var(--flavor-finder-border);color:var(--flavor-finder-text)}
.flavor-finder__btn.is-ghost:hover,.flavor-finder__btn.is-ghost:focus-visible{background:var(--flavor-finder-accent);color:var(--flavor-finder-accent-text);border-color:var(--flavor-finder-accent)}
.flavor-finder__result-name{font-family:var(--flavor-finder-font-display);font-weight:400;text-transform:uppercase;font-size:var(--flavor-finder-result-size);line-height:1;margin:0 0 16px}
.flavor-finder__desc{font-size:var(--flavor-finder-text-size);line-height:1.5;opacity:.85;margin:0;max-width:360px}
.flavor-finder__overlay{position:absolute;left:var(--flavor-finder-padding);bottom:var(--flavor-finder-padding);z-index:2;max-width:46%}
.flavor-finder__overlay .flavor-finder__result-name{font-size:var(--flavor-finder-showcase-size)}
@media (max-width:767px){.flavor-finder__body{min-height:0}
  .flavor-finder.is-showcase .flavor-finder__preview{aspect-ratio:auto;flex-direction:column;justify-content:flex-start}
  .flavor-finder.is-showcase .flavor-finder__preview img{width:100%;height:60%;margin:0;object-position:center; padding:20px 20px 0;}
  .flavor-finder__overlay{position:static;max-width:none;padding:0 20px 20px}}
`;

type Step = 0 | 1 | 2;

const slide = {
  enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
};

const spring = { type: "spring" as const, stiffness: 180, damping: 24 };

function showInSlider(flavor: Flavor): boolean {
  const slider = document.querySelector<HTMLElement>(".flavor_slider");
  if (!slider) return false;
  slider.scrollIntoView({ behavior: "smooth", block: "start" });
  slider
    .querySelectorAll<HTMLElement>(".w-slider-dot")
    [flavor.slideIndex]?.click();
  return true;
}

export default function FlavorFinder() {
  const [step, setStep] = useState<Step>(0);
  const [dir, setDir] = useState(1);
  const [profile, setProfile] = useState<ProfileId | null>(null);
  const [intensity, setIntensity] = useState<IntensityId | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [showcase, setShowcase] = useState(false);

  useEffect(() => {
    Object.values(flavors).forEach((f) => {
      const img = new Image();
      img.src = f.image;
    });
  }, []);
  const hasSlider =
    typeof document !== "undefined" &&
    !!document.querySelector(".flavor_slider");

  const previewProfile =
    step === 0 && hovered ? (hovered as ProfileId) : profile;
  const previewIntensity =
    (step === 1 && hovered ? (hovered as IntensityId) : intensity) ??
    "balanced";
  const preview: Flavor | null = previewProfile
    ? pickFlavor(previewProfile, previewIntensity)
    : null;
  const result: Flavor | null =
    profile && intensity ? pickFlavor(profile, intensity) : null;

  const go = (next: Step, d = 1) => {
    setDir(d);
    setHovered(null);
    setStep(next);
  };
  const restart = () => {
    setShowcase(false);
    setProfile(null);
    setIntensity(null);
    go(0, -1);
  };

  const question = step === 0 ? profileQuestion : intensityQuestion;
  const selected = step === 0 ? profile : intensity;
  const stepLabel = step < 2 ? `Step ${step + 1} / 2` : "Your flavor";

  return (
    <motion.section
      layout
      transition={spring}
      className={`flavor-finder${showcase ? " is-showcase" : ""}`}
      aria-label="Flavor finder"
    >
      <style>{css}</style>

      <motion.div
        layout
        className="flavor-finder__preview"
        animate={{
          backgroundColor:
            preview?.color ?? "var(--flavor-finder-preview-empty)",
        }}
        transition={{ layout: spring, backgroundColor: { duration: 0.5 } }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {preview ? (
            <motion.img
              layout
              key={preview.id}
              src={preview.image}
              alt={preview.name}
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 8 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            />
          ) : (
            <motion.span
              key="empty"
              className="flavor-finder__preview-empty"
              exit={{ opacity: 0 }}
            >
              ?
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showcase && result && (
            <motion.div
              className="flavor-finder__overlay"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ ...spring, delay: 0.25 }}
            >
              <div className="flavor-finder__step">Your flavor</div>
              <h2 className="flavor-finder__result-name">{result.name}</h2>
              <p className="flavor-finder__desc">{result.desc}</p>
              <div className="flavor-finder__row">
                {hasSlider && (
                  <button
                    type="button"
                    className="flavor-finder__btn is-primary"
                    onClick={() => showInSlider(result)}
                  >
                    Open in slider ↓
                  </button>
                )}
                <button
                  type="button"
                  className="flavor-finder__btn is-ghost"
                  onClick={restart}
                >
                  Try again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {!showcase && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flavor-finder__step">{stepLabel}</div>
            <div className="flavor-finder__progress">
              <motion.div
                initial={false}
                animate={{ width: `${(step / 2) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="flavor-finder__body">
              <AnimatePresence mode="wait" custom={dir}>
                {step < 2 ? (
                  <motion.div
                    key={question.id}
                    custom={dir}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h2 className="flavor-finder__title">{question.title}</h2>
                    <div className="flavor-finder__options">
                      {question.options.map((o) => (
                        <motion.button
                          key={o.value}
                          type="button"
                          className={`flavor-finder__option${selected === o.value ? " is-active" : ""}`}
                          whileTap={{ scale: 0.97 }}
                          onMouseEnter={() => setHovered(o.value)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(o.value)}
                          onBlur={() => setHovered(null)}
                          onClick={() => {
                            if (step === 0) {
                              setProfile(o.value as ProfileId);
                              go(1);
                            } else {
                              setIntensity(o.value as IntensityId);
                              go(2);
                            }
                          }}
                        >
                          <span>{o.label}</span>
                          <span className="flavor-finder__hint">{o.hint}</span>
                        </motion.button>
                      ))}
                    </div>
                    {step === 1 && (
                      <div className="flavor-finder__row">
                        <button
                          type="button"
                          className="flavor-finder__btn is-ghost"
                          onClick={() => go(0, -1)}
                        >
                          ← Back
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={spring}
                  >
                    {result ? (
                      <>
                        <h2 className="flavor-finder__result-name">
                          {result.name}
                        </h2>
                        <p className="flavor-finder__desc">{result.desc}</p>
                        <div className="flavor-finder__row">
                          <motion.button
                            type="button"
                            className="flavor-finder__btn is-primary"
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setShowcase(true)}
                          >
                            See it →
                          </motion.button>
                          <motion.button
                            type="button"
                            className="flavor-finder__btn is-ghost"
                            whileTap={{ scale: 0.96 }}
                            onClick={restart}
                          >
                            Try again
                          </motion.button>
                        </div>
                      </>
                    ) : (
                      <p className="flavor-finder__desc">
                        Something went wrong. Try again.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
