"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface ExternalScrollProps {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
}

export function ExternalScroll({
  children,
  className,
  trackClassName,
}: ExternalScrollProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState(100);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [needsScroll, setNeedsScroll] = useState(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  const updateThumb = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    const { scrollHeight, clientHeight, scrollTop } = el;
    const canScroll = scrollHeight > clientHeight + 2;
    setNeedsScroll(canScroll);
    if (!canScroll) return;
    const ratio = clientHeight / scrollHeight;
    const h = Math.max(ratio * 100, 15);
    const maxScroll = scrollHeight - clientHeight;
    const trackTravel = 100 - h;
    const top = maxScroll > 0 ? (scrollTop / maxScroll) * trackTravel : 0;
    setThumbHeight(h);
    setThumbTop(top);
  }, []);

  useEffect(() => {
    updateThumb();
    const el = contentRef.current;
    if (!el) return;
    const obs = new ResizeObserver(updateThumb);
    obs.observe(el);
    return () => obs.disconnect();
  }, [updateThumb, children]);

  const handleScroll = useCallback(() => updateThumb(), [updateThumb]);

  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartScroll.current = contentRef.current?.scrollTop || 0;

    const onMove = (me: MouseEvent) => {
      const el = contentRef.current;
      const track = trackRef.current;
      if (!el || !track) return;
      const delta = me.clientY - dragStartY.current;
      const { scrollHeight, clientHeight } = el;
      const trackH = track.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      if (trackH <= 0 || maxScroll <= 0) return;
      el.scrollTop = dragStartScroll.current + delta * (maxScroll / trackH);
    };

    const onUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, []);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = contentRef.current;
      const track = trackRef.current;
      if (!el || !track) return;
      const rect = track.getBoundingClientRect();
      const pct = (e.clientY - rect.top) / rect.height;
      el.scrollTop = pct * (el.scrollHeight - el.clientHeight);
    },
    [],
  );

  return (
    <div className={cn("relative h-full", className)}>
      <div
        ref={contentRef}
        className="absolute inset-0 overflow-y-auto no-scrollbar"
        onScroll={handleScroll}
      >
        {children}
      </div>

      {needsScroll && (
        <div
          ref={trackRef}
          className={cn(
            "absolute right-0 top-0 bottom-0 w-1.5 rounded-full cursor-pointer z-10",
            trackClassName || "bg-white/3",
          )}
          onClick={handleTrackClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className={cn(
              "absolute left-0.5 w-1 rounded-full transition-colors duration-150",
              isDragging
                ? "bg-violet-400/70"
                : isHovering
                  ? "bg-white/20"
                  : "bg-white/10",
            )}
            style={{
              height: `${thumbHeight}%`,
              top: `${thumbTop}%`,
            }}
            onMouseDown={handleThumbMouseDown}
          />
        </div>
      )}
    </div>
  );
}
