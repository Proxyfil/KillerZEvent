async function init() {
    let data = await (await fetch(`./data/streamer_data.json`)).text()
    data = JSON.parse(data.toString())

    let streamers = document.getElementById("container")

    let best_killer = 1

    data.forEach(streamer_data => {
        if(parseInt(streamer_data.kill_count) > best_killer) {
            best_killer = parseInt(streamer_data.kill_count)
        }
    })

    data.forEach(streamer_data => {
        if(streamer_data.status == "alive"){
            streamers.innerHTML += `
            <div class="streamer-container">
                <div class="streamer-header">
                    <a href="${streamer_data.channel}" target="_blank" class="streamer-name">${streamer_data.name}</a>
                </div>
                <div class="streamer-content">
                    <table class="streamer-table">
                        <tr>
                            <td class="status alive">Statut : Vivant(e) 💚</td>
                        </tr>
                        <tr>
                            <td class="kill-count"><div><span class="green">Nombre de kills :</span> ${streamer_data.kill_count}</div>${streamer_data.kill_count == best_killer ? `<img class="best-killer-icon" src="https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/1024px/1f451.png" width="16px" height="16px">` : "" }</td>
                        </tr>
                    </table>
                </div>
            </div>
            `
        }
        else if(streamer_data.status == "dead"){
            streamers.innerHTML += `
            <div class="streamer-container">
                <div class="streamer-header">
                    <a href="${streamer_data.channel}" target="_blank" class="streamer-name">${streamer_data.name}</a>
                </div>
                <div class="streamer-content">
                    <table class="streamer-table isdead">
                        <tr>
                            <td class="status dead">Statut : Mort(e) 💔</td>
                        </tr>
                        <tr>
                            <td class="killer"><p style="margin: 0;"><span class="green">Tué(e) par :</span> ${streamer_data.killer}</p><a role="link" ${streamer_data.link == "" ? "aria-disabled='true'" : `target='_blank' href="${streamer_data.link}"`}><img class="clip-icon" src="https://m.media-amazon.com/images/I/21kRx-CJsUL.png" style="${streamer_data.link == "" ? "filter: grayscale(1);" : ""}" width="24px"></a></td>
                        </tr>
                        <tr>
                            <td class="kill-method"><span class="green">Manière de tuer :</span> ${streamer_data.method}</td>
                        </tr>
                        <tr>
                            <td class="kill-count"><div><span class="green">Nombre de kills :</span> ${streamer_data.kill_count}</div>${streamer_data.kill_count == best_killer ? `<img class="best-killer-icon" src="https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/1024px/1f451.png" width="16px" height="16px">` : "" }</td>
                        </tr>
                    </table>
                </div>
            </div>
            `
        }
    });
}

init()