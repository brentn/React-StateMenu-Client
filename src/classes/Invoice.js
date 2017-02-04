var fakeState = {
  isFinance: true
}

function getMenuTitle(invoice) {
  return invoice.VendorId || 'NO VENDOR';
}

function getMenuSubtitle(invoice) {
  try {
    return invoice.GrossAmount.toFixed(2);
  } catch(ex) {
    return '';
  }
}

function getMenuTreeTitle(invoice) {
  let invoiceDate = (new Date(invoice.InvoiceDate || 'x'))
  let date = (!isNaN(invoiceDate))?(invoiceDate.getMonth()+1) + "/" + invoiceDate.getDate():'??/??';
  let account = "(" + (invoice.CostCenter || "xxxxxx") + ")";
  let vendor = (invoice.VendorId || "unknown");
  let amount = "$" + (invoice.GrossAmount || '??');
  return date + " " + account + " " + vendor + " " + amount;
}

function getImageUrl(userId) {
  return 'https://staff.powertochange.org/custom-pages/webService.php?type=staff_photo&api_token=V7qVU7n59743KNVgPdDMr3T8&staff_username=brentn';
}

function getTooltip(invoice) {
  if (invoice && invoice.InvoiceId) {
    if (invoice.InvoiceId.toString().length > 5) return "AP #" + invoice.InvoiceId;
    return "AP #" + ('00000' + invoice.InvoiceId).slice(-5);
  };
  return "";
}

function hasPrivateComments(invoice) {
  if (invoice.PrivComments && (invoice.PrivComments.length>0)) {
    return true;
  }
  return false;
}

function itemFrom(invoice) {
  if (!invoice || isNaN(invoice.InvoiceId)) throw new Error("You must provide an object with an InvoiceId");
  return {
    id: Number(invoice.InvoiceId),
    status: Number(invoice.Status),
    user: invoice.UserId,
    vendor: invoice.VendorId,
    account: invoice.CostCenter,
    approver: Number(invoice.ApprUserId),
    imageUrl: getImageUrl(invoice.UserId),
    title: getMenuTitle(invoice),
    subtitle: getMenuSubtitle(invoice),
    treeTitle: getMenuTreeTitle(invoice),
    tooltip: getTooltip(invoice),
    total: Number(invoice.GrossAmount),
    flags: {
      private: (fakeState.isFinance && hasPrivateComments(invoice)),
      info: (fakeState.isFinance && invoice.MoreInfo)
    }
  }
}


export default class {

  makeItem = itemFrom;

  TEST(name, a, b) {
    switch (name) {
      case 'getMenuTitle': return getMenuTitle(a);
      case 'getMenuSubtitle': return getMenuSubtitle(a);
      case 'getMenuTreeTitle': return getMenuTreeTitle(a);
      case 'getImageUrl':  return getImageUrl(a);
      case 'getTooltip': return getTooltip(a);
      case 'hasPrivateComments': return hasPrivateComments(a);
      default: return;
    }
  }
}
