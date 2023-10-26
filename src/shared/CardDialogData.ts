import CardData from "./CardData";

export default interface CardDialogData {
  open: boolean;
  mode: "new" | "view" | "edit";
  prefillCard?: CardData;
}