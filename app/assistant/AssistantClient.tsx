"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const IFRAME_URL = "https://aokfs-portfolio-copilot.hf.space";
const IFRAME_TIMEOUT_MS = 15000;

export default function AssistantClient() {
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const clearTimeoutRef = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setHasLoaded(false);
    setHasError(false);

    clearTimeoutRef();
    timeoutRef.current = window.setTimeout(() => {
      setHasError(true);
      setIsLoading(false);
    }, IFRAME_TIMEOUT_MS);

    return () => {
      clearTimeoutRef();
    };
  }, [retryKey]);

  const handleLoad = () => {
    setHasLoaded(true);
    setIsLoading(false);
    setHasError(false);
    clearTimeoutRef();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    clearTimeoutRef();
  };

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-indigo-200"
          >
            <span aria-hidden="true">←</span>
            Retour
          </button>
          <h1 className="text-base font-semibold text-white sm:text-lg">Assistant</h1>
          {hasError ? (
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Réessayer
            </button>
          ) : (
            <div className="w-[92px]" aria-hidden="true" />
          )}
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-8">
        <div className="flex flex-1 flex-col gap-6">
          {isLoading && !hasError ? (
            <div className="flex flex-1 items-center justify-center rounded-3xl border border-white/10 bg-slate-900/60">
              <div className="flex flex-col items-center gap-4 py-16">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-indigo-400" />
                <p className="text-sm text-slate-200">Chargement de l’assistant…</p>
              </div>
            </div>
          ) : null}

          {!hasError ? (
            <iframe
              key={retryKey}
              title="Portfolio Copilot"
              src={IFRAME_URL}
              onLoad={handleLoad}
              onError={handleError}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className={`min-h-[70vh] w-full rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl ${
                isLoading && !hasLoaded ? "hidden" : "block"
              }`}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-12 text-center">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-white">Assistant indisponible pour le moment (service surchargé).</h2>
                <p className="text-sm text-slate-300">
                  Le service met plus de temps que prévu. Vous pouvez réessayer ou ouvrir l’assistant dans un nouvel onglet.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="rounded-full bg-indigo-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
                >
                  Réessayer
                </button>
                <a
                  href={IFRAME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  Ouvrir l’assistant dans un nouvel onglet
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-xs text-slate-300">
                <p>Besoin d’aide ?</p>
                <p>
                  <a className="font-semibold text-white hover:text-indigo-200" href="mailto:karim@karimhammouche.com">
                    karim@karimhammouche.com
                  </a>
                  <span className="mx-2 text-slate-500">•</span>
                  <a
                    className="font-semibold text-white hover:text-indigo-200"
                    href="https://www.karimhammouche.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    karimhammouche.com
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
