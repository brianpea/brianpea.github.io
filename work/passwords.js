var locks = document.querySelectorAll('.lock');
var keys = [];

for (var i = 0; i < locks.length; i++) {
  var lock = locks[i];
  var lockNum = i + 1;
  var lockId = "lock" + lockNum;
  lock.id = lockId;

  var key = lock.innerHTML;
  keys.push(key);
  var keyLink = "<a href='#' onclick='unlock(" + lockNum + ");'>Password</a>"

  lock.innerHTML = keyLink;
}

function unlock(n) {
  var lock = document.getElementById("lock" + n);
  var key = keys[n - 1];
  lock.innerHTML = key;
}
