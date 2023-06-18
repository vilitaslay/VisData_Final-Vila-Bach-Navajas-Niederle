d3.csv("./datos/bjork.csv", d3.autoType).then(data => {
    let chart = Plot.plot({
        width: 1000,
        height: 500,
        marginLeft: 120,
        insetLeft: 60,
        marginBottom: 60,
        marks : [
            Plot.dot(data, {
                x: d => d.popularity/100,
                y: 'album',
                fill: "album",
                r: 5,
            }),
        ],
        x : {
            label: "popularidad",
            
        },
        style : {
            background: '#121212',
            fontSize: 16,
        },
    })
d3.select('#chart').append(() => chart)
})

