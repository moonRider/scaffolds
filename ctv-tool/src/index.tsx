import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { IDragComponentProps } from './type'
import { getItemStyleValue } from './utils'


const Wrap = styled.div`
  background: orange;
`

const Title = styled.h1`
  font-size: 80px;
`
const List = styled.h1`
  font-size: 80px;
`

export default (props: IDragComponentProps) => {

  const style: IDragComponentProps['components']['style'] = {
    graphics: {
      name: "图形",
      type: "tabPane",
      children: {
        name: {
          name: "组件名称",
          type: "text",
          value: '组件1'
        }
      }
    },
  }

  useEffect(() => {
    props.getInfo({
      style,
      data: [{
        name:' demo',
      }],
      dataHandler: {
        events: {
          'demo-clicked': {
            name: "点击本示例时",
            description: "点击本示例时",
            fields: {
              x: {
                description: "类目",
                type: "string"
              }
            },
            handler: "demo-clicked"
          },
        },
        relations: {
          x: "",
          y1: "",
          y2: "",
          y3: ""
        },
        series: {
          x: "category",
          y1: "数据一"
        },
        publicHandler: {
          myEvent: {
            name: "自定义动作",
            description: "由其他组件触发的动作",
            handler: "myEvent"
          },
          show: {
            name: "显示",
            description: "显示",
            handler: "show"
          },
          hide: {
            name: "隐藏",
            description: "隐藏",
            handler: "hide"
          },
          toggleVisible: {
            name: "显隐切换",
            description: "显隐切换",
            handler: "toggleVisible"
          },
          getRequest: {
            name: "请求接口数据",
            description: "请求接口数据",
            handler: "getRequest"
          }
        }
      }
    })
  }, [])

  const styleData = useMemo(() => {
    return getItemStyleValue(props.components.style)
  }, [props.components.style])

  console.log(styleData, 'data')


  const wrapStyle = {backgroundColor:styleData?.graphics?.bg ? undefined : 'unset'}
  const fontStyle = { fontSize: styleData?.graphics?.fontSize,   }

  const handleEvent = () => {
    props.emit('demo-clicked', {
      x: '实例数据 - x'
    })
  }
  useEffect(() => {
    props.subscribe(props.components.u_id, {
      myEvent: (e) => {
        console.log('myevt')
        console.log(e)
      },
      getRequest: (e) => {
        console.log('get req')
        console.log(e)
      },
    })
    return () => props.unsubscribe(props.components.u_id)
  }, [props.subscribe, props.unsubscribe])

  return (
    <Wrap style={wrapStyle} onClick={handleEvent}>
      <List />
      <Title  style={fontStyle}>{styleData?.graphics?.name}</Title>
    </Wrap>
  )
}