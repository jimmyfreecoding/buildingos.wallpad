<template>
  <div class="map-box flex-col align-center" v-loading="loading" element-loading-background="#161616">
    <div id="mapId" style="height:100%!important;width:800px!important;position:relative!important;z-index:2;" />
  </div>
</template>
<script setup>
const obj = ref({})
const loading = ref(true)
const lightData = ref([])
const moveOverFlag = ref(false)
const heatmap = ref(null)
const areaPositions = ref(
  [
    {
      area:{name:"A",x:19.94,y:0.06,z:-15.66},light:[{name:'A区照明1',x:13.15,y:0.06,z:-23.18},{name:'A区照明2',x:15.84,y:0.06,z:-20.54},{name:'A区照明3',x:19.94,y:0.06,z:-15.66},{name:'A区照明4',x:25.63,y:0.06,z:-10.73},{name:'A区过道照明1',x:12.82,y:0.06,z:-14.06},{name:'A区过道照明2',x:19.08,y:0.06,z:-7.87}],wallpad:{ x: 15.51, y: 1, z: -9.87,obj:null },
    },
    {
      area:{name:"B",x:19.97,y:0.06,z:15.69},light:[{name:'B区照明1',x:25.18,y:0.06,z:10.91},{name:'B区照明2',x:20.59,y:0.06,z:15.39},{name:'B区照明3',x:15.27,y:0.06,z:20.67},{name:'B区照明4',x:12.62,y:0.06,z:23.30},{name:'B区过道照明1',x:19.58,y:0.06,z:8.42},{name:'B区过道照明2',x:9.62,y:0.06,z:17.51}],wallpad:{ x: 15.21, y: 1, z: 10.46,obj:null},
    },
    {
      area:{name:"C",x:-18.52,y:0.06,z:16.14},light:[{name:'C区照明1',x:-11.39,y:0.06,z:23.24},{name:'C区照明2',x:-18.55,y:0.06,z:16.04}],wallpad:{ x: -11.18, y: 1, z:12.04,obj:null },
    },
    {
      area:{name:"D",x:-17.53,y:0.06,z:-15.96},light:[{name:'D区照明1',x:-25.22,y:0.06,z:-9.84},{name:'D区照明2',x:-19.96,y:0.06,z:-15.13},{name:'D区照明3',x:-15.44,y:0.06,z:-19.61},{name:'D区照明4',x:-9.38,y:0.06,z:-25.61},{name:'D区过道照明1',x:-15.33,y:0.06,z:-9.74},{name:'D区过道照明2',x:-9.20,y:0.06,z:-16.31}],wallpad:{ x: -10.48, y: 1, z: -13.16 ,obj:null},
    },
  ]
)

const emit = defineEmits(['clickChild'])

const changeTab = function(){
  emit('clickChild',false)
}

// const lightCannel = (name) =>{
//   areaPositions.value.forEach(function (a) {
//     if (a.area.name === obj.value.code) {
//       a.light.forEach(function (l) {
//         if(l.name===name){
//           l.obj.updateContent(`<div class="text-stroke" style="font-size:24px;position:relative!important;z-index:1!important; font-weight: 300!important;text-align:center" ><img src="/wallpad/images/1-4-2.png"/><p>`+l.name+`</span></div>`)

//         }
//       })
//     }
//   })
// }
// const lightshow = (name) =>{
//   areaPositions.value.forEach(function (a) {
//     if (a.area.name === obj.value.code) {
//       a.light.forEach(function (l) {
//         if(l.name===name){
//           l.obj.updateContent(`<div class="text-stroke" style="font-size:24px;position:relative!important;z-index:1!important; font-weight: 300!important;text-align:center" ><img src="/wallpad/images/1-4-2.png"  height="80px"/><p>`+l.name+`</span></div>`)

//         }
//       })
//     }
//   })
// }
// const showalllight = (flag) => {
//   if(!flag){
//     show(obj.value.code)
//   }
//   areaPositions.value.forEach(function (a) {
//     if (a.area.name === obj.value.code) {
//       a.light.forEach(function (l,index) {
//         if (flag) {
//           if(moveOverFlag.value){
//             l.obj.close()
//             l.obj.init()
//           }
//         } else {
//           l.obj.close()
//         }
//       })
//     }
//   })
// }

const props = defineProps({
  tabIndex: Number,
  data: {
    type: Object,
    default: {}
  },
  lights: {
    type: Array,
    default: []
  },
  currentLightStatus: {
    type: Boolean,
    default: false
  },
  currentLight: {
    type: Object,
    default: {}
  }
})

const { tabIndex } = toRefs(props)
const map = ref(null)
const mapFlag = ref(null)
const infoWindows = ref([])
const showRoom = (flag) => {
  if(flag){
    reset()
  }else{
    show(obj.value.code)
  }

}
defineExpose({
  showRoom,map,lightData,heatmap
})

