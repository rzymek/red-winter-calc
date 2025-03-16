import {describe, expect, it} from "vitest";
import {render} from '@testing-library/preact';
import {MainLayout} from './redwinter/ui/mainLayout.tsx';

describe('app', () => {
    it('should render', () => {
        const {container} = render(<MainLayout/>);
        expect(container).toBeDefined();
    })
});