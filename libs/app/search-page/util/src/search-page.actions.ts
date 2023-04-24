import { IMemory } from "@mp/api/memories/util";
import { IProfile } from "@mp/api/profiles/util";

export class SearchMemories {
    static readonly type = '[SearchPage] SearchMemories';
    constructor(public readonly searchQuery: string) {}
}

export class GetSearchPageMemories {
  static readonly type = '[SearchPage] GetSearchPageMemories';
}

export class SetSearchPage {
  static readonly type = '[SearchPage] SetSearchPage';
  constructor(public readonly memories: IMemory[]) {}
}

export class AddNewSearchValue {
  static readonly type = '[SearchPage] AddNewSearchValue';
  constructor(public readonly searchValue : string) {}
}