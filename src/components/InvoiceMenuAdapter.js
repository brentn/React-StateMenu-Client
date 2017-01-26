//import $ from '../../lib/jquery-3.1.0.min';

const state = {
  userId:1,
  isFinance:true,
  accounts:[],//['110100', '110140'],
  selectedId:null,
  invoices:[
    {id:1, status:0, userId:1, apprUserId:2, vendorId:'VENDOR', grossAmount:204.22, costCenter: '123000', company:'PTC', paymentMethod:'eft', invoiceDate:new Date('2016/12/21')},
    {id:2, status:0, userId:1, apprUserId:2, vendorId:'VENDOR', grossAmount:39.31, costCenter: '110100', company:'PTC', paymentMethod:'eft', invoiceDate:new Date('2016/12/21')},
    {id:3, status:4, userId:2, apprUserId:1, vendorId:'VENDOR', grossAmount:90, costCenter: '123000', company:'PTC', paymentMethod:'eft', invoiceDate:new Date('2016/12/21'), privateComments:'a'},
    {id:5, status:4, userId:2, apprUserId:1, vendorId:'BIGBOY', grossAmount:903.12, costCenter: '110140', company:'PTC', paymentMethod:'eft', invoiceDate:new Date('2016/12/21'), moreInfo:true},
    {id:4, status:10, userId:1, apprUserId:2, vendorId:'GRATOY', grossAmount:84.23, costCenter:'110100', company:'GAiN', paymentMethod:'eft', invoiceDate:new Date('2016/12/21')}
  ]
}
const Submitted = "Submitted";
const Approved = "Approved";
const tabNames = ["Draft", Submitted, Approved, "Paying", "Paid", "Deleted"];
const tabStatusList = {
  Draft: [0],
  Submitted: [1, 2, 3],
  Approved: [4, 10, 20],
  Paying: [5],
  Paid: [8],
  Deleted: [6]
}

function showAllItems(tabName) {
  let validTabs = [Submitted, Approved, "Paying", "Paid"];
  return (state.isFinance && (validTabs.indexOf(tabName) >= 0));
}

function showAccountsTree(tabName) {
  let validTabs = [Submitted, Approved, "Paying", "Paid"];
  return (state.accounts && state.accounts.length>0 && (validTabs.indexOf(tabName) >= 0));
}

function tabInvoices(tabName) {
  let validStatuses = tabStatusList[tabName];
  return state.invoices.filter(invoice => {
    return validStatuses.indexOf(invoice.status) >= 0;
  });
}

function getMenuTitle(invoice) {
  return (invoice.vendorId || 'NO VENDOR');
}

