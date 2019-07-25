import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAuthor, Author } from 'app/shared/model/author.model';
import { AuthorService } from './author.service';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book';

@Component({
  selector: 'jhi-author-update',
  templateUrl: './author-update.component.html'
})
export class AuthorUpdateComponent implements OnInit {
  isSaving: boolean;

  books: IBook[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    book: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected authorService: AuthorService,
    protected bookService: BookService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ author }) => {
      this.updateForm(author);
    });
    this.bookService
      .query({ filter: 'author-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IBook[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBook[]>) => response.body)
      )
      .subscribe(
        (res: IBook[]) => {
          if (!this.editForm.get('book').value || !this.editForm.get('book').value.id) {
            this.books = res;
          } else {
            this.bookService
              .find(this.editForm.get('book').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IBook>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IBook>) => subResponse.body)
              )
              .subscribe(
                (subRes: IBook) => (this.books = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(author: IAuthor) {
    this.editForm.patchValue({
      id: author.id,
      name: author.name,
      book: author.book
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const author = this.createFromForm();
    if (author.id !== undefined) {
      this.subscribeToSaveResponse(this.authorService.update(author));
    } else {
      this.subscribeToSaveResponse(this.authorService.create(author));
    }
  }

  private createFromForm(): IAuthor {
    return {
      ...new Author(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      book: this.editForm.get(['book']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAuthor>>) {
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

  trackBookById(index: number, item: IBook) {
    return item.id;
  }
}
