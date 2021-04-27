import React from 'react';
import { render } from '@testing-library/react-native';
import Buttons from './Buttons'

const getStyle = jest.fn();

describe('Buttons', () => {

    it('should render Buttons Snapshot', () => {
        const container = render(<Buttons />)
        expect(container).toMatchSnapshot();
    });

    it('should render Buttons with Text', () => {
        render(<Buttons style={getStyle()}/>)
        expect(getStyle).toHaveBeenCalled()
    });
});
