"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { navigation, type NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";

function filterItems(query: string): NavItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return navigation;
  return navigation.filter((item) => {
    const hay = [item.label, item.id, ...(item.keywords ?? [])]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const items = useMemo(() => filterItems(query), [query]);

  // Keep highlight in range when filter shrinks (derived, not effect-setState)
  const safeIndex = Math.min(index, Math.max(items.length - 1, 0));

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
    prevFocus.current?.focus?.();
  }, []);

  const go = useCallback(
    (item: NavItem) => {
      close();
      if (item.href.startsWith("/#")) {
        const id = item.href.slice(2);
        if (window.location.pathname !== "/") {
          router.push(item.href);
          return;
        }
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", item.href);
        } else {
          router.push(item.href);
        }
      } else {
        router.push(item.href);
      }
    },
    [close, router],
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (!v) {
            prevFocus.current = document.activeElement as HTMLElement | null;
          }
          return !v;
        });
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = requestAnimationFrame(() => inputRef.current?.focus());

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, Math.max(items.length - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && items[safeIndex]) {
        e.preventDefault();
        go(items[safeIndex]);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(t);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, items, safeIndex, close, go]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]">
      <button
        type="button"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        aria-label="Close command palette"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        className="surface-matte relative z-[101] w-full max-w-md overflow-hidden rounded-xl shadow-lg"
      >
        <h2 id="command-palette-title" className="sr-only">
          Jump to section
        </h2>
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            placeholder="Jump to…"
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-autocomplete="list"
            aria-controls="command-palette-list"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            Esc
          </kbd>
        </div>
        <ul
          id="command-palette-list"
          role="listbox"
          className="max-h-72 overflow-y-auto p-1.5"
        >
          {items.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              No matches
            </li>
          ) : (
            items.map((item, i) => (
              <li key={item.id} role="option" aria-selected={i === safeIndex}>
                <button
                  type="button"
                  onClick={() => go(item)}
                  onMouseEnter={() => setIndex(i)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    i === safeIndex
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <span className="font-medium text-foreground">{item.label}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {item.href}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
