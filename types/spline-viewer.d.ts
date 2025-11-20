import type * as React from "react";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"spline-viewer": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				url: string;
				"loading-anim-type"?: string;
				"mouse-events"?: string;
				hint?: string;
				logo?: string;
			};
		}
	}
}

export {};

