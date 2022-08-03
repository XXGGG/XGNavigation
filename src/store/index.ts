import { defineStore } from "pinia";
import BookMarks_default from "../assets/BookMarks.json";
import localforage from "localforage";
import { EngineList } from "../assets/EngineList"; //搜索引擎列表

const XGN_SET_default = {
  Bg_Img: "./bg_img/scenery_01.png", //背景图片
  Bg_Color:'#333',//背景颜色
  Layout_Cols: 8, //【布局】 横
  Layout_Rows: 4, //【布局】竖
  Dark_Mode: "auto", //【暗黑模式】
  Dark_Start_Time: "18:00:00", //【暗黑模式】开始时间
  Dark_End_Time: "06:00:00", //【暗黑模式】结束时间
  View_Search_Show: true, //【视图】是否展示搜索栏
  View_BookMark_Show: true, //【视图】是否展示快捷图标书签
  View_BookMark_Title_Show: true, //【视图】是否展示书签名称
  Search_Engine: EngineList[0], //【搜索引擎】
  // Icon_box_width: "0px",
  BookMarks: BookMarks_default,
};
export const mainStore = defineStore("main", {
  state: () => {
    return {
      XGN_SET:
        JSON.parse(localStorage.getItem("XGN_SET") as string) ||
        XGN_SET_default,
    };
  },
  getters: {},
  actions: {
    //初始化！
    init() {
      localforage.getItem("XGN_SET").then((data) => {
        if (data) {
          this.XGN_SET = data;
        } else {
          this.XGN_SET = XGN_SET_default
        }
      });
    },
  },
});
