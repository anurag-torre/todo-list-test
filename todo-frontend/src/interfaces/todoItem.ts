interface item {
  _id?: string;
  title: string;
  completed: boolean;
}

export default interface todoItem extends item {
  subItems: subItem[];
}

export interface subItem extends item {}
