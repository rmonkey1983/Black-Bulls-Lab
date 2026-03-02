export function CinematicOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-50 h-screen w-full">
            {/* Hex Grid Pattern */}
            <div className="absolute inset-0 hex-grid-bg opacity-30" />

            {/* Scan Lines */}
            <div className="absolute inset-0 opacity-[0.015]"
                style={{
                    background: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0, 255, 136, 0.4) 2px,
                        rgba(0, 255, 136, 0.4) 4px
                    )`
                }}
            />

            {/* Corner Brackets — Top Left */}
            <div className="absolute top-4 left-4">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-green/20">
                    <path d="M0 20 L0 0 L20 0" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
            </div>

            {/* Corner Brackets — Top Right */}
            <div className="absolute top-4 right-4">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-green/20">
                    <path d="M20 0 L40 0 L40 20" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
            </div>

            {/* Corner Brackets — Bottom Left */}
            <div className="absolute bottom-4 left-4">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-green/20">
                    <path d="M0 20 L0 40 L20 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
            </div>

            {/* Corner Brackets — Bottom Right */}
            <div className="absolute bottom-4 right-4">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-green/20">
                    <path d="M20 40 L40 40 L40 20" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
            </div>

            {/* Vignette with green tinge */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 15, 8, 0.5) 100%)',
                }}
            />
        </div>
    );
}