const moveTo = (position) => {
  moveOverFlag.value = false
  map.value.render.camera.lookAt(position, 30,function(e){
    moveOverFlag.value = true
  });
}
const reset = () => {
  moveOverFlag.value = false
  map.value.render.camera.lookAt({x:0,y:0,z:0}, 60,function(e){
    moveOverFlag.value = true
  });
}
// const setWallpad = (e) => {
//   areaPositions.value.forEach(function(a){
//     if(a.area.name === e){
//       a.wallpad.obj = new AirocovMap.covers.ImageMarker({
//         imgSrc: '/wallpad/static/images/blueImageMarker.png',
//         position: {x: a.wallpad.x, y: a.wallpad.y, z: a.wallpad.z},
//         // center: [0.5, 0],
//         size: 50,
//         canvasHeight: map.value.dom.offsetHeight,
//         callback: function (imgMark) {
//           //将图片标注添加到地图指定楼层的指定图层
//           map.value.addToMap({
//             object: imgMark,
//             floorName: obj.value.floor,
//             layerName: 'imageMarker',
//           });
//         },
//       })
//       show(e)
//     }
//   })
// }

const resetLight = (l) => {
  const lightStatus = ['on', 'off'].includes(l?.status) ? l?.status : JSON.parse(l?.status).status
  const bgColor = (props.currentLightStatus && l?.code === props.currentLight?.code) ? '#ffba00' : 
    lightStatus === 'on'
      ? 'rgba(255, 255, 255, 0.9)'
      : '#E9EAEA'
  const infoWinIconUrl = lightStatus === 'on'
    ? '/wallpad/static/images/lighton.png' 
    : '/wallpad/static/images/lighton.png'
  const fontColor = lightStatus === 'on' ? '#000' : '#919495'
  const name = l?.name?.replace(`${obj.value?.code}区`, '')

  const content = `
    <div style="padding:6px;background:${bgColor};border-radius:10px;color:${fontColor};font-size:16px;position:relative!important;z-index:1!important;display:flex;justify-content:center;align-items:center;" >
      <img src="${infoWinIconUrl}" style="width:30px;height:30px;margin-top:-5px;margin-right:1px;" />
      <span>${name}</span>
    </div>`
  const infoWindow = new AirocovMap.covers.InfoWindow(map.value, {
    content,
    position: { x: l.posX, y: 0.4, z: l.posZ },
  })
  infoWindows.value.push({
    id: l?.code,
    target: infoWindow
  })
  infoWindow.updateContent(content)
}

const resetActiveLight = (l) => {
  // console.log("resetActiveLight",l)
  const lightStatus = l?.status
  const bgColor = lightStatus === 'on'
      ? 'rgba(255, 255, 255, 0.9)'
      : '#E9EAEA'
  const infoWinIconUrl = lightStatus === 'on'
    ? '/wallpad/static/images/lighton.png'
    : '/wallpad/static/images/lighton.png'
  const fontColor = lightStatus === 'on' ? '#000' : '#919495'
  const name = l?.name?.replace(`${obj.value?.code}区`, '')

  const content = `
    <div style="padding:6px;background:${bgColor};border-radius:10px;color:${fontColor};font-size:16px;position:relative!important;z-index:1!important;display:flex;justify-content:center;align-items:center;" >
      <img src="${infoWinIconUrl}" style="width:30px;height:30px;margin-top:-5px;margin-right:1px;" />
      <span>${name}</span>
    </div>`
  
  infoWindows.value?.map(win => {
    if (win.id === l?.code) {
      win.target.updateContent(content)
    }
  })
}

const setLight = () => {
  props.lights?.forEach( (l) => {
    if (l?.posX) {
      console.log("setLight",l)
      resetLight(l)
    }
  })
}

const closeLight = () => {
  if (infoWindows.value?.length) {
    infoWindows.value?.map(win => {
      win.target.close()
    })
  }
}

const setCurrentLight = () => {
  props.lights?.forEach((l) => {
    if (l?.code === props.currentLight?.code) {
      resetActiveLight(props.currentLight)
    }
  })
}

const setAllLight = () => {
  props.lights?.forEach((l) => {
    resetActiveLight(l)
  })
}

// const setAir = (e) => {
//   areaPositions.value.forEach(function(a){
//     if(true){
//       a.area.obj = new AirocovMap.covers.InfoWindow(map.value,{
//         content:`<div style="color:#9C9C9C">本区空气质量：温度34，湿度33%</div>`,
//         position:{x:a.area.x,y:a.area.y,z:a.area.z},
//       })
//     }
//   })
// }

