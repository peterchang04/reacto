import React from 'react';
import ReactDOM from 'react-dom';
import View from './view';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<View />, div);
});

it('renders correctly', () => {
	const tree = renderer.create(
		<View />
	).toJSON();
	/* using toMatchSnapshot() creates the __snapshots__ folder and an initial snapshot */
	/* subsequent runs of test will compare against that snapshot. Delete the snapshot file to regenerate */
	expect(tree).toMatchSnapshot();
});
