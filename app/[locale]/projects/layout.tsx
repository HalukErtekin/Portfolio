export default function ProjectsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 text-zinc-100">
			{children}
		</div>
	);
}
