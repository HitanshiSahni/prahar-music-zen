import { useState } from "react";
import { uploadZip, fetchRecommendation, Recommendation } from "../lib/apidirectory";

const moods = ["calm", "happy", "energetic", "sad"];

export default function PersonalizedPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mood, setMood] = useState(moods[0]);
  const [songCount, setSongCount] = useState<number>(8);
  const [loading, setLoading] = useState(false);
  
  const [playlist, setPlaylist] = useState<Recommendation[]>([]);
  const [isFallback, setIsFallback] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsFallback(false);
      setPlaylist([]); // Clear old state
      
      if (selectedFile && !isUploaded) {
        await uploadZip(selectedFile);
        setIsUploaded(true); 
      }
      
      const result = await fetchRecommendation(mood, songCount);
      console.log("Backend Response:", result);

      if (result.recommendations) {
        setPlaylist(result.recommendations);
      }
      
      // STRICT CHECK: Forces fallback text if backend flags it OR no local songs found
      const hasNoLocalSongs = result.recommendations && result.recommendations.every((song: Recommendation) => song.is_local === false);
      
      if (result.is_fallback === true || hasNoLocalSongs) {
        setIsFallback(true);
      }
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Make sure backend is running.");
      setIsUploaded(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsUploaded(false);
    }
  };

  return (
    <div className="p-6 md:p-12 text-gray-100 min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-tight drop-shadow-sm">
            Personalized Music
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl">
            Upload your library and let our audio engine curate the perfect playlist based on acoustic vibes and physical sound waves.
          </p>
        </div>

        {/* Controls Card */}
        <div className="bg-gray-800/50 p-6 md:p-8 rounded-2xl border border-gray-700/60 backdrop-blur-md shadow-2xl space-y-8 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* ZIP Upload */}
          <div className="flex flex-col gap-3 relative z-10">
              <label className="text-sm font-semibold text-gray-200 tracking-wide uppercase text-xs">
                1. Upload Audio Archive (.zip)
              </label>
              <div className="relative group">
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-400
                      file:mr-4 file:py-3 file:px-6
                      file:rounded-xl file:border-0
                      file:text-sm file:font-semibold
                      file:bg-cyan-500/10 file:text-cyan-400
                      hover:file:bg-cyan-500/20 file:transition-all
                      border border-gray-700 rounded-xl bg-gray-900/60 shadow-inner cursor-pointer"
                />
              </div>
              {isUploaded && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mt-1 animate-pulse">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  Library successfully uploaded & analyzed!
                </div>
              )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              {/* Mood Selection */}
              <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-200 mb-2 tracking-wide uppercase text-xs">2. Desired Mood</label>
                  <select
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                      className="w-full bg-gray-900 text-white border border-gray-700 px-5 py-3.5 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all capitalize appearance-none cursor-pointer shadow-inner"
                  >
                      {moods.map((m) => (
                      <option key={m} value={m}>{m}</option>
                      ))}
                  </select>
              </div>

              {/* Song count limiter */}
              <div className="w-full sm:w-36">
                  <label className="block text-sm font-semibold text-gray-200 mb-2 tracking-wide uppercase text-xs">3. Track Count</label>
                  <input
                      type="number"
                      min={1}
                      max={30}
                      value={songCount}
                      onChange={(e) => setSongCount(Number(e.target.value))}
                      className="w-full bg-gray-900 text-white border border-gray-700 px-5 py-3.5 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all shadow-inner"
                  />
              </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`relative z-10 w-full px-6 py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 shadow-xl overflow-hidden group
              ${loading 
                  ? "bg-gray-800 text-gray-400 border border-gray-700 cursor-wait shadow-none" 
                  : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border border-cyan-400/20 hover:shadow-cyan-500/25 hover:-translate-y-1"}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processing Audio Vibe...
              </span>
            ) : "Generate Playlist"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-900/40 border border-red-500/50 rounded-xl text-red-200 flex items-start gap-3 backdrop-blur-sm">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* ========================================= */}
        {/* GUARANTEED EXACT FALLBACK MESSAGE SECTION */}
        {/* ========================================= */}
        {isFallback && (
          <div className="mt-10 p-6 bg-yellow-900/20 border border-yellow-500/40 rounded-2xl text-yellow-300 font-medium text-center shadow-[0_0_30px_rgba(161,98,7,0.15)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <svg className="w-8 h-8 mx-auto mb-3 text-yellow-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="text-lg">
              songs not found according to the mood
            </p>
          </div>
        )}

        {/* Playlist Section */}
        {playlist.length > 0 && (
          <div className="mt-10 space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex items-center justify-between border-b border-gray-700/50 pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                  {isFallback ? "AI Suggested Playlist" : "Your Vibe Match"}
              </h2>
              <span className="text-sm text-cyan-300 font-bold px-4 py-1.5 bg-cyan-900/40 border border-cyan-500/20 rounded-full">
                {playlist.length} {playlist.length === 1 ? 'Track' : 'Tracks'}
              </span>
            </div>

            <div className="space-y-4">
              {playlist.map((song, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-gray-800/40 border border-gray-700/50 hover:border-cyan-500/40 hover:bg-gray-800/80 shadow-lg hover:shadow-cyan-900/20 transition-all duration-300 group backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-100 group-hover:text-cyan-400 transition-colors drop-shadow-sm">
                            {song.filename}
                          </h3>
                          <p className="text-sm text-gray-400 mt-2 leading-relaxed bg-gray-900/50 inline-block px-3 py-1.5 rounded-lg border border-gray-700/50">
                            {song.reason}
                          </p>
                      </div>
                  </div>

                  {song.is_local ? (
                    <audio 
                      controls 
                      className="w-full h-12 mt-2 rounded-lg outline-none [&::-webkit-media-controls-panel]:bg-gray-900 [&::-webkit-media-controls-current-time-display]:text-gray-300 [&::-webkit-media-controls-time-remaining-display]:text-gray-300" 
                      key={song.file_url}
                    >
                      <source
                        src={`http://127.0.0.1:8000${song.file_url}`}
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-900/20 border border-indigo-500/30 text-xs text-indigo-300 font-medium">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]"></span>
                      AI Suggestion (Not in local library)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
