function sortByEpisodes() {
    var nodeList = document.querySelectorAll('.characters div');
    var itemsArray = [];
    var parent = nodeList[0].parentNode;
    for (var i = 0; i < nodeList.length; i++) {    
      itemsArray.push(parent.removeChild(nodeList[i]));
    }
    console.log(itemsArray);
    itemsArray.sort(function(nodeA, nodeB) {
        var textA = nodeA.childNodes[5].innerText;
        var textB = nodeB.childNodes[5].innerText;
        var numberA = parseInt((textA).split(': ')[1]);
        var numberB = parseInt((textB).split(': ')[1]);
        if (numberA < numberB) return 1;
        if (numberA > numberB) return -1;
        else {
          textA = nodeA.childNodes[4].innerText;
          textB = nodeB.childNodes[4].innerText;
          var dateA = new Date((textA).split(': ')[1]);
          var dateB = new Date((textB).split(': ')[1]);
          return dateB - dateA;
        };
      })
      .forEach(function(node) {
        parent.appendChild(node)
      });
  }

function sortByDateInc() {
    var nodeList = document.querySelectorAll('.characters div');
    var itemsArray = [];
    var parent = nodeList[0].parentNode;
    for (var i = 0; i < nodeList.length; i++) {    
      itemsArray.push(parent.removeChild(nodeList[i]));
    }
    itemsArray.sort(function(nodeA, nodeB) {
        var textA = nodeA.childNodes[4].innerText;
        var textB = nodeB.childNodes[4].innerText;
        var dateA = new Date((textA).split(': ')[1]);
        var dateB = new Date((textB).split(': ')[1]);
        return dateA - dateB;
      })
      .forEach(function(node) {
        parent.appendChild(node)
      });
}

function sortByDateDesc() {
    var nodeList = document.querySelectorAll('.characters div');
    var itemsArray = [];
    var parent = nodeList[0].parentNode;
    for (var i = 0; i < nodeList.length; i++) {    
      itemsArray.push(parent.removeChild(nodeList[i]));
    }
    itemsArray.sort(function(nodeA, nodeB) {
        var textA = nodeA.childNodes[4].innerText;
        var textB = nodeB.childNodes[4].innerText;
        var dateA = new Date((textA).split(': ')[1]);
        var dateB = new Date((textB).split(': ')[1]);
        return dateB - dateA;
      })
      .forEach(function(node) {
        parent.appendChild(node)
      });
}

window.onload = function() {
  alert('Click on the character card to delete the character.');
}
