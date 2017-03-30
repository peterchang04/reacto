import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from './sideBar';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<SideBar options={[1,2,3]} />, div);
});

/*
it('renders correctly', () => {
	const tree = renderer.create(
		<SideBar options={[1,2,3]} />
	).toJSON();
	// using toMatchSnapshot() creates the __snapshots__ folder and an initial snapshot 
	// subsequent runs of test will compare against that snapshot. Delete the snapshot file to regenerate
	expect(tree).toMatchSnapshot();
});
*/