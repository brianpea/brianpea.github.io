function shop(n) {
  var info = document.getElementsByClassName("info");

  for (var i = 0; i < info.length; i++) {
    info[i].style.display = "none";
  };

  var item = "item" + n;

  document.getElementById(item).style.display = "inline-block";
};

var csvStock = new XMLHttpRequest();
csvStock.open("GET", "stock/stock.csv");
csvStock.responseType = "blob";
csvStock.send();

csvStock.onload = function () {

  var stock = csvStock.response;

  var csvParser = new SimpleExcel.Parser.CSV();
  csvParser.setDelimiter(",");
  csvParser.loadFile(stock, function () {

    var stocklist = csvParser.getSheet();

    for (var i = 1; i < stocklist.length; i++) {

      var item = stocklist[i];

      var itemTag = item[0];
      var itemName = item[1];
      var itemPrice = item[2];
      var itemDesc = item[3];
      var itemSpec = item[4];
      var itemColor = item[5];

      var itemPostHTML = "<a href='#' onclick='shop(" + i + "); return false;'><div class='items' style='background-color: " + itemColor + ";'><img class='media' src='stock/" + itemTag + ".jpg'><p>" + itemName + "</p></div></a>";
      document.getElementsByClassName('itemPost')[0].insertAdjacentHTML('beforeend', itemPostHTML);

      var itemInfoHTML = "<div class='info' id='item" + i + "'><h2>" + itemName + "</h2><p>" + itemPrice + "</p><p>" + itemDesc + "</p><p>" + itemSpec + "</p></div>";
      document.getElementsByClassName('itemInfo')[0].insertAdjacentHTML('beforeend', itemInfoHTML);
    };

    var lastItem = document.getElementsByClassName('items').length - 1;
    document.getElementsByClassName('items')[lastItem].id = "lastItem";

  });
};