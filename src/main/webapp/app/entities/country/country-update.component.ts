import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICountry, Country } from 'app/shared/model/country.model';
import { CountryService } from './country.service';
import { IStore } from 'app/shared/model/store.model';
import { StoreService } from 'app/entities/store';

@Component({
  selector: 'jhi-country-update',
  templateUrl: './country-update.component.html'
})
export class CountryUpdateComponent implements OnInit {
  isSaving: boolean;

  stores: IStore[];

  editForm = this.fb.group({
    id: [],
    store: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected countryService: CountryService,
    protected storeService: StoreService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ country }) => {
      this.updateForm(country);
    });
    this.storeService
      .query({ filter: 'country-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IStore[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStore[]>) => response.body)
      )
      .subscribe(
        (res: IStore[]) => {
          if (!this.editForm.get('store').value || !this.editForm.get('store').value.id) {
            this.stores = res;
          } else {
            this.storeService
              .find(this.editForm.get('store').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IStore>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IStore>) => subResponse.body)
              )
              .subscribe(
                (subRes: IStore) => (this.stores = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(country: ICountry) {
    this.editForm.patchValue({
      id: country.id,
      store: country.store
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const country = this.createFromForm();
    if (country.id !== undefined) {
      this.subscribeToSaveResponse(this.countryService.update(country));
    } else {
      this.subscribeToSaveResponse(this.countryService.create(country));
    }
  }

  private createFromForm(): ICountry {
    return {
      ...new Country(),
      id: this.editForm.get(['id']).value,
      store: this.editForm.get(['store']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountry>>) {
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

  trackStoreById(index: number, item: IStore) {
    return item.id;
  }
}
