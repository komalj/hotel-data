var headings = [
  "Room Type",
  "Room Rate",
  "No. of Rooms Booked",
  "Price"]

// [room type, rate]
var myData = [
  ["Standard", "$360"],
  ["Deluxe", "$390"],
  ["Premium", "$400"],
  ["Suite", "$670"],
  ["Signature", "$1050"]
]


function createTable() {

  var table = document.getElementsByTagName('table')[0];

  // Set up the head row
  var tr = document.createElement('tr');
  for(var i=0; i<headings.length; i++){
    var th = document.createElement('th');
    th.innerHTML = headings[i];

    if(i==0 || i==1){
      var arrow1 = document.createElement('span');
      var arrow2 = document.createElement('span');
      arrow1.id = "a"+i;
      arrow2.id = "d"+i;
      arrow1.innerHTML = '&uarr;';
      arrow2.innerHTML = '&darr;';
      arrow1.setAttribute('onclick','sortMe()');
      arrow2.setAttribute('onclick','sortMe()');
      th.appendChild(arrow1);
      th.appendChild(arrow2);
    }

    tr.appendChild(th);
  }

  table.appendChild(tr);

  /*  Set up the rest of the table
      First two columns are filled using the myData object
      Third column is for the user to enter data
      Fourth column will be dynamically calculated as and when
      the user enters data in the third column. Until then it remains empty
  */
  for(var i=0; i<myData.length; i++) {
        tr = document.createElement('tr');

        // first two fields
        for(var j=0; j<2; j++){
          var td = document.createElement('td');
          td.innerHTML = myData[i][j];
          td.id = "r"+i+","+j;
          tr.appendChild(td);
        }

        // no. of rooms field
        var td = document.createElement('td');
        td.id = "r"+i+","+j;
        var inp = document.createElement('input');
        inp.id = "i"+i;
        inp.type = "number";
        inp.value = 0;
        inp.setAttribute("oninput", "calcPrice()");
        td.appendChild(inp);
        tr.appendChild(td);

        // total field
        td = tr.insertCell(3);
        td.id = "r"+i+","+(j+1)

        table.appendChild(tr);
  }


}


/*  Called when the user changes the value
*   in the no. of rooms field.
*   It updates the respective price field.
*/
function calcPrice(){

  var id = event.target.id;
  r = id[1];
  var rate = document.getElementById("r"+r+",1").innerHTML;
  rate = rate.substr(1);
  var nor = document.getElementById(id).value;

  if(nor<0){
    alert("Enter positive value");
    document.getElementById(id).value = 0;
  }
  else{
    var price = document.getElementById("r"+r+",3");
    price.innerHTML = "$"+(nor*rate);
    updateTotal();
  }

}


/* Called each time an individual price field
*  is updated. It updates the total accordingly.
*/
function updateTotal(){
  var t = 0;

  for(var i=0; i<myData.length; i++){
    t+=Number(document.getElementById("r"+i+",3").innerHTML.substr(1));
  }

  document.getElementById('total').innerHTML = "$"+t;
  applyDisc();
}


/*  Called when the user changes the value
*   in the discount percentage field.
*   It calculates the discount amount,
*   and the net total.
*/
function applyDisc(){
  var tot = document.getElementById("total").innerHTML.substr(1);
  var dis = document.getElementById("disc").value;

  if(dis<0){
    alert("Enter positive value");
    document.getElementById("discinp").value = 0;
  }
  else{
    var damt = tot*dis/100;
    document.getElementById("discamt").innerHTML = "$"+damt;
    var net = tot - damt;
    document.getElementById("netprice").innerHTML = "$"+net;
  }

}


/*  Called when the user clicks on either
*   of the first two columns, and sorts it.
*
*/
function sortMe(){
  var id = event.target.id;
  var asc = (id[0]=='a'? 1: -1);
  var col = id[1];
  var tbody = document.getElementsByTagName("table")[0];
  sort_table(tbody, col, asc);
}


/* sub function of sortMe()
*/
function sort_table(tbody, col, asc){
  var rows = tbody.rows, rlen = rows.length, arr = new Array(), i, j, cells, clen;
  // fill the array with elements from the table
  for(i = 1; i < rlen; i++){
    cells = rows[i].cells;
    clen = cells.length;
    arr[i-1] = new Array();
    for(j = 0; j < clen; j++){
      arr[i-1][j] = cells[j];
    }
  }

  // sort the array by the specified column number (col) and order (asc)
  arr.sort(function(a, b){
    a = a[col].innerHTML;
    b = b[col].innerHTML;
    a = a.substr(1);
    b = b.substr(1);

    var isText = isNaN(parseFloat(a));

    if(!isText){
      var a = parseFloat(a);
      var b = parseFloat(b);
    }
    console.log("a:"+a);
    console.log("b:"+b);
    return (a == b) ? 0 : ((a > b) ? asc : -1*asc);

  });


  var tr = document.getElementsByTagName("tr");

  for(i = 0; i < arr.length; i++){
    for(j=0; j<arr[i].length; j++){
      tr[i+1].appendChild(arr[i][j]);
    }
  }

}


createTable();
