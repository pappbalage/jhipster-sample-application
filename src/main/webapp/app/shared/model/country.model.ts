import { IStore } from 'app/shared/model/store.model';

export interface ICountry {
  id?: number;
  store?: IStore;
}

export class Country implements ICountry {
  constructor(public id?: number, public store?: IStore) {}
}
