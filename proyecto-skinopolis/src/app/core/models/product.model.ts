export class Product {
  constructor(
    public id: number,
    public name: string,
    public category: Array<string>,
    public gun: string,
    public exterior: 'FN' | 'MW' | 'FT' | 'WW',
    public float: number,
    public rareLevel: string,
    public img: string,
    public pattern: number,
    public inspect: string,
    public chatWspUrl: string,
    public phase?: 1 | 2 | 3 | 4
  ) {}
}
