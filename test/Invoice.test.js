import React from 'react';
import ReactDOM from 'react-dom';
import Invoice from '../src/classes/Invoice';

describe('Invoice', () => {
  const invoice = new Invoice();

  describe('private methods', () => {
    beforeEach(() => {
      invoice.TEST('setState', 'isFinance', false);
    })
    describe('getMenuTitle()', () => {
      it('returns NO VENDOR if no vendor supplied', () => {
        expect(invoice.TEST('getMenuTitle', {})).toBe('NO VENDOR');
      })
      it('returns VendorId if supplied', () => {
        var vendor = 'SLNNNEEO';
        var inv = {VendorId:vendor};
        expect(invoice.TEST('getMenuTitle', inv)).toBe(vendor);
      })
    })
    describe('getMenuSubtitle()', () => {
      it('returns empty string by default', () => {
        expect(typeof(invoice.TEST('getMenuSubtitle', {}))).toBe('string');
        expect(invoice.TEST('getMenuSubtitle', {}).length).toBe(0);
      })
      it('returns amount', () => {
        var amount = 35.51;
        expect(invoice.TEST('getMenuSubtitle', {GrossAmount:amount})).toEqual(amount.toString());
      })
      it('rounds amount to 2 decimals', () => {
        expect(invoice.TEST('getMenuSubtitle', {GrossAmount:78.3345})).toEqual("78.33");
        expect(invoice.TEST('getMenuSubtitle', {GrossAmount:209.4152})).toEqual("209.42");
      })
    })
    describe('getMenuTreeTitle()', () => {
      it('returns default values by default', () => {
        expect(invoice.TEST('getMenuTreeTitle', {})).toBe('??/?? (xxxxxx) unknown $??')
      })
      it('replaces invalid dates with ??/??', () => {
        expect(invoice.TEST('getMenuTreeTitle', {InvoiceDate:null}).substr(0,5)).toBe('??/??');
        expect(invoice.TEST('getMenuTreeTitle', {InvoiceDate:'abc'}).substr(0,5)).toBe('??/??');
        expect(invoice.TEST('getMenuTreeTitle', {InvoiceDate:{}}).substr(0,5)).toBe('??/??');
        expect(invoice.TEST('getMenuTreeTitle', {InvoiceDate:[]}).substr(0,5)).toBe('??/??');
      })
      it('replaces missing costcenter with xxxxxx',() => {
        expect(invoice.TEST('getMenuTreeTitle', {}).substr(6,8)).toBe('(xxxxxx)');
        expect(invoice.TEST('getMenuTreeTitle', {CostCenter:null}).substr(6,8)).toBe('(xxxxxx)');
        expect(invoice.TEST('getMenuTreeTitle', {CostCenter:undefined}).substr(6,8)).toBe('(xxxxxx)');
      })
      it('replaces missing vendor with unknown',() => {
        expect(invoice.TEST('getMenuTreeTitle', {}).substr(15,7)).toBe('unknown');
        expect(invoice.TEST('getMenuTreeTitle', {VendorId:null}).substr(15,7)).toBe('unknown');
        expect(invoice.TEST('getMenuTreeTitle', {VendorId:undefined}).substr(15,7)).toBe('unknown');
      })
      it('replaces missing amount with $??',() => {
        expect(invoice.TEST('getMenuTreeTitle', {}).substr(23,3)).toBe('$??');
        expect(invoice.TEST('getMenuTreeTitle', {GrossAmount:null}).substr(23,3)).toBe('$??');
        expect(invoice.TEST('getMenuTreeTitle', {GrossAmount:undefined}).substr(23,3)).toBe('$??');
      })
    })
    describe('getImageUrl(userId)', () => {
      it('returns a url from theLoop', () => {
        expect(invoice.TEST('getImageUrl', {}).indexOf('https://staff.powertochange.org')).toBeGreaterThan(-1);
      })
      xit('returns a different url for each user',() => {
        let firstUrl = invoice.TEST('getImageUrl', {UserId:1});
        let secondUrl = invoice.TEST('getImageUrl', {UserId:2});
        expect(firstUrl).not.toEqual(secondUrl);
      })
    })
    describe('getTooltip()', () => {
      it('returns an empty string by default', () => {
        expect(typeof(invoice.TEST('getTooltip', {}))).toBe('string');
        expect(invoice.TEST('getTooltip', {}).length).toBe(0);
      })
      it('prefixes the invoiceId with AP #', () => {
        expect(invoice.TEST('getTooltip', {InvoiceId:24}).split('0')[0]).toBe('AP #');
      })
      it('pads the invoiceId to 5 characters', () => {
        expect(invoice.TEST('getTooltip', {InvoiceId:5}).split(' ')[1]).toBe('#00005');
        expect(invoice.TEST('getTooltip', {InvoiceId:8932}).split(' ')[1]).toBe('#08932');
        expect(invoice.TEST('getTooltip', {InvoiceId:404040}).split(' ')[1]).toBe('#404040');
      })
    })
    describe('hasPrivateComments()', () => {
      it('returns false for missing or empty', () => {
        expect(invoice.TEST('hasPrivateComments', {})).toBe(false);
        expect(invoice.TEST('hasPrivateComments', {PrivComments:''})).toBe(false);
      })
      it('returns true for private comments', () => {
        expect(invoice.TEST('hasPrivateComments', {PrivComments:'private'})).toBe(true);
      })
    })
  })
  describe('makeItem', () => {
    it('is a function', () => {
      expect(typeof(invoice.makeItem)).toBe('function');
    });
    it('requires an object with InvoiceId property', () => {
      try {
        invoice.makeItem();
        expect(true).toBe(false);
      } catch(e) {}
      try {
        invoice.makeItem({});
        expect(true).toBe(false);
      } catch(e) {}
      try {
        invoice.makeItem({InvoiceId:'abc'});
        expect(true).toBe(false);
      } catch(e) {}
    })
    it('produces an object that uses InvoiceId as its id', () => {
      expect(invoice.makeItem({InvoiceId:1}).id).toBe(1);
    })
    it('maps properties correctly', () => {
      var id = 23;
      var status = 3;
      var vendor = 'VENDOR';
      var date = new Date();
      var account = '434334';
      var amount = 24.13;
      var inv = {
        InvoiceId:id,
        Status:status,
        VendorId:vendor,
        InvoiceDate:date,
        CostCenter:account,
        GrossAmount:amount,
      }
      var result = invoice.makeItem(inv);
      expect(result.id).toBe(id);
      expect(result.status).toBe(status);
      expect(result.imageUrl.indexOf('powertochange')).toBeGreaterThan(-1);
      expect(result.title).toBe(vendor);
      expect(result.subtitle).toBe(amount.toFixed(2));
      expect(typeof(result.treeTitle)).toBe('string');
      expect(result.tooltip.length).toBe(9);
      expect(result.total).toBe(amount);
    })
  })
})
