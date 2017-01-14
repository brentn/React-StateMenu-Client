import $ from '../../lib/jquery-3.1.0.min';

function byInvoiceDate(a, b) {
  return a.invoiceDate < b.invoiceDate;
}
function getShortTitle(invoice) {
  let id = '#' + ('0000' + invoice.id).slice(-5);
  let vendorId = invoice.vendorId?invoice.vendorId:'no vendor';
  return id + ' : ' + vendorId + ' $' + invoice.grossAmount.toFixed(2);
}
function getMenuTitle(invoice) {
  return (invoice.vendorId || 'NO VENDOR');
}
function getMenuSubtitle(invoice) {
  return invoice.grossAmount.toFixed(2);
}
function getImageUrl(userId) {
  return 'https://staff.powertochange.org/custom-pages/webService.php?type=staff_photo&api_token=V7qVU7n59743KNVgPdDMr3T8&staff_username=brentn';
}
function getTooltip(invoice) {
  return "AP #" + ('00000' + invoice.id).slice(-4);
}
function selectItem(id) {
  // let item = $(evt.target).closest('.menu-item');
  $('.menu .menu-item.selected').removeClass('selected');
  // $(item).addClass('selected');
  console.log('selecting ',id)
}
function itemsFromInvoices(invoices) {
  let items =  [];
  invoices.forEach(invoice => {
    items.push({
      id: invoice.id,
      imageUrl: getImageUrl(invoice.userId),
      title: getMenuTitle(invoice),
      subtitle: getMenuSubtitle(invoice),
      tooltip: getTooltip(invoice),
      total: invoice.grossAmount,
      selectItem: selectItem
    });
  });
  return items;
}
function tabStatusList(tabName) {
  switch (tabName) {
    case "Draft": return [0];
    case "Submitted": return [1,2,3];
    case "Approved": return [4,10,20];
    case "Paying": return [5];
    case "Paid": return [8];
    case "Deleted": return [6];
    default: return [];
  }
}
function tabInvoices(tabName, invoices) {
  let validStatusList = tabStatusList(tabName);
  return invoices.filter(invoice => {
    return validStatusList.includes(invoice.status);
  });
}
function showAllItems(isFinance, tabName) {
  let validTabs = ["Submitted", "Approved", "Paying", "Paid"];
  return (isFinance && validTabs.includes(tabName));
}
function showAccountsTree(accounts, tabName) {
  let validTabs = ["Submitted", "Approved", "Paying", "Paid"];
  return (accounts && accounts.length>0 && validTabs.includes(tabName));
}
function getNode(title, tree) {
  let nodes = tree.items.filter(item => item.title === title);
  if (nodes.length) {
    return nodes[0];
  } else {
    let newNode = {title: title, items: []};
    tree.items.push(newNode);
    return newNode;
  }
}
function buildVendorTree(title, invoices) {
  let tree = {title: title, items: []};
  invoices.sort((a, b) => {
    return a.vendorId > b.vendorId;
  }).forEach(invoice => {
    let vendor = invoice.vendorId?invoice.vendorId:'NO VENDOR';
    let letter = invoice.vendorId?vendor.substring(0,1):'?';
    let letterNode = getNode(letter, tree);
    let vendorNode = getNode(vendor, letterNode);
    let itemNode = {id:invoice.id, title: getShortTitle(invoice), selectItem: selectItem};
    vendorNode.items.push(itemNode);
  });
  return tree
}
function buildAccountTree(title, invoices) {
  let tree = {title: title, items:[]};
  invoices.sort((a, b) => {
    return a.costCenter > b.costCenter;
  }).forEach(invoice => {
    let accountNode = getNode(invoice.costCenter, tree);
    let itemNode = {id:invoice.id, title: getShortTitle(invoice), selectItem: selectItem};
    accountNode.items.push(itemNode);
  });
  return tree;
}

export default class InvoiceMenuAdapter {
  constructor(data) {
    this.userId = data.userId;
    this.isFinance = data.isFinance;
    this.accounts = data.accounts;
    this.invoices = data.invoices.sort(byInvoiceDate);
    this.myInvoices = this.invoices.filter(invoice => {
      return invoice.userId === this.userId;
    });
  }
  tabNames() {
    return ["Draft", "Submitted", "Approved", "Paying", "Paid", "Deleted"];
  }
  getSectionsForTab(tabName) {
    const MY_TITLE = "My Items";
    let sections = [];
    let myTitle = '';
    if (showAllItems(this.isFinance, tabName)) {
      let allInvoices = tabInvoices(tabName, this.invoices);
      if (allInvoices.length > 0) {
        let allItems = buildVendorTree("All Items", allInvoices);
        sections.push(allItems);
        myTitle = MY_TITLE;
      }
    };
    if (showAccountsTree(this.accounts, tabName)) {
      let accountInvoices = tabInvoices(tabName, this.invoices).filter(invoice => {
        return this.accounts.includes(invoice.costCenter);
      });
      if (accountInvoices.length>0) {
        let accountItems = buildAccountTree("My Accounts", accountInvoices);
        sections.push(accountItems);
        myTitle = MY_TITLE;
      }
    }
    if (tabName === "Submitted") {
      let approvableInvoices = tabInvoices("Submitted", this.invoices).filter(invoice  => {
        return invoice.apprUserId === this.userId;
      });
      if (approvableInvoices.length > 0) {
        sections.push({title: "Awaiting My Approval", items: itemsFromInvoices(approvableInvoices)});
        myTitle = MY_TITLE;
      }
    }
    let myInvoices = tabInvoices(tabName, this.myInvoices);
    sections.push({title: myTitle, items: itemsFromInvoices(myInvoices)});
    return sections;
  }
}
