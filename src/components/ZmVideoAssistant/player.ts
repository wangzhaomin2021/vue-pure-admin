import { ref, Ref, toRaw } from 'vue';

export interface VideoModuleType {
  id: string;
  title: string;
  video: string;
  // condition: string;
  // gift_id: string;
  // gift_name: string;
  // chat: string;
  // hot_key: number[];
  volume: number;
  // isTrigger: boolean;
  screen: 'full' | 'original';
  x: number;
  y: number;
}

export default class PlayerCtr {
  player: HTMLVideoElement;
  isPlaying: Ref<boolean>;
  videoConfig: Ref<VideoModuleType[]> | null;
  queue: string[];
  playingId: string | undefined;
  playingInfo: VideoModuleType | undefined;
  constructor(videoRef: HTMLVideoElement) {
    this.player = videoRef;
    this.setPlayerEvent();
    this.isPlaying = ref(false);
    this.queue = [];
    this.videoConfig = null;
  }

  // 借用dom的事件系统 on once emit
  on(type: string, cb: (...args: any[]) => void) {
    this.player.addEventListener(type, cb);
  }

  once(type: string, cb: (...args: any[]) => void) {
    this.player.addEventListener(type, cb, { once: true });
  }

  emit(type: string, data: any) {
    const e = new CustomEvent(type, { detail: data });
    this.player.dispatchEvent(e);
  }

  setPlayerEvent() {
    // 一个一个接着往下播 直到播完
    this.player.addEventListener('ended', () => {
      this.playQueue();
    });

    this.player.addEventListener('error', (err) => {
      console.error('error', err);
      this.playQueue();
    });
  }

  setVideoConfig(videoConfig: Ref<VideoModuleType[]>) {
    this.videoConfig = videoConfig;
  }

  setVolume(volume: number) {
    this.player.volume = volume / 100;
  }

  add(id: string) {
    this.queue.push(id);
    if (this.isPlaying.value) return;
    this.playQueue();
  }

  getUrlById(id: string) {
    return this.videoConfig?.value.find(vc => vc.id === id)?.video ?? 'none';
  }

  getVolumeById(id: string) {
    return this.videoConfig?.value.find(vc => vc.id === id)?.volume ?? 100;
  }

  getModeById(id: string) {
    return this.videoConfig?.value.find(vc => vc.id === id)?.screen ?? 'full';
  }

  shortcutPlaying(id: string) {
    this.isPlaying.value && this.playingId === id ? this.player.pause() : this.queue.unshift(id);
    this.playQueue();
  }

  playNext({ url, volume }: { url: string, volume: number }) {
    this.player.setAttribute('src', url);
    this.player.volume = volume;
    this.player.load();
    this.player.play().catch(() => { });
  }

  playQueue() {
    if (this.queue.length === 0) {
      return this.clear();
    }

    const id = this.queue.shift();
    const url = this.getUrlById(id!);

    if (id && url && url !== 'none') {
      this.isPlaying.value = true;
      this.playingId = id;
      this.playingInfo = Object.assign({}, toRaw(this.videoConfig?.value.find(vc => vc.id === id)));

      // 播放
      this.playNext({ url, volume: this.getVolumeById(id) / 100 });
      this.emit('pos', { x: this.playingInfo.x, y: this.playingInfo.y });
      this.emit('mode', { mode: this.playingInfo.screen });
    } else {
      this.playQueue();
    }
  }

  clear() {
    this.queue = [];
    this.player.currentTime = 0;
    this.player.pause();
    this.isPlaying.value = false;
    this.playingId = undefined;
    this.playingInfo = undefined;
  }
}

