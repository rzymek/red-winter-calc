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

export function App() {
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', justifyContent: 'center', gap: '1.6mm', flexWrap: 'wrap'}}>
            <Button/>
            <Button/>
            <Button/>
            <Button/>
            <Button/>
            <Button/>
            <Button/>
            <Button/>
            <Button/>
        </div>
        <div style={{display: 'flex', flex: 1}}>
            <SideColumn>
                <Button/>
                <Button/>
                <Button/>
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


