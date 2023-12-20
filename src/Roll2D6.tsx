import {useEffect, useRef, useState} from "preact/compat";
import Dice from "react-dice-roll";
import {TValue} from "react-dice-roll/dist/_types";

type TDiceRef = {
    rollDice: (value?: TValue) => void;
};

export function Roll2D6(props: {
    disabled?: boolean,
    onRoll(result: [number, number]): void
}) {
    const [result, setResult] = useState<[number, number]>([undefined, undefined])
    const size = 64;
    const faceBg = '#ffffff'
    const d1 = useRef<TDiceRef>();
    const d2 = useRef<TDiceRef>();

    useEffect(() => {
        if (result.every(isFinite)) {
            props.onRoll(result);
        }
    }, [result]);

    function roll2D6() {
        if (props.disabled) {
            return;
        }
        props.onRoll([undefined, undefined]);
        setResult([undefined, undefined]);
        d1.current?.rollDice();
        setTimeout(() => d2.current?.rollDice(), 100);
    }

    return <div style={{
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
        position: 'relative',
        opacity: props.disabled ? 0.1 : 1,
    }}>
        <div>
            <Dice ref={d1 as any}
                  faceBg={faceBg}
                  triggers={[] as any}
                  onRoll={((v: TValue) => setResult(([, r]) => [v, r])) as any}
                  size={size}/>
        </div>
        <div>
            <Dice ref={d2 as any}
                  faceBg={faceBg}
                  triggers={[] as any}
                  onRoll={((v: TValue) => setResult(([r,]) => [r, v])) as any}
                  size={size}/>
        </div>
        <div style={{position: 'absolute', inset: 0, opacity: 0}}
             onClick={roll2D6}/>
    </div>
}