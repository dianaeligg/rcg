

function loadJSON(jsonName){
    let episodes = [];
    $.getJSON(jsonName, json => {
        episodes = json.episodes; 
        console.log(episodes);
        episodes = episodes.sort(sortEpisodes);
        console.log(episodes);
        fillEpisodes(episodes);
    });
}

function loadRSS(url){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.text())
    .then(contents => {
        var xmlDoc = $.parseXML( contents ); 

        var $xml = $(xmlDoc);

        var $items = $xml.find('item');
        var defImage = $xml.find('channel')[0];
        let episodes = [];
        console.log(defImage);
        for(let item of $items){            
            let it = {};
            it.title = item.children[0].innerHTML;
            it.guest = item.children[7].innerHTML;
            it.season_number = item.children[11].innerHTML;
            it.season_episode = item.children[12].innerHTML;
            it.runtime = item.children[10].innerHTML;
            it.date = moment(item.children[1].innerHTML.slice(5,16));
            it.image = $(item.children[15]).attr('href');
            // it.social = {
            //     "spotify": "https://open.spotify.com/episode/2bQgFjpHbGuZynDXK0bv4B",
            //     "youtube": "",
            //     "podcast": "https://www.podcastics.com/podcast/episode/dirty-kind-eyes-or-the-jack-johnson-of-rock-climbing-3279/",
            //     "apple": "https://podcasts.apple.com/fr/podcast/dirty-kind-eyes-or-the-jack-johnson-of-rock-climbing/id1480183858?i=1000450770323"
            // },
            // console.log(item.children[5].innerHTML)
            // it.player = "https://www.podcastics.com/player/light/87/17837/";
            it.player= `https://www.podcastics.com/player/light/87/${item.children[5].innerHTML}`;

            if (it.season_number !== 0 && it.season_episode !== 0) episodes.push(it);
        }
        fillEpisodes(episodes);
    })
    .catch((err) => console.log("Can’t access " + url + " response. Blocked by browser?" + err))
}



function sortEpisodes(a,b){
    return new Date(b["date-uploaded"]) - new Date(a["date-uploaded"]);
}

function fillEpisodes(episodes){
    console.log('ep', episodes);
    for(var ep of episodes){
        let epDiv = $('<div>').addClass('episode');
        // // epDiv.text(ep.name);
        let epImage = $('<div>').addClass('episode-image');
        epImage.append($('<img>').attr('src',ep.image));
        epDiv.append(epImage);

        let epBody = $('<div>').addClass('episode-body');
        let epTitle = $('<div>').addClass('episode-title');
        epTitle.append(ep.title);
        epBody.append(epTitle);
        let epSeasonInfo = $('<div>').addClass('episode-season-info');
        epSeasonInfo.append(`Season ${ep.season_number}, Episode ${ep.season_episode}`);
        epBody.append(epSeasonInfo);
        let epGuest = $('<div>').addClass('episode-guest');
        epGuest.append(ep.guest);
        epBody.append(epGuest);
        let epAdditionalInfo = $('<div>').addClass('episode-additional-info');
        let epRunTime = $('<span>').addClass('episode-run-time');
        epRunTime.append(`${ep.runtime} | `);
        epAdditionalInfo.append(epRunTime);
        let epUploadDate = $('<span>').addClass('episode-upload-date');
        epUploadDate.append(ep.date.format("MMM Do, YYYY"));
        epAdditionalInfo.append(epUploadDate);
        epBody.append(epAdditionalInfo);
        if (ep.player) epBody.append(`<iframe src="${ep.player}" frameborder="0" height="50" width="100%"></iframe>`);
        epDiv.append(epBody);

        // let epSocialMedia = $('<div>').addClass('episode-social-media');

        // for(let [key, value] of Object.entries(ep["social-media"])){
        //     if (value){
        //         let a = $('<a>').attr('href', value).attr('target', '_blank');
        //         let f = key === 'podcast' ? 'fas' : 'fab';
        //         let i = $('<i>').addClass(`${f} fa-icon fa-${key}`);
        //         a.append(i);
        //         epSocialMedia.append(a);
        //     }
        // }
        // epDiv.append(epSocialMedia);
        $('.episode-list').append(epDiv);
    }
}

// loadJSON('./js/episodes.json');
loadRSS('https://feeds.podcastics.com/podcastics/podcasts/rss/87_a4c5ba48589fed4bc0aa7515a6ca820d.rss');