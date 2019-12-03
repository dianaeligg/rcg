

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

function sortEpisodes(a,b){
    return new Date(b["date-uploaded"]) - new Date(a["date-uploaded"]);
}

function fillEpisodes(episodes){
    for(var ep of episodes){
        let epDiv = $('<div>').addClass('episode');
        // epDiv.text(ep.name);
        let epImage = $('<div>').addClass('episode-image');
        epImage.append($('<img>').attr('src',ep.image));
        epDiv.append(epImage);

        let epBody = $('<div>').addClass('episode-body');
        let epTitle = $('<div>').addClass('episode-title');
        epTitle.append(ep.title);
        epBody.append(epTitle);
        let epSeasonInfo = $('<div>').addClass('episode-season-info');
        epSeasonInfo.append(`Season ${ep["season-number"]}, Episode ${ep["season-episode"]}`);
        epBody.append(epSeasonInfo);
        let epGuest = $('<div>').addClass('episode-guest');
        epGuest.append(`With Guest, ${ep.guest}`);
        epBody.append(epGuest);
        let epAdditionalInfo = $('<div>').addClass('episode-additional-info');
        let epRunTime = $('<span>').addClass('episode-run-time');
        epRunTime.append(`${ep.runtime} Minutes | `);
        epAdditionalInfo.append(epRunTime);
        let epUploadDate = $('<span>').addClass('episode-upload-date');
        let momDate = moment(ep["date-uploaded"]);
        epUploadDate.append(`${momDate.format("MMM Do, YYYY")}`);
        epAdditionalInfo.append(epUploadDate);
        epBody.append(epAdditionalInfo);
        epDiv.append(epBody);

        let epSocialMedia = $('<div>').addClass('episode-social-media');

        for(let [key, value] of Object.entries(ep["social-media"])){
            if (value){
                let a = $('<a>').attr('href', value).attr('target', '_blank');
                let f = key === 'podcast' ? 'fas' : 'fab';
                let i = $('<i>').addClass(`${f} fa-icon fa-${key}`);
                a.append(i);
                epSocialMedia.append(a);
            }
        }
        epDiv.append(epSocialMedia);
        $('.episode-list').append(epDiv);
    }
}

loadJSON('./js/episodes.json');