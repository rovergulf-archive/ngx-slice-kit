import { Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";
import { AppMetaState, DEFAULT_META_TITLE, PageMeta } from "../../tools/model/page-meta.model";

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  $state: BehaviorSubject<AppMetaState> = new BehaviorSubject<AppMetaState>('clean');
  defaultMeta: any;

  constructor(
      private meta: Meta,
      private title: Title,
  ) {
  }

  set state(state: AppMetaState) {
    this.$state.next(state);
  }

  get state(): AppMetaState {
    return this.$state.getValue();
  }

  get isDirty(): boolean {
    return this.$state.getValue() === 'dirty';
  }

  get isClean(): boolean {
    return this.$state.getValue() === 'clean';
  }

  setPageMeta(m: PageMeta): void {
    this.state = 'dirty';
    if (m.use_default) {
      this.addTag('title', '');
      this.addTag('title', '');
      this.addTag('title', '');
    }
  }

  addTag(name: string, content: string): void {
    this.state = 'dirty';
    this.meta.addTag({
      name,
      content
    });
  }

  getTag(tag: string): any {
    return undefined;
  }

  setTitle(value: string): void {
    this.title.setTitle(value);
  }

  updateTags(tags: MetaDefinition[]): void {
    this.state = 'dirty';
    for (let tag of tags) {
      this.updateTag(tag.name, tag.content, tag.property);
    }
  }

  updateTag(name, content, property: string): void {
    this.state = 'dirty';
    console.log('update: ', name, content, property);
    this.meta.updateTag(Object.assign({}, {
      name: (name ?? property),
      property: (property ?? name),
      content,
    }));
  }

  removeTag(name): void {
    this.state = 'dirty';
  }

  getDefaults(): void {
  }

  resetTags(): void {
    if (this.isDirty) {
      const defaultMeta = new PageMeta();
      this.updateTags(defaultMeta.getServiceTags())
      this.title.setTitle(DEFAULT_META_TITLE);
      this.state = `clean`;
    }
  }

}
