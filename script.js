let antallSverd = 0;

function kjop(sverdNavn) {
    antallSverd = antallSverd + 1;
    document.getElementById("antall").innerText = antallSverd;

    // Raspberrypi notifikasjon av kjøp
    fetch('/nytt-kjop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sverd: sverdNavn })
    });
}