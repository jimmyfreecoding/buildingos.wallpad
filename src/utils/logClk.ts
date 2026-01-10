import { http } from '@/utils/http'

// 日志打点
export const logClk = ({ 
  sourceName, 
  deviceType, 
  actionTopic, 
  actionData,
  spaceCode,
  floorCode,
  floorAreaCode,
  areaCode
}) => {
  http(
      `api/device/doAddDeviceControlLog`, 'POST',
      JSON.stringify({
        spaceCode,
        sourceType: 'PAD',
        sourceName,
        floorCode,
        floorAreaCode,
        areaCode,
        deviceType, 
        actionTopic,
        actionData
      }),
      'http://10.205.66.4/'
    ).then((data) => {}).catch((error) => {
      console.log(error)
    })
}