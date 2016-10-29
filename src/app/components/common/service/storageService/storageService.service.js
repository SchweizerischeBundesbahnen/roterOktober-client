const SEARCH_KEY = 'searchTerm';

export default class StorageService{

  /*@ngInject*/
  constructor(localStorageService){
    this.localStorageService = localStorageService;
    this.searchTerm = localStorageService.get(SEARCH_KEY) ? localStorageService.get(SEARCH_KEY) : '';
  }

  setSearch(searchTerm){
    this.searchTerm = searchTerm;
    this.localStorageService.set(SEARCH_KEY, searchTerm);
  }
}
