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
