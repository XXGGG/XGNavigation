import { defineStore } from "pinia";
import BookMarks from "../assets/BookMarks.json"

export const mainStore = defineStore("main", {
  state: () => {
    return {
      bg_img: "./bg_img/Cartoon_01.png",
      Setup_Style: {
        layout_cols: 8,
        layout_rows: 4,
        dark_model:'auto',
        dark_time_start:"18:00:00",
        dark_time_end:"06:00:00",
        Show_Search:true,
        Show_Icon_Title:true,
        Icon_box_width:"0px",
      },
      BookMarks: BookMarks,
    };
  },
  getters: {},
  actions: {
    ChangeTheme(model:string){
      this.Setup_Style.dark_model = model
    }
  },
});
