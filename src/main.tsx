import { render } from 'preact'
import { MainLayout } from './redwinter/ui/mainLayout.tsx'
import './index.css'

const app = document.getElementById('app');

export function rerender() {
    console.log('rerender')
    render(<MainLayout/>, app!)
}
rerender();