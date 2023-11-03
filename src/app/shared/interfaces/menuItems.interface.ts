export interface IMenuItems {
    title: string;
    name: string;
    items: IMenuItem[];
}

export interface IMenuItem {
    title: string;
    items: string[];
    phoneImgUrl: string;
    bgUrl: string;
}
