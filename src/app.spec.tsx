import {describe, expect, it} from "vitest";
import {render} from '@testing-library/preact';
import {App} from './app';

describe('app', () => {
    it('should render', () => {
        const {container} = render(<App/>);
        expect(container).toBeDefined();
    })
});