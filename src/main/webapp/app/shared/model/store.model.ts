import { ICountry } from 'app/shared/model/country.model';

export interface IStore {
  id?: number;
  address?: string;
  city?: string;
  street?: string;
  name?: string;
  zip?: string;
  country?: ICountry;
}

export class Store implements IStore {
  constructor(
    public id?: number,
    public address?: string,
    public city?: string,
    public street?: string,
    public name?: string,
    public zip?: string,
    public country?: ICountry
  ) {}
}
