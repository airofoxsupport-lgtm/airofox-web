"use client";
import React, { useRef, useState, useCallback, useMemo } from "react";
import { detailedServices } from "@/lib/servicesPricing";

interface AIResult {
  subcategory: string | null;
  service: string | null;
  variant: string | null;
  confidence: number;
}

interface ImageUploadModalProps {
  categoryId: string;
  categoryName: string;
  onClose: () => void;
  /** Called with the matched subcategory name so the parent can pre-filter the pricing table */
  onResult: (subcategory: string | null, result: AIResult) => void;
}

const CONFIDENCE_THRESHOLD = 0.55;

export default function ImageUploadModal({
  categoryId,
  categoryName,
  onClose,
  onResult,
}: ImageUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<AIResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setErrorMsg("Please upload an image file.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setErrorMsg("Image must be smaller than 10 MB.");
      return;
    }
    setErrorMsg("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStatus("idle");
    setResult(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleAnalyze = async () => {
    if (!file) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("categoryId", categoryId);

      const res = await fetch("/api/identify-service", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      const aiResult: AIResult = data.result;
      setResult(aiResult);

      if (!aiResult.service || aiResult.confidence < CONFIDENCE_THRESHOLD) {
        setStatus("error");
        setErrorMsg(
          "We couldn't confidently identify a matching service in our catalog. Please try a clearer photo, or browse subcategories manually."
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  const handleConfirm = () => {
    if (result) {
      onResult(result.subcategory, result);
    }
  };

  const isHighConfidence = result && result.confidence >= CONFIDENCE_THRESHOLD;

  const matchedPrice = useMemo(() => {
    if (!result || !result.subcategory || !result.service) return null;
    const cat = detailedServices.find((c) => c.id === categoryId);
    if (!cat) return null;
    const sub = cat.subcategories.find((s) => s.name === result.subcategory);
    if (!sub) return null;
    const srv = sub.services.find((s) => s.name === result.service);
    if (!srv) return null;

    if (result.variant) {
      const v = srv.variants.find((v) => v.name === result.variant);
      if (v) return v.price;
    } else if (srv.variants && srv.variants.length > 0) {
      return srv.variants[0].price;
    }
    return null;
  }, [result, categoryId]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-navy/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🤖</span>
              <h2 className="text-xl font-black text-brand-navy">AI Identify</h2>
            </div>
            <p className="text-sm text-brand-slate">
              Upload a photo and we'll find the right service for your{" "}
              <span className="font-semibold text-brand-orange">{categoryName}</span> issue.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors ml-4 flex-shrink-0"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 min-h-[200px] overflow-hidden
              ${isDragging ? "border-brand-orange bg-orange-50 scale-[1.01]" : "border-slate-300 bg-slate-50 hover:border-brand-orange hover:bg-orange-50/50"}
            `}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain max-h-[240px] rounded-xl"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <div>
                  <p className="font-semibold text-brand-navy">
                    Drag & drop or{" "}
                    <span className="text-brand-orange underline underline-offset-2">browse</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP up to 10 MB</p>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
            />
            {/* Hidden camera input specifically for mobile */}
            <input
              id="camera-input"
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleInputChange}
            />
          </div>

          {!preview && status !== "loading" && (
            <div className="flex justify-center -mt-2 mb-2">
              <button
                onClick={() => document.getElementById('camera-input')?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-full text-sm font-semibold transition-colors border border-slate-200 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                Take Photo
              </button>
            </div>
          )}

          {/* Change photo hint */}
          {preview && status !== "loading" && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-brand-slate hover:text-brand-orange transition-colors underline underline-offset-2"
            >
              Change photo
            </button>
          )}

          {/* Error message */}
          {errorMsg && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p className="text-sm text-red-700">{errorMsg}</p>
            </div>
          )}

          {/* Success result card */}
          {status === "success" && result && isHighConfidence && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">✅</span>
                <p className="font-bold text-green-800 text-sm">Object Identified!</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white rounded-xl p-3 border border-green-100 flex flex-col">
                  <p className="text-xs text-slate-500 mb-1">Detected Service</p>
                  <p className="font-bold text-brand-navy flex-1">{result.service}</p>
                </div>
                
                {result.variant ? (
                  <div className="bg-white rounded-xl p-3 border border-green-100 flex flex-col">
                    <p className="text-xs text-slate-500 mb-1">Variant</p>
                    <p className="font-bold text-brand-navy flex-1">{result.variant}</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl p-3 border border-green-100 flex flex-col">
                    <p className="text-xs text-slate-500 mb-1">Subcategory</p>
                    <p className="font-bold text-brand-navy flex-1">{result.subcategory}</p>
                  </div>
                )}
                
                {matchedPrice !== null && (
                  <div className="bg-white rounded-xl p-3 border border-green-100 col-span-full flex items-center justify-between">
                    <p className="font-semibold text-brand-navy">Estimated Price</p>
                    <p className="font-black text-brand-orange text-lg">₹{matchedPrice}</p>
                  </div>
                )}
              </div>
              {result.subcategory && (
                <p className="text-xs text-green-700 font-medium">
                  → Will show services under:{" "}
                  <span className="font-bold">{result.subcategory}</span>
                </p>
              )}
            </div>
          )}

          {/* Loading indicator */}
          {status === "loading" && (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="w-10 h-10 border-4 border-brand-orange/20 border-t-brand-orange rounded-full animate-spin" />
              <p className="text-sm text-brand-slate font-medium">Analyzing...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-white flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-brand-slate hover:text-brand-navy hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>

          {status === "success" && isHighConfidence ? (
            <button
              onClick={handleConfirm}
              className="px-6 py-2.5 text-sm font-bold bg-brand-orange text-white rounded-xl hover:bg-brand-orange/90 transition-colors shadow-md hover:-translate-y-0.5 transition-transform duration-200"
            >
              View Matched Services →
            </button>
          ) : (
            <button
              onClick={handleAnalyze}
              disabled={!file || status === "loading"}
              className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 shadow-md
                ${file && status !== "loading"
                  ? "bg-brand-orange text-white hover:bg-brand-orange/90 hover:-translate-y-0.5"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
            >
              {status === "loading" ? "Analyzing…" : "Identify Object"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