const show = (e) => {
  console.log("show---------------------",e)
  let x = 0;
  let y = 0;
  let z = 0;

  let area = {}
  // areaPositions.value.forEach(function(a){
  //   if(a.area.name === e){
  //     x = a.area.x
  //     y = a.area.y
  //     z = a.area.z
  //   }
  // })
  let jsondata = {}
  if(localStorage.getItem("data")){
    jsondata = JSON.parse(localStorage.getItem("data"))
    area = jsondata.spaceOb[jsondata.spaceIndex].floorArea[jsondata.floorareaIndex].floor[jsondata.floorIndex].area[jsondata.areaIndex]
    x = area.posX
    y = area.posY
    z = area.posZ
  }
  console.log("area",area)
  moveTo({ x: x, y: y, z: z });
}

const getMap = ()=>{
  if(map.value==null|| document.getElementById("mapId").innerHTML==''){
    loading.value = true;
    mapFlag.value = true
    map.value = new AirocovMap.Map({
      container: document.getElementById("mapId"),
      mapUrl:`/wallpad/static/acmap/${obj.value.floor}.acmap`,
      themeUrl: '/wallpad/static/theme/theme.json',
      floorSwitch: { show: false },
      opacity: 0.6,
      mergeModels: ['floor', 'plane','logo'],
      clickModels: ['floor', 'plane', 'room', 'area', 'wall', 'logo'],
      key: 'KMED1W0N50YIWIYJCUNLYPMJ49JDLASE',
      zoom: 0.6,
      showViewMode: '3D',
      bgColor: "#090909",
      defaultFloorIndex: 0,
      showAllFloor: false,
      minPolarAngle: 0,
      maxPolarAngle: 90,
      pointScale: 1,
      theta3D:180,
      clickIntoBuilding: false,
      lazyLoading:true,
      name: "ZeekrMap",
      font: {
        fontScale: 1.4,
        fontFamily: '"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei","DINPro",serif',
        color: "#000",
        strokecolor: "#ccc",
      },
      font1: {
        fontScale: 2,
        fontFamily: '"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",sans-serif',
        color: "#000",
        strokecolor: "#FFF",
      },
      onReady: function () {
        // 左键单击
        // map.value.event.on('click', handleClick); 

        //map.value?.enableControl(true)
        loading.value = false;
        // map.value.render.camera.control.autoRotate = false;

        // 当前位置标识
        // setWallpad(obj.value.code)

        // 首次打开照明
        if (tabIndex.value === 2) {
          setLight()
          show(obj.value?.code)
        }
        // console.log(map.value?.currentBuilding?.children[0].getLayer('roomGroup'), '>>>>>>floor')
        map.value?.currentBuilding?.children[0].getLayer('roomGroup').children?.map((v, index) => {
          // 餐厅
          if (['34F', '35F'].includes(obj.value?.floor)) {
            // 就餐区
            if (v.name === '餐饮服务区') v.name = '就餐服务区'
            if (v.name === 'room' && [5, 7].includes(index)) v.name = '就餐区'
            // 更衣室
            if (v.name === '男女更衣室') v.name = '更衣室'
            // 健身房
            if (v.name === '娱乐服务区') v.name = '健身房'
          }
          if (v.name === obj.value?.name) v.highLight("rgba(237, 135, 51, .2)");
        })

        //空气标识
        // setAir(obj.value.code)
      },
    })
  }
}

onMounted(() => {
  let jsondata

  if(localStorage.getItem("data")){
    jsondata = JSON.parse(localStorage.getItem("data"))
  } else {
    jsondata = props.data
  }

  obj.value.code = jsondata.code
  obj.value.name = jsondata.name
  obj.value.floor = jsondata.floor
  //areaPositions.value = allpoint[obj.value.floor].areaPositions
  //roomPositions.value = allpoint[obj.value.floor].roomPositions
  // areaPositions.value = allpoint['42F'].areaPositions
  // roomPositions.value = allpoint["42F"].roomPositions
  // init map
  getMap()
})

onUnmounted(() => {
  map.value = null
})

watch(() => props.currentLightStatus, (nval, oval) => {
  if (nval) {
    setLight()
  } else {
    setCurrentLight()
  }
}, {deep: true})

watch(() => props.currentLight, (nval, oval) => {
  // console.log('当前照明>>>>>>>>>>>>>', nval)
}, { deep: true })

watch(() => props.lights, (nval, oval) => {
  // console.log('当前全部照明>>>>>>>>>>>>>', nval)
  if (!props.currentLightStatus) {
    setAllLight()
  }
}, {deep: true})

watch(() => props.tabIndex, (nval) => {
    console.log("watch",nval)
  if (nval === 2) {
    show(obj.value?.code)
    setLight()
  } else {
    map.value.resetView()
    closeLight()
  }
})
</script>
<style>
.infoWindowBody{
  z-index:1!important;
  background-color:transparent!important;
  border:none!important;
}
.airocov_info_Triangle{
  border-top: 16px solid #fff!important;
}
.text-stroke {
  color: #000; /* 文字填充色 */
  background-color: #FFFFFF;
  padding:5px;
  display:flex;
}
</style>
<style scoped lang="scss">
.map-box{
  width: 100%;
  height: 100%;
  background:#161616;
}
</style>