function getMenuTreeTitle(invoice) {
  let date = invoice.invoiceDate.getMonth() + "/" + invoice.invoiceDate.getDate();
  let account = "(" + (invoice.costCenter || "xxxxxx") + ")";
  let vendor = (invoice.vendorId || "unknown");
  let amount = "$" + invoice.grossAmount;
  return date + " " + account + " " + vendor + " " + amount;
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

function newItemCallback() {
  console.log('New Item')
}

function itemFrom(invoice) {
  return {
    id: invoice.id,
    imageUrl: getImageUrl(invoice.userId),
    title: getMenuTitle(invoice),
    subtitle: getMenuSubtitle(invoice),
    tooltip: getTooltip(invoice),
    total: invoice.grossAmount,
  }
}

function hasPrivateComments(invoice) {
  return invoice.privateComments && invoice.privateComments.length>0;
}

function treeItemFrom(invoice) {
  let flags = [];
  if (state.isFinance && hasPrivateComments(invoice)) flags.push('private');
  if (state.isFinance && invoice.moreInfo) flags.push('moreinfo');
  return {
    id: invoice.id,
    title: getMenuTreeTitle(invoice),
    tooltip: getTooltip(invoice),
    flags: flags,
  }
}

function itemsFrom(invoices) {
  return invoices.map(invoice =>
    itemFrom(invoice)
  );
}

function buildVendorTree(title, invoices) {
  return {
    title: title + " ("+invoices.length+")",
    items: {
      treeItems: invoices.map(invoice => {
        let vendor = invoice.vendorId || 'NO_VENDOR';
        let letter = invoice.vendorId?vendor.substr(0,1).toUpperCase():'?';
        return {parents: [vendor, letter], item:treeItemFrom(invoice)};
      })
    }
  };
}

function buildFinanceTree(title, invoices) {
  return{
    title: title + " ("+invoices.length+")",
    items: {
      treeItems: invoices.map(invoice => {
        if (invoice.status === 4) {
          let company = invoice.company || "PTC";
          let method = invoice.paymentMethod || "eft";
          let count = invoices.filter(i => i.status===4 && (i.company || "PTC") === company && (i.paymentMethod || "eft" === method)).length;
          let branch = company + " (" + (method) + ") (" + count + ")";
          return {parents: [branch], item: treeItemFrom(invoice)};
        } else {
          let count = invoices.filter(i => i.status !== 4).length;
          let branch = "Pending Import (" + count + ")";
          return {parents: [branch], item: treeItemFrom(invoice)};
        }
      })
    }
  }
}

function buildAccountTree(title, invoices) {
  return {
    title: title + " ("+invoices.length+")",
    items: {
      treeItems: invoices.map(invoice => {
        return {parents: [invoice.costCenter || '??????'], item:treeItemFrom(invoice)};
      })
    }
  };
}

function buildTabSections(tabName) {
  const MY_TITLE = "My Items";
  let sections = [];
  let myTitle = '';
  if (showAllItems(tabName)) {
    let allInvoices = tabInvoices(tabName, state.invoices);
    if (allInvoices.length > 0) {
      let allItems = (tabName === Approved?
        buildFinanceTree("Finance", allInvoices):
        buildVendorTree("All Items", allInvoices)
      );
      sections.push(allItems);
      myTitle = MY_TITLE;
    }
  }
  if (showAccountsTree(tabName)) {
    let accountInvoices = tabInvoices(tabName, state.invoices).filter(invoice => {
      return state.accounts.indexOf(invoice.costCenter) >= 0;
    });
    if (accountInvoices.length>0) {
      let accountItems = buildAccountTree("My Accounts", accountInvoices)
      sections.push(accountItems);
      myTitle = MY_TITLE;
    }
  }
  if (tabName === Submitted) {
    let approvableInvoices = tabInvoices(Submitted, state.invoices).filter(invoice  => {
      return invoice.apprUserId === state.userId;
    });
    if (approvableInvoices.length > 0) {
      sections.push({title: "Awaiting My Approval", items: {listItems: itemsFrom(approvableInvoices)}});
      myTitle = MY_TITLE;
    }
  }
  let myInvoices = tabInvoices(tabName, state.invoices);
  sections.push({title: myTitle, items: {listItems: itemsFrom(myInvoices)}});
  return sections;
}

export default class InvoiceMenuAdapter {
  getTabs() {
    return tabNames.map(tab => {
      return {
        title: tab,
        sections: buildTabSections(tab)
      }
    });
  }

  getFlags() {
    let flags = [];
    if (state.isFinance) flags.push('finance');
    if (state.accounts.length>0) flags.push ('signing-authority');
    return flags;
  }

  newItem() {
    return {
      text: 'New Invoice',
      callback: function() { newItemCallback(); }
    }
  }

  TEST(name) {
    function item() {
      let id = Math.floor((Math.random() * 100) + 1);
      return {id:id, title:'item '+id, subtitle:'subtitle', imageUrl:'', tooltip:'tooltip'};
    }
    function treeItem() {
      return {parents:['root'], item:item()};
    }
    switch (name) {
      case 'getItem' : return item();
      case 'getListItems' : return [item(), item(), item(), item()];
      case 'getTreeItems' : return [treeItem(), treeItem(), treeItem(), treeItem()];
      default: return;
    }
  }
}
