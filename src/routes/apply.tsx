import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState, useRef, useCallback } from "react";
import { ArrowLeft, Upload, X, Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/apply")({
  component: Apply,
  head: () => ({
    meta: [
      { title: "Apply — AI Nova Club" },
      { name: "description", content: "Apply to join AI Nova Club. Fill out our application form and upload your page insights." },
    ],
  }),
});

// EmailJS config - you'll need to replace these with your actual values
const EMAILJS_SERVICE_ID = "service_default";
const EMAILJS_TEMPLATE_ID = "template_default";
const EMAILJS_PUBLIC_KEY = "your_public_key";

function Apply() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    instagram: "",
    email: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const imageFiles = selectedFiles.filter(file => file.type.startsWith("image/"));
    if (imageFiles.length + files.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }
    setFiles(prev => [...prev, ...imageFiles].slice(0, 5));
    setError("");
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.instagram.trim() || !formData.email.trim()) {
      setError("Please fill in all fields");
      return;
    }
    
    if (files.length === 0) {
      setError("Please upload at least one screenshot of your page insights");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Convert files to base64 for email attachment
      const filePromises = files.map(file => {
        return new Promise<{ name: string; data: string }>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              name: file.name,
              data: reader.result as string,
            });
          };
          reader.readAsDataURL(file);
        });
      });

      const fileAttachments = await Promise.all(filePromises);

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        instagram_handle: formData.instagram.startsWith("@") ? formData.instagram : `@${formData.instagram}`,
        reply_to: formData.email,
        message: `New AI Nova Club Application\n\nName: ${formData.name}\nInstagram: ${formData.instagram.startsWith("@") ? formData.instagram : `@${formData.instagram}`}\nEmail: ${formData.email}\n\nFiles attached: ${files.length} image(s)`,
        attachments: fileAttachments.map(f => f.name).join(", "),
      };

      // Send email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Success - redirect to thank you page
      navigate({ to: "/thank-you" });
    } catch (err) {
      console.error("Failed to send application:", err);
      setError("Failed to submit application. Please try again or contact us on Instagram.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/[0.06] blur-[100px] animate-float-slow will-change-transform" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[50%] h-[50%] rounded-full bg-white/[0.05] blur-[80px] animate-float-slow-reverse will-change-transform" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-white/[0.04] blur-[60px] animate-float-medium will-change-transform" />
        <div className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-white/30 animate-twinkle will-change-opacity" />
        <div className="absolute top-[70%] left-[25%] w-1 h-1 rounded-full bg-white/25 animate-twinkle will-change-opacity" style={{ animationDelay: "2s" }} />
        <div className="absolute left-[50%] top-0 w-px h-full bg-gradient-to-b from-transparent via-white/[0.02] to-transparent animate-line-drift will-change-transform" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-6 sm:px-10 py-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </a>
        </header>

        {/* Main Form */}
        <main className="flex-1 flex items-center justify-center px-6 sm:px-10 py-12">
          <div className="w-full max-w-xl">
            {/* Header Text */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 mb-6">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-sm text-white/60 tracking-wide">Join the Elite Network</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                Apply to AI Nova Club
              </h1>
              <p className="text-white/50 text-lg">
                Fill out your details and upload your page insights
              </p>
            </div>

            {/* Form Card */}
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl space-y-6"
              style={{ contain: "layout style paint" }}
            >
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white/80">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-300"
                  required
                />
              </div>

              {/* Instagram Input */}
              <div className="space-y-2">
                <label htmlFor="instagram" className="text-sm font-medium text-white/80">
                  Instagram Handle
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 text-lg">@</span>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="yourhandle"
                    className="w-full pl-10 pr-5 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/80">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-300"
                  required
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">
                  Page Insights Screenshots
                </label>
                <div
                  onClick={triggerFileInput}
                  className="w-full p-6 rounded-xl border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30 cursor-pointer transition-all duration-300 text-center"
                >
                  <Upload className="w-8 h-8 mx-auto mb-3 text-white/40" />
                  <p className="text-white/60 text-sm mb-1">Click to upload screenshots</p>
                  <p className="text-white/30 text-xs">PNG, JPG up to 5 images</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* File Previews */}
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10 group"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-black font-semibold rounded-full text-base tracking-wide overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                      Submit Application
                      <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Note */}
            <p className="text-center text-white/30 text-sm mt-6">
              By applying, you agree to our terms and will be contacted via email or Instagram DM.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
