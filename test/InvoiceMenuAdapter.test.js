import React from 'react';
import ReactDOM from 'react-dom';
import InvoiceMenuAdapter from '../src/components/InvoiceMenuAdapter';

describe('InvoiceMenuAdapter', () => {
  const adapter = new InvoiceMenuAdapter({invoices:[]});
  describe('getTabs()', () => {
    it('is a list of tabitems', () => {
      const tabs = adapter.getTabs();
      expect(tabs).toBeInstanceOf(Array);
      expect(tabs.length).toBeGreaterThan(2);
      expect(typeof tabs[0].title).toBe('string');
      expect(tabs[0].sections).toBeInstanceOf(Array);
      expect(typeof tabs[0].sections[0].title).toBe('string');
      expect(tabs[0].sections[0].items.listItems).toBeInstanceOf(Array);
    });
  });

});
