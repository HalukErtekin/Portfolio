"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
	interface Window {
		__splineViewerLoaded?: boolean;
	}
}

type HeroSplineProps = {
	className?: string;
	scene?: string;
};

const SPLINE_SCRIPT_SRC =
	"https://unpkg.com/@splinetool/viewer@1.11.9/build/spline-viewer.js";
const DEFAULT_SCENE =
	"https://prod.spline.design/4ncgcjig7lKtPhyA/scene.splinecode";

export default function HeroSpline({
	className = "",
	scene = DEFAULT_SCENE,
}: HeroSplineProps) {
	const [viewerReady, setViewerReady] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		if (window.__splineViewerLoaded) {
			setViewerReady(true);
		}
	}, []);

	const handleScriptReady = () => {
		if (typeof window !== "undefined") {
			window.__splineViewerLoaded = true;
		}
		setViewerReady(true);
	};

	return (
		<>
			<Script
				id="spline-viewer-script"
				type="module"
				src={SPLINE_SCRIPT_SRC}
				strategy="afterInteractive"
				onLoad={handleScriptReady}
				onReady={handleScriptReady}
			/>
			{viewerReady && (
				<div className={`select-none ${className}`}>
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
