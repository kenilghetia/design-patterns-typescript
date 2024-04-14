/**
 * The Target interface defines the domain-specific interface used by the client
 * code.
 */
interface MediaPlayer {
  play(audioType: string, fileName: string): void;
}

/**
 * The Adaptee contains some useful behavior, but its interface is incompatible
 * with the existing client code. The Adaptee needs some adaptation before the
 * client code can use it.
 */
class AdvancedMediaPlayer {
  playVlc(fileName: string): void {
    console.log(`Playing vlc file: ${fileName}`);
  }

  playMp4(fileName: string): void {
    console.log(`Playing mp4 file: ${fileName}`);
  }
}

/**
 * The Adapter makes the AdvancedMediaPlayer's interface compatible with the
 * MediaPlayer's interface.
 */
class MediaAdapter implements MediaPlayer {
  private advancedMusicPlayer: AdvancedMediaPlayer;

  constructor() {
    this.advancedMusicPlayer = new AdvancedMediaPlayer();
  }

  play(audioType: string, fileName: string): void {
    if (audioType === "vlc") {
      this.advancedMusicPlayer.playVlc(fileName);
    } else if (audioType === "mp4") {
      this.advancedMusicPlayer.playMp4(fileName);
    }
  }
}

/**
 * The client code supports all classes that follow the MediaPlayer interface.
 */
function clientCode(mediaPlayer: MediaPlayer) {
  mediaPlayer.play("vlc", "movie.vlc");
  mediaPlayer.play("mp4", "movie.mp4");
}

console.log("Client: I can work just fine with the MediaPlayer objects:");
const mediaPlayer: MediaPlayer = new MediaAdapter();
clientCode(mediaPlayer);
