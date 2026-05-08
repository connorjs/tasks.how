import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';

import { App } from './App';

function renderSubject(): ReactElement {
	return <App />;
}

describe('App', () => {
	it('shows the Goose Squadron board shell copy', () => {
		render(renderSubject());

		expect(screen.getByRole('heading', { level: 1, name: 'Formation within chaos.' })).toBeTruthy();
		expect(screen.getByText('Bazel 9 first')).toBeTruthy();
		expect(screen.getByText(/hermetic vite bundle/i)).toBeTruthy();
	});
});
