import React, { useEffect, useMemo } from "react";
import type { IDragComponentProps } from "./type";
import { getItemStyleValue } from "./utils";

export default (props: IDragComponentProps) => {
  const style: IDragComponentProps["components"]["style"] = {
    // 该 key 仅分类，不代表有其他含义，组件内完全可以自定义
    // 参数分类名
    graphics: {
      // 分类展示名称
      name: "图形",
      type: "tabPane",
      children: {
        // 参数名称
        name: {
          // 参数展示名称
          name: "组件名称",
          // 使用 text 组件来渲染参数配置
          type: "text",
          value: "组件1",
        },
        description: {
          name: "描述",
          type: "text",
          value: "描述",
        },
      },
    },
  };

  useEffect(() => {
    // 告诉编辑器该组件有什么配置，用什么组件展示配置
    props.getInfo({
      style,
      data: [
        {
          name: " demo",
        },
      ],
      dataHandler: {
        events: {
          "demo-clicked": {
            name: "点击本示例时",
            description: "点击本示例时",
            fields: {
              x: {
                description: "类目",
                type: "string",
              },
            },
            handler: "demo-clicked",
          },
        },
        relations: {
          x: "",
          y1: "",
          y2: "",
          y3: "",
        },
        series: {
          x: "category",
          y1: "数据一",
        },
        publicHandler: {
          myEvent: {
            name: "自定义动作",
            description: "由其他组件触发的动作",
            handler: "myEvent",
          },
          show: {
            name: "显示",
            description: "显示",
            handler: "show",
          },
          hide: {
            name: "隐藏",
            description: "隐藏",
            handler: "hide",
          },
          toggleVisible: {
            name: "显隐切换",
            description: "显隐切换",
            handler: "toggleVisible",
          },
          getRequest: {
            name: "请求接口数据",
            description: "请求接口数据",
            handler: "getRequest",
          },
        },
      },
    });
  }, []);

  const styleData = useMemo(() => {
    return getItemStyleValue(props.components.style);
  }, [props.components.style]);

  const handleEvent = () => {
    props.emit("demo-clicked", {
      x: "实例数据 - x",
    });
  };

  useEffect(() => {
    props.subscribe(props.components.u_id, {
      myEvent: (e) => {
        console.log("myevt");
        console.log(e);
      },
      getRequest: (e) => {
        console.log("get req");
        console.log(e);
      },
    });
    return () => props.unsubscribe(props.components.u_id);
  }, [props.subscribe, props.unsubscribe]);

  return (
    <div onClick={handleEvent}>
      your component content，{styleData?.graphics?.name}
      <span>{styleData?.graphics?.description}</span>
    </div>
  );
};
