import { WatchedList } from './watched-list';

class WatchedListSample extends WatchedList<number> {
  compareItems(a: number, b: number) {
    return a === b;
  }
}

describe('Watched list', () => {
  it('should be able  to get the list of current items', () => {
    const list = new WatchedListSample([1, 2, 3]);

    expect(list.currentItems).toHaveLength(3);
  });

  it('should be able to add new item to the list', () => {
    const list = new WatchedListSample([1, 2, 3]);

    list.add(4);

    expect(list.currentItems).toHaveLength(4);
    expect(list.getNewItems()).toEqual([4]);
  });

  it('should be able to remove an item from the list', () => {
    const list = new WatchedListSample([1, 2, 3]);

    list.remove(3);

    expect(list.currentItems).toHaveLength(2);
    expect(list.getRemovedItems()).toEqual([3]);
  });

  it('should be able to add an item event if it was removed before', () => {
    const list = new WatchedListSample([1, 2, 3]);

    list.remove(3);
    list.add(3);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getNewItems()).toEqual([]);
    expect(list.getRemovedItems()).toEqual([]);
  });

  it('should be able to remove an item event if it was added before', () => {
    const list = new WatchedListSample([1, 2, 3]);

    list.add(4);
    list.remove(4);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getNewItems()).toEqual([]);
    expect(list.getRemovedItems()).toEqual([]);
  });

  it('should be able to update list items', () => {
    const list = new WatchedListSample([1, 2, 3]);

    list.update([1, 3, 5]);
    expect(list.currentItems).toHaveLength(3);
    expect(list.getNewItems()).toEqual([5]);
    expect(list.getRemovedItems()).toEqual([2]);
  });
});
