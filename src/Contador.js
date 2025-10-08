
import { useState } from "react";
import Button from "./Boton";

function Contador() {
    const [valorActual, setValorActual] = useState("0");
    const [operador, setOperador] = useState(null);
    const [acumulado, setAcumulado] = useState(null);
    const [esperandoNuevoNumero, setEsperandoNuevoNumero] = useState(false);

    const limpiar = () => {
        setValorActual("0");
        setOperador(null);
        setAcumulado(null);
        setEsperandoNuevoNumero(false);
    };

    const borrar = () => {
        if (valorActual.length > 1) {
            setValorActual(valorActual.slice(0, -1));
        } else {
            setValorActual("0");
        }
    };

    const agregarNumero = (num) => {
        if (esperandoNuevoNumero) {
            setValorActual(num);
            setEsperandoNuevoNumero(false);
        } else {
            setValorActual(valorActual === "0" && num !== "." ? num : valorActual + num);
        }
    };

    const manejarOperador = (op) => {
        if (operador && !esperandoNuevoNumero) {
            const resultado = calcular(acumulado, valorActual, operador);
            setAcumulado(resultado);
            setValorActual(String(resultado));
        } else {
            setAcumulado(Number(valorActual));
        }
        setOperador(op);
        setEsperandoNuevoNumero(true);
    };

    const calcular = (a, b, op) => {
        const x = Number(a);
        const y = Number(b);
        switch (op) {
            case "+": return x + y;
            case "-": return x - y;
            case "*": return x * y;
            case "/": return y !== 0 ? x / y : "Error";
            case "%": return x % y;
            default: return y;
        }
    };

    const total = () => {
        if (operador && acumulado !== null) {
            const resultado = calcular(acumulado, valorActual, operador);
            setValorActual(String(resultado));
            setAcumulado(null);
            setOperador(null);
            setEsperandoNuevoNumero(true);
        }
    };

    const incrementar = () => {
        setValorActual(String(Number(valorActual) + 1));
    };

    return (
        <div id="contador">
            <label>Contador: {valorActual}</label>
            <Button className="operador" onClick={limpiar}>AC</Button>
            <Button className="operador" onClick={borrar}>C</Button>
            <Button className="operador" onClick={() => manejarOperador("%")}>%</Button>
            <Button className="operador" onClick={() => manejarOperador("/")}>/</Button>
            <Button onClick={() => agregarNumero("7")}>7</Button>
            <Button onClick={() => agregarNumero("8")}>8</Button>
            <Button onClick={() => agregarNumero("9")}>9</Button>
            <Button className="operador" onClick={() => manejarOperador("*")}>*</Button>
            <Button onClick={() => agregarNumero("4")}>4</Button>
            <Button onClick={() => agregarNumero("5")}>5</Button>
            <Button onClick={() => agregarNumero("6")}>6</Button>
            <Button className="operador" onClick={() => manejarOperador("-")}>-</Button>
            <Button onClick={() => agregarNumero("1")}>1</Button>
            <Button onClick={() => agregarNumero("2")}>2</Button>
            <Button onClick={() => agregarNumero("3")}>3</Button>
            <Button className="operador" onClick={() => manejarOperador("+")}>+</Button>
            <Button onClick={incrementar}>Incrementar</Button>
            <Button onClick={() => agregarNumero("0")}>0</Button>
            <Button onClick={() => agregarNumero(".")}>.</Button>
            <Button className="total" onClick={total}>=</Button>
        </div>
    );
}

export default Contador;