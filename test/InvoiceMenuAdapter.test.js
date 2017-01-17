import React from 'react';
import ReactDOM from 'react-dom';
import InvoiceMenuAdapter from '../src/components/InvoiceMenuAdapter';

describe('InvoiceMenuAdapter', () => {
  const adapter = new InvoiceMenuAdapter({invoices:[]});
  describe('tabNames', () => {
    it('is a list of strings', () => {
      const tabNames = adapter.tabNames();
      expect(tabNames.length).toBeGreaterThan(2);
      expect(typeof tabNames[0]).toBe('string');
      expect(typeof tabNames[1]).toBe('string');
    });
  });

  describe('getSectionsForTab()', () => {
    xit('returns 0 for state 0', () => {

    });
  });
});
