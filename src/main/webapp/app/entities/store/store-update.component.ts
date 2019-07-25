import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStore, Store } from 'app/shared/model/store.model';
import { StoreService } from './store.service';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country';

@Component({
  selector: 'jhi-store-update',
  templateUrl: './store-update.component.html'
})
export class StoreUpdateComponent implements OnInit {
  isSaving: boolean;

  countries: ICountry[];

  editForm = this.fb.group({
    id: [],
    address: [],
    city: [null, [Validators.required]],
    street: [],
    name: [null, [Validators.required]],
    zip: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected storeService: StoreService,
    protected countryService: CountryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ store }) => {
      this.updateForm(store);
    });
    this.countryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICountry[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICountry[]>) => response.body)
      )
      .subscribe((res: ICountry[]) => (this.countries = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(store: IStore) {
    this.editForm.patchValue({
      id: store.id,
      address: store.address,
      city: store.city,
      street: store.street,
      name: store.name,
      zip: store.zip
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const store = this.createFromForm();
    if (store.id !== undefined) {
      this.subscribeToSaveResponse(this.storeService.update(store));
    } else {
      this.subscribeToSaveResponse(this.storeService.create(store));
    }
  }

  private createFromForm(): IStore {
    return {
      ...new Store(),
      id: this.editForm.get(['id']).value,
      address: this.editForm.get(['address']).value,
      city: this.editForm.get(['city']).value,
      street: this.editForm.get(['street']).value,
      name: this.editForm.get(['name']).value,
      zip: this.editForm.get(['zip']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStore>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCountryById(index: number, item: ICountry) {
    return item.id;
  }
}
