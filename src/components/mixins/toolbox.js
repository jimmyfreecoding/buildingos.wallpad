export default {
  data() {
    return {};
  },
  methods: {
    setToolBox(position = ["auto", "auto"]) {
      return {
        show: true,
        right: position[0],
        top: position[1],
        feature: {
          saveAsImage: {
            show: true,
            type: "png",
            backgroundColor: "rgba(16, 31, 45, 0.9)",
            pixelRatio: 2,
            iconStyle: {
              borderColor: "#00f9ff",
              opacity: 0.6
            },
            emphasis: {
              iconStyle: {
                borderColor: "#00f9ff",
                opacity: 0.8,
                textPosition: "top"
              }
            }
          }
        }
      };
    }
  }
};
