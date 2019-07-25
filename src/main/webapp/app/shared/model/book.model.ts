import { IAuthor } from 'app/shared/model/author.model';

export interface IBook {
  id?: number;
  title?: string;
  iSBN?: string;
  price?: string;
  isRented?: boolean;
  rental?: string;
  author?: IAuthor;
}

export class Book implements IBook {
  constructor(
    public id?: number,
    public title?: string,
    public iSBN?: string,
    public price?: string,
    public isRented?: boolean,
    public rental?: string,
    public author?: IAuthor
  ) {
    this.isRented = this.isRented || false;
  }
}
