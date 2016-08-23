import lame from 'lame';
import Speaker from 'speaker';
import request from 'request';
import volume from 'node-mpg123-util';
import feed from 'feed-read';
import { parseString } from 'xml2js';
import _ from 'underscore';

let rain = null;
let news = null;
let decoder = new lame.Decoder();
let speaker = new Speaker();

export function startRain() { 

  decoder.on('format', () => {
    volume.setVolume(decoder.mh,.3);
  });

  rain = request.get('http://meditationroom.org/free-nature-sounds/summer-rain-audio/summer-rain.mp3');
  rain.pipe(decoder)
    .pipe(speaker)
    .on('finish', function () {
      console.log('done');
    });
}

export function stopRain() {
  if (rain) {
    rain.end();
    decoder.end();
    decoder = new lame.Decoder();
    rain = null;
    speaker = new Speaker();
  }
}

export function startNews() {
  let options = {};
  request('http://www.npr.org/rss/podcast.php?id=500005',(err, out) => {
    
    parseString(out.body, (err, res) => {
      let url = res.rss.channel[0].item[0].enclosure[0]['$'].url;

      decoder.on('format', () => {
        volume.setVolume(decoder.mh,.7);
      });

      news = request.get(url);
      news.pipe(decoder).pipe(speaker);
    })
  }) 
}

export function stopNews() {
  if (news) {
    news.end();
    decoder.end();
    decoder = new lame.Decoder();
    news = null;
    speaker = new Speaker();
  }
}

export function pauseNews() {
  if (news && decoder && speaker) {
    speaker.cork();
  }
}

export function resumeNews() {
  if (news && decoder && speaker) {
    speaker.uncork();
  }
}