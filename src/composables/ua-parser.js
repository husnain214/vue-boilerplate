import { reactive, onMounted } from "vue";
import UAParser from "ua-parser-js";

export function useUAParser() {
  let UAstate = reactive({
    isUADesktop: false,
    isUATablet: false,
    isUAMobile: false,
    isPotrait: false,
  });

  function globalDeviceCheck() {
    let parser = new UAParser();
    let parser_result = parser.getResult();

    if (parser_result.device.type == "mobile") {
      UAstate.isUAMobile = true;
    } else if (parser_result.device.type == "tablet") {
      UAstate.isUATablet = true;
    } else {
      UAstate.isUADesktop = true;
    }
  }
  function globalOrientationCheck() {
    var mql = window.matchMedia("(orientation: portrait)");
    window.addEventListener("orientationchange", function () {
      location.reload(true);
    });

    if (mql.matches) {
      UAstate.isPotrait = true;
    } else {
      UAstate.isPotrait = false;
    }

    mql.addListener(function (m) {
      if (m.matches) {
        UAstate.isPotrait = true;
      } else {
        UAstate.isPotrait = false;
      }
    });
  }
  onMounted(() => {
    globalDeviceCheck();
    globalOrientationCheck();
  });

  return { UAstate };
}