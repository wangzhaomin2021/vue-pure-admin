import { computed, onMounted, ref, watch } from "vue";
import { type VideoModuleType } from "./player";
import PlayerCtr from "./player";

const videoInfo = ref<VideoModuleType[]>([
  {
    id: "test",
    title: "test-title",
    video: "none",
    volume: 100,
    screen: "full",
    x: 50,
    y: 50
  }
]);


let playerCtr: PlayerCtr | null = null;
const videoRef = ref<HTMLVideoElement | null>(null);
const hide = ref(true);
const cx = ref(0);
const cy = ref(0);
const cxStyle = computed(() => `translateX(${cx.value}%)`);
const cyStyle = computed(() => `translateY(${cy.value}%)`);
const isFullScreen = ref(true);
const originalSize = ref([600, 337.5]);


onMounted(() => {
  if (!videoRef.value) return;

  playerCtr = new PlayerCtr(videoRef.value);
  // const { videoInfo, load, config } = useToolkitVideoAssistant(playerCtr);
  // load();

  // const device = config.device;
  // watch(device, dev => {
  //     // console.log('device', dev);
  //     (playerCtr?.player as any).setSinkId(dev);
  // }, { immediate: true })

  playerCtr?.on("pos", ({ detail: { x, y } }) => {
    // console.log('====> pos', x, y);
    cx.value = x - 50;
    cy.value = y - 50;
  });

  playerCtr?.on("mode", ({ detail: { mode, immediate } }) => {
    // console.log('====> mode immediate', mode, immediate);
    if (mode === "original") {
      if (!immediate) {
        playerCtr?.once("loadedmetadata", () => {
          // 切换视频源mode变化时
          isFullScreen.value = false;
          setSize();
        });
      } else {
        // 视频源不变mode变化时
        isFullScreen.value = false;
        setSize();
      }
    } else {
      isFullScreen.value = true;
    }
  });

  function setSize() {
    const w = playerCtr!.player.videoWidth;
    const h = playerCtr!.player.videoHeight;
    originalSize.value = [w, h];
  }

  watch(
    () => playerCtr?.isPlaying.value,
    v => {
      hide.value = !v;
    }
  );

  watch(
    () => videoInfo.value,
    v => {
      if (playerCtr?.isPlaying.value) {
        const playingInfo = v.find(item => item.id === playerCtr?.playingId);

        // 实时设置音量
        if (
          playingInfo &&
          playingInfo.volume !== playerCtr?.playingInfo?.volume
        ) {
          playerCtr.playingInfo &&
            (playerCtr.playingInfo.volume = playingInfo.volume);
          playerCtr?.setVolume(playingInfo.volume);
        }

        // 实时设置位置
        if (
          playingInfo &&
          (playingInfo.x !== playerCtr?.playingInfo?.x ||
            playingInfo.y !== playerCtr?.playingInfo?.y)
        ) {
          if (playerCtr.playingInfo) {
            playerCtr.playingInfo.x = playingInfo.x;
            playerCtr.playingInfo.y = playingInfo.y;
          }
          playerCtr?.emit("pos", { x: playingInfo.x, y: playingInfo.y });
        }

        // 实时分辨率
        if (
          playingInfo &&
          playingInfo.screen !== playerCtr?.playingInfo?.screen
        ) {
          playerCtr.playingInfo &&
            (playerCtr.playingInfo.screen = playingInfo.screen);
          playerCtr?.emit("mode", {
            mode: playingInfo.screen,
            immediate: true
          });
        }
      }
    },
    { deep: true }
  );
});

const useVideoAssistant = (props: any) => {
  const originalStyle = computed(() => {
    return isFullScreen.value
      ? {}
      : {
        width: originalSize.value[0] * props.scaleSize + "px",
        height: originalSize.value[1] * props.scaleSize + "px"
      };
  });
  return {
    videoInfo,
    originalStyle,
    hide,
    cxStyle,
    cyStyle
  }
}

export {
  useVideoAssistant,
  videoInfo
}
