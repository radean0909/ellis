import lame from 'lame';
import Speaker from 'speaker';
import request from 'request';
import volume from 'node-mpg123-util';

export default () => { 

  const decoder = new lame.Decoder();

  decoder.on('format', () => {
    volume.setVolume(decoder.mh,.3);
  });

  request.get('http://meditationroom.org/free-nature-sounds/summer-rain-audio/summer-rain.mp3')
    .pipe(decoder)
    .pipe(new Speaker())
    .on('finish', function () {
      console.log('done');
    });
}