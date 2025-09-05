import { useState } from "react";
import { Music2, ExternalLink, Headphones, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpotify } from "@/hooks/useSpotify";

interface SpotifyWidgetProps {
  className?: string;
  showDetails?: boolean;
}

export default function SpotifyWidget({
  className = "",
  showDetails = true,
}: SpotifyWidgetProps) {
  const { track, isLoading, error } = useSpotify(30000); // Update every 30 seconds
  const [showTooltip, setShowTooltip] = useState(false);

  if (isLoading) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`group relative bg-gradient-to-br from-black to-slate-950 rounded-full shadow-lg border border-slate-700 transition-all hover:scale-105 hover:shadow-xl ${className}`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5">
          <Music2 className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-xs font-medium">Loading...</span>
        </div>
      </motion.div>
    );
  }

  if (
    !track ||
    track.name === "Failed to load track" ||
    track.name === "Network error"
  ) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`group relative bg-gradient-to-br from-black to-slate-950 rounded-full shadow-lg border border-slate-700 transition-all hover:scale-105 ${className}`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5">
          <Headphones className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-xs font-medium">
            {error ? "Connection error" : "No music"}
          </span>
        </div>
      </motion.div>
    );
  }

  const handleClick = () => {
    if (track.url) {
      window.open(track.url, "_blank", "noopener,noreferrer");
    }
  };

  const isValidTrack =
    track.name !== "No track available" &&
    track.name !== "Failed to load track";

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative ${
        isValidTrack ? "cursor-pointer" : "cursor-default"
      } ${className}`}
      // onClick={isValidTrack ? handleClick : undefined}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Main widget with album art as circular icon */}
      <div className="relative bg-gradient-to-br from-black to-slate-950 rounded-full shadow-lg border border-slate-700 transition-all group-hover:border-purple-300/50 group-hover:shadow-xl flex items-center px-2 py-2">
        <motion.div
          className="w-10 h-10 rounded-full overflow-hidden border border-slate-600 bg-black flex items-center justify-center mr-2"
          animate={track.isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={
            track.isPlaying
              ? { repeat: Infinity, duration: 4, ease: "linear" }
              : { duration: 0.2 }
          }
          style={{ minWidth: 40, minHeight: 40 }}
        >
          {track.albumArt ? (
            <img
              src={track.albumArt}
              alt="Album Art"
              className="w-full h-full object-cover"
            />
          ) : (
            <Music className="w-6 h-6 text-slate-400" />
          )}
        </motion.div>

        <div className="text-blue-100 text-xs font-medium max-w-[120px] truncate font-inter me-2">
          {track.name}
        </div>

        {/* Subtle pulse effect for currently playing */}
        {track.isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200/10 to-purple-300/10"
            animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.05, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200/10 to-purple-300/10 blur-lg opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Enhanced Tooltip with theme consistency */}
      <AnimatePresence>
        {showTooltip && showDetails && isValidTrack && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute bottom-full mb-3 ml-4 bg-gradient-to-br from-slate-950 to-slate-900 rounded-2xl shadow-2xl border border-slate-600 w-80 p-4 z-50 backdrop-blur-xl"
          >
            {/* Fixed tooltip arrow */}
            <div className="absolute top-full left-4 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-slate-600" />

            <div className="flex items-start gap-4">
              {/* Album art with loading state */}
              {track.albumArt && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative flex-shrink-0"
                >
                  <img
                    src={track.albumArt}
                    alt={`${track.name} album art`}
                    className="w-24 h-24 rounded-lg object-cover shadow-lg border border-slate-600"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  {/* Subtle glow effect on album art */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-200/5 to-pink-200/5" />
                </motion.div>
              )}

              <div className="flex-grow min-w-0">
                {/* Status indicator with icon */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 text-purple-300 text-xs font-medium mb-2"
                >
                  <Music className="w-3 h-3" />
                  {track.isPlaying ? "Now Playing" : "Recently Played"}
                </motion.div>

                {/* Track name with better spacing */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-blue-200 text-sm font-semibold mb-2 line-clamp-2 font-poppins"
                  title={track.name}
                >
                  {track.name}
                </motion.div>

                {/* Artist with subtle styling */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-500 text-xs mb-3 line-clamp-1 font-poppins"
                  title={track.artist}
                >
                  {track.artist}
                </motion.div>

                {/* Call to action with home theme colors */}
                {track.url && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 text-blue-300 text-xs group/cta hover:text-pink-200 transition-colors cursor-pointer"
                    onClick={handleClick}
                  >
                    <ExternalLink className="w-3 h-3 group-hover/cta:scale-110 transition-transform" />
                    <span className="font-medium">Open in Spotify</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
