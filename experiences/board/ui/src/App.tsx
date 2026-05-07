import type { CSSProperties } from 'react';

type BoardLane = {
	name: string;
	accent: string;
	cards: Array<{
		title: string;
		detail: string;
	}>;
};

const lanes: BoardLane[] = [
	{
		name: 'Signal',
		accent: 'var(--lane-signal)',
		cards: [
			{
				title: 'Task health snapshot',
				detail: 'Fast board views are how Goose Squadron keeps planning honest.',
			},
			{
				title: 'Drag-and-drop next',
				detail: 'Interaction depth can grow without changing the build contract.',
			},
		],
	},
	{
		name: 'Flow',
		accent: 'var(--lane-flow)',
		cards: [
			{
				title: 'React + TypeScript',
				detail: 'Type-checked with rules_ts so editor and CI speak the same language.',
			},
			{
				title: 'esbuild browser artifact',
				detail: 'A small bundle target keeps the first UI example easy to inspect.',
			},
		],
	},
	{
		name: 'Launch',
		accent: 'var(--lane-launch)',
		cards: [
			{
				title: 'Bazel 9 first',
				detail: 'Everything new in the repo grows inside the module graph from day one.',
			},
			{
				title: 'Domain API ready',
				detail: 'The Ducks-owned Go API already exposes /v1/hello for integration smoke tests.',
			},
		],
	},
];

export function App() {
	return (
		<main className="app-shell">
			<section className="hero">
				<p className="eyebrow">Goose Squadron</p>
				<h1>Formation within chaos.</h1>
				<p className="lede">
					This starter board is intentionally small, but its shape is the point: a Bazel-native
					React surface that can grow alongside the Ducks&apos; Go APIs without falling back to ad
					hoc tooling.
				</p>
			</section>

			<section className="board" aria-label="Example task board">
				{lanes.map((lane) => {
					const laneStyle = {
						['--lane-accent' as '--lane-accent']: lane.accent,
					} as CSSProperties;

					return (
						<article className="lane" key={lane.name} style={laneStyle}>
							<header className="lane-header">
								<h2>{lane.name}</h2>
							</header>

							<div className="lane-cards">
								{lane.cards.map((card) => (
									<section className="card" key={card.title}>
										<h3>{card.title}</h3>
										<p>{card.detail}</p>
									</section>
								))}
							</div>
						</article>
					);
				})}
			</section>
		</main>
	);
}
