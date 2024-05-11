export interface IHistory {
  role: "user"|"model";
  parts: [{text: string}]

}