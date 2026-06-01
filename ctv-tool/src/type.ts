// 默认配置信息,所有组件都有，无需按照schema进行配置
interface IConfig {
  width: number;
  height: number;
  x: number;
  y: number;
  opacity: number | string;
  bgColor: string;
  // 隐藏
  hide: boolean;
  // 隐藏映射
  hideMap: string;
  // 锁定纵横比
  lock: boolean;
}

export interface IUpdateAppPayloadItem {
  u_id?: string;
  keypath: (string | number | undefined)[];
  value: any;
}

export interface IUpdateAppPayload {
  components?: IUpdateAppPayloadItem[];
  info?: IUpdateAppPayloadItem[];
  global?: IUpdateAppPayloadItem[];
}

export interface IEventFieldValue {
  description: string;
  map?: string;
  enable?: boolean;
  function?: string;
  type?: string;
}

interface IEventField {
  [x: string]: IEventFieldValue;
}

export interface ICustomizeFields {
  variable: string;
  field: string;
}

interface IEventBase {
  name?: string;
  description: string;
  handler?: string;
  customizeFields?: ICustomizeFields[];
  fields: IEventField;
  varsChecked?: boolean;
}

export interface IEvent {
  [x: string]: IEventBase;
}

interface IRelation {
  [x: string]: string;
}

interface ISeries {
  [x: string]: string;
}

interface IPublicHandlerItem {
  description: string;
  name: string;
  fields?: IEventField;
  handler: string;
}

interface IPublicHandler {
  [x: string]: IPublicHandlerItem;
}

export interface IDataHandler {
  events?: IEvent;
  relations?: IRelation | IMapDataHandler[];
  series?: ISeries;
  publicHandler?: IPublicHandler;
  disableList?: any[];
}

export interface IMapDataHandler {
  field: string;
  mapping: string;
  description: string;
}

type SchemaTypeKey =
  | 'tabPane'
  | 'module'
  | 'textStyle'
  | 'lineStyle'
  | 'radio'
  | 'colorThemeStyle'
  | 'paddingStyle'
  | 'borderRadius'
  | 'gridBlockStyle'
  | 'tabButtonStyle'
  | 'multipleInput'
  | 'number'
  | 'colorpicker'
  | 'checkbox'
  | 'group'
  | 'multipleNumber'
  | 'select'
  | 'switch'
  | 'text'
  | 'heatColor'
  | 'fields'
  | 'uniquePoint'
  | 'img'
  | 'globalMap'
  | 'file'
  | 'textarea'
  | 'array'
  | 'mapInterval'
  | 'numberSelect'
  | 'cover'
  | 'divider'
  | 'picture'
  | 'customCard'
  | 'formatDateRange'
  | 'themeSelect'
  | 'link'
  | 'arcgisUpdater'

interface IStyle {
  name: string;
  type: SchemaTypeKey;
  children?: Record<string, IStyle>;
  value?: any;
  [propName: string]: any;
}

// 组件的信息
export interface IComponent {
  name: string;
  id: string;
  u_id: string;
  type: string;
  img: string;
  config?: IConfig;
  style?: Record<string, IStyle>;
  // 配置的数据
  data?: any;
  event?: any;
  dataHandler?: IDataHandler;
  dataConfig?: any;
  members?: List<IComponent>;
  // 地图的图层和特效信息
  layers?: any;
  // 地图和图层的排序信息
  orderInfo?: any;
  // 父级id
  pid?: string | number;
  children?: IComponent[];
  // 经过串行处理器后的数据
  filterData?: any[];
}


export interface IThemeSource {
  // 当前主题色类型名称
  label: string;
  // 当前主题色类型
  value: string;
  // 主题色集合
  colors: string[];
}

interface IEventParams {
  // 触发次数
  trigger: number
  eventName: string
  // 数据
  data: any
}

export interface IEventMap {
  [name: string]: (evt: IEventParams) => void
}

export interface IDragComponentProps {
  // 组件 UID
  id: string,
  getInfo: ({ style, dataHandler, data }: Pick<IComponent, 'style' | 'dataHandler' | 'data'>) => void
  emit: (evtName: string, data : any) => void
  diff: any[]
  components: IComponent,

  dataRefresh: Function

  themeSource: IThemeSource[]
  colorScheme: any
  subscribe: (u_id: string, eventMap: IEventMap) => void
  unsubscribe: (u_id: string) => void
}