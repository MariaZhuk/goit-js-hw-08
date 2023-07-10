import Player from '@vimeo/player'; // 

const frame = document.querySelector('iframe');
const player = new Player(frame);
const STORAGE_KEY = "videoplayer-current-time";

player.on('timeupdate', function ({ seconds }) { 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seconds)); //
});

const LS = localStorage.getItem(STORAGE_KEY)

    
player.setCurrentTime(LS).then(function (seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});