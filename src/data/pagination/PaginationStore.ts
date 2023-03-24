import { action, makeObservable, observable } from 'mobx';

class PaginationStore {
  fetchStatus: string = '';
  pagination = {
    currentPage: 0,
    totalPages: 10,
  };

  constructor() {
    makeObservable(this, {
      fetchStatus: observable,
      pagination: observable,

      setFetchStatus: action,
      setPagination: action,
    });
  }

  setFetchStatus(status: string) {
    this.fetchStatus = status;
  }

  setPagination({
    currentPage,
    totalPages,
  }: {
    currentPage: number;
    totalPages: number;
  }) {
    if (currentPage) this.pagination.currentPage = currentPage;
    if (totalPages) this.pagination.totalPages = totalPages;
  }
}

export default PaginationStore;
