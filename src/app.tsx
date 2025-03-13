import './app.css'
import {HexagonBoard} from "./redwinter/HexagonBoard.tsx";
import {Button} from "./ui/Button.tsx";
import {ComponentChildren} from "preact";
import {SideColumn} from "./ui/SideColumn.tsx";

function CenterColumn(props: { children: ComponentChildren }) {
    return <div style={{flexGrow: 1, flexShrink: 0}}>
        {props.children}
    </div>
}


/**
 * Generates an array of numbers in a range using Array.from with a fixed step of 1.
 * @param start The starting value of the range (inclusive).
 * @param end The ending value of the range (exclusive).
 * @returns An array of numbers.
 */
function range(start: number, end: number): number[] {
    const length = Math.max(0, end - start + 1);
    return Array.from({length}, (_, i) => start + i);
}

const CSButtonStyles = {
    MG:{
        backgroundColor: 'black',
        color: 'white',
    },
    mortar:{
    },
    armor:{
        backgroundColor: '#c63026',
        color: 'white',
    }
} as const;
function CSButton(props:{children: number, type?:keyof typeof CSButtonStyles}) {
    return <Button style={props.type ? CSButtonStyles[props.type] : ({})}>
        {props.type==='mortar' && '('}
        {props.children}
        {props.type==='mortar' && ')'}
    </Button>
}

function Row(props: { children: ComponentChildren }) {
    return <div style={{display: 'flex', justifyContent: 'center', gap: '1.6mm', flexWrap: 'wrap'}}>
        {props.children}
    </div>
}
export function App() {
    return <div style={{display: 'flex', flexDirection: 'column', gap:'1.6mm'}}>
        <Row>
            {range(1,5).map(v => <CSButton>{v}</CSButton>)}
            {range(1,4).map(v => <CSButton type='MG'>{v}</CSButton>)}
        </Row>
        <Row>
            <CSButton type='mortar'>{1}</CSButton>
            {[5,7,8,10].map(v => <CSButton type='armor'>{v}</CSButton>)}
            <Button>⌫</Button>
            </Row>
        <div style={{display: 'flex', flex: 1}}>
            <SideColumn>
                <Button>\_/</Button>
                <Button>⬇</Button>
                <Button>🎖️</Button>
                <Button>💪</Button>
                <Button>💣🗡</Button>
                <Button>🔥</Button>
            </SideColumn>

            <CenterColumn>
                <HexagonBoard/>
            </CenterColumn>

            <SideColumn>
                <Button>)(</Button>
                <Button>🧊</Button>
                <Button>🌲</Button>
            </SideColumn>
        </div>
    </div>
}


