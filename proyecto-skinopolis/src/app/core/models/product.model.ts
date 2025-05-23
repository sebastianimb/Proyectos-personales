export class Product {
  constructor(
    public id: number,
    public name: string,
    public category: Array<string>,
    public type: string,
    public exterior: string,
    public float: number,
    public rareLevel: string,
    public img: string,
    public pattern: number,
    public inspect: string,
    public chatWspUrl: string,
    public phase?: 1 | 2 | 3 | 4
  ) {}
}
