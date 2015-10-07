app.filter('side', function () {
  return function (input) {
    if (input === "Buy"){
      input = "Long";
    } else {
      input = "Short";
    }
    return input;
  };
});


