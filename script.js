const TableroDeJuego = (() => {
    let tablero = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const obtenerTablero = () => tablero;

    const colocarMarca = (fila, columna, marca) => {
        if (tablero[fila][columna] === "") {
            tablero[fila][columna] = marca;
            return true;
        }
        return false;
    };

    const reiniciar = () => {
        tablero = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    };
    const actualizarInterfaz = () => {
        const tablero = TableroDeJuego.obtenerTablero();
        tableroElement.innerHTML = "";
        for (let fila = 0; fila < tablero.length; fila++) {
            for (let columna = 0; columna < tablero[fila].length; columna++) {
                const celdaElement = document.createElement("div");
                celdaElement.classList.add("celda");
                celdaElement.textContent = tablero[fila][columna];
                
               
                if (tablero[fila][columna] === "X") {
                    celdaElement.classList.add("X");
                } else if (tablero[fila][columna] === "O") {
                    celdaElement.classList.add("O");
                }
    
                celdaElement.addEventListener("click", () => manejarClick(fila, columna));
                tableroElement.appendChild(celdaElement);
            }
        }
    };
    

    const hayGanador = () => {
        const lineasGanadoras = [
            // Filas
            [tablero[0][0], tablero[0][1], tablero[0][2]],
            [tablero[1][0], tablero[1][1], tablero[1][2]],
            [tablero[2][0], tablero[2][1], tablero[2][2]],
            // Columnas
            [tablero[0][0], tablero[1][0], tablero[2][0]],
            [tablero[0][1], tablero[1][1], tablero[2][1]],
            [tablero[0][2], tablero[1][2], tablero[2][2]],
            // Diagonales
            [tablero[0][0], tablero[1][1], tablero[2][2]],
            [tablero[2][0], tablero[1][1], tablero[0][2]]
        ];

        for (let linea of lineasGanadoras) {
            if (linea.every(celda => celda === "X")) return "X";
            if (linea.every(celda => celda === "O")) return "O";
        }

        return tablero.flat().includes("") ? null : "Empate";
    };

    return { obtenerTablero, colocarMarca, reiniciar, hayGanador };
})();

const Jugador = (nombre, marca) => {
    return { nombre, marca };
};

const ControladorDeJuego = (() => {
    const jugador1 = Jugador("Jugador 1", "X");
    const jugador2 = Jugador("Jugador 2", "O");
    let jugadorActual = jugador1;

    const cambiarTurno = () => {
        jugadorActual = jugadorActual === jugador1 ? jugador2 : jugador1;
    };

    const jugarTurno = (fila, columna) => {
        if (TableroDeJuego.colocarMarca(fila, columna, jugadorActual.marca)) {
            const ganador = TableroDeJuego.hayGanador();
            if (ganador) {
                return `${ganador === "Empate" ? "Es un empate" : `${jugadorActual.nombre} ha ganado`}!`;
            }
            cambiarTurno();
            return null;
        } else {
            return "Ese lugar ya está ocupado. Elige otro.";
        }
    };

    const reiniciarJuego = () => {
        TableroDeJuego.reiniciar();
        jugadorActual = jugador1;
    };

    return { jugarTurno, reiniciarJuego, obtenerJugadorActual: () => jugadorActual.nombre };
})();
