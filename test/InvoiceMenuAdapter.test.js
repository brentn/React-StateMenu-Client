import React from 'react';
import ReactDOM from 'react-dom';
import InvoiceMenuAdapter from '../src/classes/InvoiceMenuAdapter';

describe('InvoiceMenuAdapter', () => {
  const adapter = new InvoiceMenuAdapter();

  describe('private', () => {
    beforeEach(() => {
      adapter.TEST('setState', 'isFinance', false);
    })
    describe('getTabNames()', () => {
      it('returns a list of strings', () => {
        var tabNames = adapter.getTabNames();
        expect(Array.isArray(tabNames)).toBe(true);
        expect(tabNames.length).toBeGreaterThan(0);
        expect(typeof(tabNames[0])).toBe('string');
      })
    })
    describe('getMenuFlags', () => {
      it('returns a list', () => {
        expect(Array.isArray(adapter.getMenuFlags())).toBe(true);
      });
      it('returns an empty list if not finance and no accounts', () => {
        adapter.TEST('setState', 'isFinance', false);
        adapter.TEST('setState', 'accounts', []);
        expect(adapter.getMenuFlags().length).toBe(0);
      })
      it('returns finance for a finance user', () => {
        adapter.TEST('setState', 'isFinance', true);
        expect(adapter.getMenuFlags().indexOf('finance')>-1).toBe(true);
      })
      it('returns signing-authority for a finance user', () => {
        adapter.TEST('setState', 'accounts', ['101010']);
        expect(adapter.getMenuFlags().indexOf('signing-authority')>-1).toBe(true);
      })
      it('returns both flags for a user with both properties', () => {
        adapter.TEST('setState', 'isFinance', true);
        adapter.TEST('setState', 'accounts', ['101010']);
        expect(adapter.getMenuFlags().indexOf('finance')>-1).toBe(true);
        expect(adapter.getMenuFlags().indexOf('signing-authority')>-1).toBe(true);
      })
    })
    describe('showAllItems()',() => {
      it('returns false by default', () => {
        expect(adapter.TEST('showAllItems', '')).toBe(false);
        adapter.TEST('setState', 'isFinance', true);
        expect(adapter.TEST('showAllItems', '')).toBe(false);
      })
      it('returns false for Finance in Draft and Deleted states', () => {
        adapter.TEST('setState', 'isFinance', true);
        expect(adapter.TEST('showAllItems', 'Draft')).toBe(false);
        expect(adapter.TEST('showAllItems', 'Deleted')).toBe(false);
      })
      it('returns false for non-finance in all states', () => {
        expect(adapter.TEST('showAllItems', 'Submitted')).toBe(false);
        expect(adapter.TEST('showAllItems', 'Approved')).toBe(false);
        expect(adapter.TEST('showAllItems', 'Paying')).toBe(false);
        expect(adapter.TEST('showAllItems', 'Paid')).toBe(false);
      })
      it('returns true for finance in middle 4 states', () => {
        adapter.TEST('setState', 'isFinance', true);
        expect(adapter.TEST('showAllItems', 'Submitted')).toBe(true);
        expect(adapter.TEST('showAllItems', 'Approved')).toBe(true);
        expect(adapter.TEST('showAllItems', 'Paying')).toBe(true);
        expect(adapter.TEST('showAllItems', 'Paid')).toBe(true);
      })
    })
    describe('showAccountsTree()', () => {
      beforeEach(() => {
        adapter.TEST('setState', 'accounts', []);
      })
      it('returns false by default', () => {
        expect(adapter.TEST('showAccountsTree', '')).toBe(false);
        adapter.TEST('setState', 'accounts', ['123456']);
        expect(adapter.TEST('showAccountsTree', '')).toBe(false);
      })
      it('returns false for Draft and Deleted', () => {
        adapter.TEST('setState', 'accounts', ['1234556']);
        expect(adapter.TEST('showAccountsTree', 'Draft')).toBe(false);
        expect(adapter.TEST('showAccountsTree', 'Deleted')).toBe(false);
      })
      it('returns false for no-accounts in middle 4 states', () => {
        expect(adapter.TEST('showAccountsTree', 'Submitted')).toBe(false);
        expect(adapter.TEST('showAccountsTree', 'Approved')).toBe(false);
        expect(adapter.TEST('showAccountsTree', 'Paying')).toBe(false);
        expect(adapter.TEST('showAccountsTree', 'Paid')).toBe(false);
      })
      it('returns true for accounts in middle 4 states', () => {
        adapter.TEST('setState', 'accounts', ['1234556']);
        expect(adapter.TEST('showAccountsTree', 'Submitted')).toBe(true);
        expect(adapter.TEST('showAccountsTree', 'Approved')).toBe(true);
        expect(adapter.TEST('showAccountsTree', 'Paying')).toBe(true);
        expect(adapter.TEST('showAccountsTree', 'Paid')).toBe(true);
      })
    })
    describe('tabItemList()', () => {
      it('returns an empty list for invalid tabName', () => {
        expect(adapter.TEST('tabItemList', 'xxx', {1:''})).toEqual([]);
        expect(adapter.TEST('tabItemList', '', {1:''})).toEqual([]);
        expect(adapter.TEST('tabItemList', null, {1:''})).toEqual([]);
      })
      it('returns an empty list for invalid items object', () => {
        expect(adapter.TEST('tabItemList', 'Draft', [])).toEqual([]);
        expect(adapter.TEST('tabItemList', 'Draft', null)).toEqual([]);
        expect(adapter.TEST('tabItemList', 'Draft', {})).toEqual([]);
      })
      it('returns matching items', () => {
        var items = {
          3:{status:0},
          4:{status:0},
          5:{status:0}
        }
        expect(adapter.TEST('tabItemList', 'Draft', items).length).toBe(3);
      })
      it('does not return items in other states', () => {
        var items = {
          1:{status:0},
          2:{status:1},
          3:{status:2},
          4:{status:4},
          5:{status:0}
        }
        expect(adapter.TEST('tabItemList', 'Submitted', items).length).toBe(2);
      })
      it('returns a list of items', () => {
        var item1 = {id:1,status:1,title:'abc',total:83};
        var item2 = {id:2,status:2,title:'d3f',total:48.22};
        var items = {
          1:item1,
          2:item2
        }
        var result = adapter.TEST('tabItemList', 'Submitted', items);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0]).toBe(item1);
        expect(result[1]).toBe(item2);
      })
    })
    describe('buildVendorTree', () => {
      it('returns an object with a title', () => {
        expect(typeof(adapter.TEST('buildVendorTree', '', null))).toBe('object');
        expect(adapter.TEST('buildVendorTree', '', null).title).toBe(' (0)');
      })
      it('returns the correct title', () => {
        expect(adapter.TEST('buildVendorTree', 'title', []).title).toBe('title (0)');
        expect(adapter.TEST('buildVendorTree', 'Something', []).title).toBe('Something (0)');
      })
      it('returns the list size in the title', () => {
        expect(adapter.TEST('buildVendorTree', 'title', [{}]).title).toBe('title (1)');
        expect(adapter.TEST('buildVendorTree', 'title', [{},{},{},{}]).title).toBe('title (4)');
      })
      it('returns an object with an items sub-object', () => {
        expect(typeof(adapter.TEST('buildVendorTree', '', []).items)).toBe('object');
      })
      it('items object has a treeitems list', () => {
        expect(typeof(adapter.TEST('buildVendorTree', '', []).items.treeItems)).toBe('object');
      })
      it('treeItems list has same number of items as were submitted', () => {
        expect(adapter.TEST('buildVendorTree', '', [{},{},{}]).items.treeItems.length).toBe(3);
      })
      it('treeItems objects have correct parents', () => {
        let obj = adapter.TEST('buildVendorTree', '', [{vendor:'abc'}]);
        expect(obj.items.treeItems[0].parents).toEqual(['abc', 'A']);
        obj = adapter.TEST('buildVendorTree', '', [{vendor:'Gwen'},{vendor:'SPICO'}]);
        expect(obj.items.treeItems[0].parents).toEqual(['Gwen', 'G']);
        expect(obj.items.treeItems[1].parents).toEqual(['SPICO', 'S']);
      })
      it('treeItems objects have correct items', () => {
        let obj1 = {vendor:'Class'};
        let obj2 = {vendor:'WALLO'};
        let obj = adapter.TEST('buildVendorTree', '', [obj1, obj2]);
        expect(obj.items.treeItems[0].item).toBe(obj1);
        expect(obj.items.treeItems[1].item).toBe(obj2);
      })
    })
    describe('buildFinanceTree', () => {
      xit('TODO')
    })
    describe('buildAccountTree', () => {
      it('returns an object with a title', () => {
        expect(typeof(adapter.TEST('buildAccountTree', '', null))).toBe('object');
        expect(adapter.TEST('buildAccountTree', '', null).title).toBe(' (0)');
      })
      it('returns the correct title', () => {
        expect(adapter.TEST('buildAccountTree', 'title', []).title).toBe('title (0)');
        expect(adapter.TEST('buildAccountTree', 'Something', []).title).toBe('Something (0)');
      })
      it('returns the list size in the title', () => {
        expect(adapter.TEST('buildAccountTree', 'title', [{}]).title).toBe('title (1)');
        expect(adapter.TEST('buildAccountTree', 'title', [{},{},{},{}]).title).toBe('title (4)');
      })
      it('returns an object with an items sub-object', () => {
        expect(typeof(adapter.TEST('buildAccountTree', '', []).items)).toBe('object');
      })
      it('items object has a treeitems list', () => {
        expect(typeof(adapter.TEST('buildAccountTree', '', []).items.treeItems)).toBe('object');
      })
      it('treeItems list has same number of items as were submitted', () => {
        expect(adapter.TEST('buildAccountTree', '', [{},{},{}]).items.treeItems.length).toBe(3);
      })
      it('treeItems objects have correct parents', () => {
        let obj = adapter.TEST('buildAccountTree', '', [{account:'abc'}]);
        expect(obj.items.treeItems[0].parents).toEqual(['abc']);
        obj = adapter.TEST('buildAccountTree', '', [{account:'123'},{account:'090909'}]);
        expect(obj.items.treeItems[0].parents).toEqual(['123']);
        expect(obj.items.treeItems[1].parents).toEqual(['090909']);
      })
      it('treeItems objects have correct items', () => {
        let obj1 = {vendor:'Class'};
        let obj2 = {vendor:'WALLO'};
        let obj = adapter.TEST('buildAccountTree', '', [obj1, obj2]);
        expect(obj.items.treeItems[0].item).toBe(obj1);
        expect(obj.items.treeItems[1].item).toBe(obj2);
      })
    })
    describe('buildTabSections', () => {
      beforeEach(() => {
        adapter.TEST('setState', 'isFinance', false);
        adapter.TEST('setState', 'accounts', []);
      })
      it('expects a string from getTabNames()', () => {
        var validName = adapter.getTabNames()[0];
        var invalidName = "xxx";
        expect(typeof(adapter.buildTab(validName, []))).toBe('object');
        try {
          adapter.buildTab(invalidName, []);
        } catch(ex) {
          return;
        }
        expect(true).toBe(false);
      })
      it('returns a list of objects', () => {
        var result = adapter.buildTab('Draft');
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        expect(typeof(result[0])).toBe('object');
      })
      it('does not show a title in myItems by default', () => {
        var result = adapter.buildTab('Draft', []);
        expect(result[0].title.length).toBe(0);
      })
      it('provides an empty section when no items in list', () => {
        var result = adapter.buildTab('Draft', []);
        expect(result.length).toBe(1);
        expect(typeof(result[0].items)).toBe('object');
        expect(result[0].items.listItems).toBeDefined();
      })
      it('builds a myItems section containing items belonging to me', () => {
        adapter.TEST('setState', 'userId', 1);
        let item1 = {id:1, status:0, userId:1};
        let item2 = {id:2, status:0, userId:1};
        let item3 = {id:3, status:0, userId:1};
        let items = {1:item1,2:item2,3:item3};
        let result = adapter.buildTab('Draft', items);
        expect(result.length).toBe(1);
        expect(result[0].title).toBe('');
        expect(result[0].items.listItems.length).toBe(3);
        expect(result[0].items.listItems[0]).toBe(item1);
        expect(result[0].items.listItems[1]).toBe(item2);
        expect(result[0].items.listItems[2]).toBe(item3);
      })
      it('adds a My Items title if there is another section', () => {
        let result = adapter.buildTab('Submitted', {1:{id:1,status:1}});
        expect(result.length).toBe(1);
        expect(result[0].title).toBe('');
        adapter.TEST('setState', 'isFinance', true);
        result = adapter.buildTab('Submitted', {1:{id:1,status:1}});
        expect(result.length).toBe(2);
        expect(result[0].title).toBe('All Items (1)');
        expect(result[1].title).toBe('My Items');
        adapter.TEST('setState', 'isFinance', false);
        adapter.TEST('setState', 'accounts', ['123'])
        result = adapter.buildTab('Submitted', {1:{id:1,status:1,account:'123'}});
        expect(result.length).toBe(2);
        expect(result[0].title).toBe('My Accounts (1)');
        expect(result[1].title).toBe('My Items');
        adapter.TEST('setState', 'accounts', []);
        adapter.TEST('setState', 'userId', '2');
        result = adapter.buildTab('Submitted', {1:{id:1,approver:2,status:1,account:'123'}});
        expect(result.length).toBe(2);
        expect(result[0].title).toBe('Awaiting My Approval');
        expect(result[1].title).toBe('My Items');
      })
      xit('only includes my items in myItems', () => {

      })
      describe('All Items', () => {
        xit('TODO')
      })
      describe('Accounts Tree', () => {
        xit('TODO')
      })
      describe('My Approvals', () => {
        xit('TODO')
      })
    })
  })
  describe('newItem()', () => {
    it('returns an object with text and callback properties', () => {
      var result = adapter.newItem();
      expect(typeof(result.text)).toBe('string');
      expect(typeof(result.callback)).toBe('function');
    })
  })
  describe('buildTab(tabName, items)', () => {
    it('these tests are covered by buildTabSections tests', () => {
    })
  })
});
