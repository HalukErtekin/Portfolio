"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type HeroSplineProps = {
	className?: string;
	scene?: string;
};

const SPLINE_SCRIPT_SRC =
	"https://unpkg.com/@splinetool/viewer@1.11.9/build/spline-viewer.js";
const DEFAULT_SCENE =
	"https://prod.spline.design/3Z4WBiarjpvTKQG4/scene.splinecode";

export default function HeroSpline({
	className = "",
	scene = DEFAULT_SCENE,
}: HeroSplineProps) {
	const [mounted, setMounted] = useState(false);
	const [viewerReady, setViewerReady] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleScriptReady = () => setViewerReady(true);

	if (!mounted) {
		return null;
	}

	return (
		<>
			<Script
				id="spline-viewer-script"
				type="module"
				src={SPLINE_SCRIPT_SRC}
				strategy="afterInteractive"
				onReady={handleScriptReady}
				onLoad={handleScriptReady}
			/>
			{viewerReady && (
				<div
					className={`pointer-events-auto absolute inset-y-[-20%] right-[-12%] w-[75vw] max-w-[860px] z-0 ${className}`}
				>
					<spline-viewer
						className="block w-full h-full"
						loading-anim-type="none"
						mouse-events="global"
						hint="none"
						logo="no"
						url={scene}
					/>
				</div>
			)}
		</>
	);
}
