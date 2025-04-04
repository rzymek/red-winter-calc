import {render} from 'preact'
import {MainLayout} from './redwinter/ui/mainLayout.tsx'
import './index.css'

const app = document.getElementById('app');

export function rerender() {
    app && render(<MainLayout/>, app)
}

rerender();