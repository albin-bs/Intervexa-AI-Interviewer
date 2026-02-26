import { useState } from "react";
import { m } from "framer-motion";
import { Upload, X, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ResumeUploadDialog({ isOpen, onClose, onSubmit }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only PDF and DOC/DOCX files are allowed");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 5MB");
      return false;
    }
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setUploading(true);
    try {
      // Simulate file upload (replace with actual upload logic)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Resume uploaded successfully!");
      setFile(null);
      onSubmit(file);
      onClose();
    } catch (error) {
      toast.error("Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md mx-4 rounded-2xl bg-[#0f1424] border border-slate-700/50 shadow-2xl overflow-hidden"
      >
        {/* Loading Overlay */}
        {uploading && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-[#0f1424]/95 backdrop-blur-sm"
          >
            {/* Spinning ring with icon */}
            <div className="relative w-20 h-20 mb-5">
              <div className="absolute inset-0 border-4 rounded-full border-slate-700" />
              <div className="absolute inset-0 border-4 border-transparent rounded-full border-t-blue-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
            </div>
            <p className="mb-1 text-lg font-bold text-white">Uploading Resume</p>
            <p className="mb-5 text-sm text-slate-400">Please wait a moment...</p>
            {/* Animated dots */}
            <div className="flex gap-2">
              {[0, 0.18, 0.36].map((delay, i) => (
                <m.div
                  key={i}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.75, repeat: Infinity, delay }}
                  className="w-2.5 h-2.5 rounded-full bg-blue-500"
                />
              ))}
            </div>
          </m.div>
        )}
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/30">
          <h2 className="text-xl font-bold text-white">Upload Your Resume</h2>
          <button
            onClick={onClose}
            disabled={uploading}
            className="p-1 transition rounded-lg hover:bg-slate-800 disabled:opacity-50"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* File Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-8 transition ${
              dragActive
                ? "border-blue-400 bg-blue-500/10"
                : "border-slate-600 bg-slate-900/20 hover:border-slate-500"
            }`}
          >
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />

            <div className="flex flex-col items-center justify-center gap-3 text-center pointer-events-none">
              {file ? (
                <>
                  <CheckCircle className="w-10 h-10 text-green-400" />
                  <p className="font-semibold text-white">{file.name}</p>
                  <p className="text-xs text-slate-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-slate-400" />
                  <div>
                    <p className="font-semibold text-white">
                      Drag & drop your resume here
                    </p>
                    <p className="text-sm text-slate-400">
                      or click to browse (PDF, DOC, DOCX)
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">Max 5MB</p>
                </>
              )}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">
              Additional Notes <span className="text-xs text-slate-500">(optional)</span>
            </label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any additional context about your experience, key highlights, or things you'd like the interviewer to know..."
              rows={3}
              disabled={uploading}
              className="w-full px-4 py-3 text-sm text-white border rounded-lg resize-none bg-slate-900/50 border-slate-600/50 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-700/30">
          <button
            onClick={onClose}
            disabled={uploading}
            className="flex-1 px-4 py-3 font-semibold transition rounded-lg text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!file || uploading}
            className="flex items-center justify-center flex-1 gap-2 px-4 py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-500/50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <span className="w-4 h-4 border-2 rounded-full animate-spin border-white/40 border-t-white" />
                Uploading...
              </>
            ) : (
              "Upload Resume"
            )}
          </button>
        </div>
      </m.div>
    </div>
  );
}
