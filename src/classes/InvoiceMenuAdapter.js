

const fakeState = {
  userId:3,
  isFinance:true,
  accounts:[],//['110100', '110140'],
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

function tabItemList(tabName, stateItems) {
  if (tabName && (tabNames.indexOf(tabName)>-1) && stateItems && Object.keys(stateItems).length) {
    let validStatuses = tabStatusList[tabName];
    return Object.keys(stateItems)
      .filter(id => validStatuses.indexOf(stateItems[id].status)>=0)
      .map(id => stateItems[id])
  }
  return [];
}


function newItemCallback() {
  console.log('New Item')
}

function showAllItems(tabName) {
  let validTabs = [Submitted, Approved, "Paying", "Paid"];
  return (fakeState.isFinance && (validTabs.indexOf(tabName) >= 0));
}

function showAccountsTree(tabName) {
  let validTabs = [Submitted, Approved, "Paying", "Paid"];
  return (fakeState.accounts && (fakeState.accounts.length>0) && (tabName.length>0) && (validTabs.indexOf(tabName) >= 0));
}

function buildVendorTree(title, itemList) {
  let items = itemList || [];
  return {
    title: title + " ("+items.length+")",
    items: {
      treeItems: items.map(item => {
        let vendor = item.vendor || 'NO_VENDOR';
        let letter = item.vendor?vendor.substr(0,1).toUpperCase():'?';
        return {parents: [vendor, letter], item: item};
      })
    }
  };
}

function buildFinanceTree(title, items) {
  return{
    title: title + " ("+items.length+")",
    items: {
      treeItems: items.map(item => {
        if (item.status === 4) {
          let company = item.company || "PTC";
          let method = item.paymentMethod || "eft";
          let count = items.filter(i => i.status===4 && (i.company || "PTC") === company && (i.paymentMethod || "eft" === method)).length;
          let branch = company + " (" + (method) + ") (" + count + ")";
          return {parents: [branch], item: item};
        } else {
          let count = items.filter(i => i.status !== 4).length;
          let branch = "Pending Import (" + count + ")";
          return {parents: [branch], item: item};
        }
      })
    }
  }
}

function buildAccountTree(title, itemList) {
  let items = itemList || [];
  return {
    title: title + " ("+items.length+")",
    items: {
      treeItems: items.map(item => {
        return {parents: [item.account || '??????'], item: item};
      })
    }
  };
}

function buildTabSections(tabName, stateItems = {}) {
  const MY_TITLE = "My Items";
  if (tabNames.indexOf(tabName)===-1) throw new Error("please provide a tabName from the list provided by getTabNames()");
  let sections = [];
  let myTitle = '';
  if (showAllItems(tabName)) {
    let itemsInTab = tabItemList(tabName, stateItems);
    if (itemsInTab.length > 0) {
      let tree = (tabName === Approved?
        buildFinanceTree("Finance", itemsInTab):
        buildVendorTree("All Items", itemsInTab)
      );
      sections.push(tree);
      myTitle = MY_TITLE;
    }
  }
  if (showAccountsTree(tabName)) {
    let accountItems = tabItemList(tabName, stateItems).filter(item => {
      return fakeState.accounts.indexOf(item.account) >= 0;
    });
    if (accountItems.length>0) {
      let tree = buildAccountTree("My Accounts", accountItems)
      sections.push(tree);
      myTitle = MY_TITLE;
    }
  }
  if (tabName === Submitted) {
    let approvableItems = tabItemList(Submitted, stateItems).filter(item  => {
      // eslint-disable-next-line
      return item.approver == fakeState.userId;
    });
    if (approvableItems.length > 0) {
      sections.push({title: "Awaiting My Approval", items: {listItems: approvableItems}});
      myTitle = MY_TITLE;
    }
  }
  let myItems = tabItemList(tabName, stateItems);
  sections.push({title: myTitle, items: {listItems: myItems}});
  return sections;
}

export default class InvoiceMenuAdapter {

  getTabNames() {return tabNames;}

  getMenuFlags() {
    let flags = [];
    if (fakeState.isFinance) flags.push('finance');
    if (fakeState.accounts.length>0) flags.push ('signing-authority');
    return flags;
  }

  newItem() {
    return {
      text: 'New Invoice',
      callback: function() { newItemCallback(); }
    }
  }

  buildTab(tabName, stateItems) {
    return buildTabSections(tabName, stateItems);
  }

  TEST(name, a, b) {
    function item() {
      let id = Math.floor((Math.random() * 100) + 1);
      return {id:id, title:'item '+id, subtitle:'subtitle', imageUrl:'', tooltip:'tooltip'};
    }
    function treeItem() {
      return {parents:['root'], item:item()};
    }
    switch (name) {
      case 'tabItemList': return tabItemList(a, b);
      case 'showAllItems': return showAllItems(a);
      case 'showAccountsTree': return showAccountsTree(a);
      case 'buildVendorTree': return buildVendorTree(a, b);
      case 'buildAccountTree': return buildAccountTree(a, b);
      case 'getItem' : return item();
      case 'getListItems' : return [item(), item(), item(), item()];
      case 'getTreeItems' : return [treeItem(), treeItem(), treeItem(), treeItem()];
      case 'setState' : fakeState[a] = b; break;
      default: return;
    }
  }
}
