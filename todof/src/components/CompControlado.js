import React, { useState } from 'react';
export default function CompControlado() {

    const [titulo, setNome] = useState("titulo inicial");

    function leNome(evento) {
    setNome.Nome(evento.target.value)
}

function exibeTitulo() {
    alert(titulo)
}

return (
<div style={{ fontFamily: 'Verdana' }}>

<h1>Exemplo Componente Controlado</h1>
<label>

Nome:
<input type="text" value={titulo} onChange={leTitulo} />
<button onClick={exibeTitulo}>Exibe</button>
</label>
</div>
)
}